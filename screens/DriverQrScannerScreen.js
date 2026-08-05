import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import styles from "../styles/DriverQrScannerStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverQrScannerScreen({ navigation, route }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scanned, setScanned] = useState(false);

  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanAnim]);

 const handleValidateBooking = async (bookingId) => {
  try {
    setIsSubmitting(true);

    const response = await fetch(
      `${EXPO_PUBLIC_API_URL}/rides/bookings/${bookingId}/scan-passenger`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible de valider le QR code.");
      }

      if (route?.params?.onValidated) {
        route.params.onValidated();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", error.message || "Impossible de valider le QR code.", [
        {
          text: "Scanner à nouveau",
          onPress: () => setScanned(false),
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
  if (scanned || isSubmitting) return;

  setScanned(true);

  try {
    const parsed = JSON.parse(data);
    const expectedBookingId = route?.params?.bookingId;

    if (
      !parsed ||
      parsed.type !== "buzz-passenger-booking" ||
      !parsed.bookingId
    ) {
      throw new Error("QR code invalide.");
    }

    if (expectedBookingId && parsed.bookingId !== expectedBookingId) {
      throw new Error("Ce QR code ne correspond pas au passager sélectionné.");
    }

    await handleValidateBooking(parsed.bookingId);
  } catch (error) {
    Alert.alert(
      "QR invalide",
      error.message || "Ce QR code n'est pas reconnu.",
      [
        {
          text: "Scanner à nouveau",
          onPress: () => setScanned(false),
        },
      ]
    );
  }
};

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Demande d’autorisation caméra...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Accès caméra refusé</Text>
        <Text style={styles.subtitle}>
          Vous devez autoriser la caméra pour scanner le QR code du passager.
        </Text>
      </View>
    );
  }

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 220],
  });

  const handleManualValidation = async () => {
  const bookingId = route?.params?.bookingId;

  if (!bookingId) {
    Alert.alert("Erreur", "Aucune réservation associée.");
    return;
  }

  Alert.alert(
    "Validation manuelle",
    "Confirmez uniquement si vous avez vérifié l’identité du passager.",
    [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Valider",
        onPress: async () => {
          try {
            setIsSubmitting(true);

            const response = await fetch(
              `${EXPO_PUBLIC_API_URL}/rides/bookings/${bookingId}/manual-validate`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();

            if (!response.ok || !data.result) {
              throw new Error(
                data.error || "Impossible de valider manuellement."
              );
            }

            if (route?.params?.onValidated) {
              route.params.onValidated();
            }
            navigation.goBack();
          } catch (error) {
            Alert.alert(
              "Erreur",
              error.message || "Impossible de valider manuellement."
            );
          } finally {
            setIsSubmitting(false);
          }
        },
      },
    ]
  );
};

  return (
  <View style={styles.container}>
    <CameraView
      style={styles.camera}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    />

    <View style={styles.overlay}>
      <Text style={styles.scanText}>Scannez le QR code du passager</Text>

      <View style={styles.scanBox}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />

        {!isSubmitting && (
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{ translateY }],
              },
            ]}
          />
        )}

        {isSubmitting && (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Validation du passager...</Text>
          </View>
        )}
      </View>

      {/* 🔥 AJOUT ICI */}
      {!isSubmitting && (
        <>
          <TouchableOpacity
            style={styles.manualButton}
            activeOpacity={0.8}
            onPress={handleManualValidation}
          >
            <Text style={styles.manualButtonText}>
              Valider manuellement
            </Text>
          </TouchableOpacity>

          <Text style={styles.manualInfoText}>
            Si le QR code ne fonctionne pas, validez manuellement uniquement après avoir
            vérifié l’identité du passager.
          </Text>
        </>
      )}

      {scanned && !isSubmitting && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}>Scanner à nouveau</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);
}
