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

      Alert.alert("Succès", data.message || "QR code validé.", [
        {
          text: "OK",
          onPress: () => {
            if (route?.params?.onValidated) {
              route.params.onValidated();
            }
            navigation.goBack();
          },
        },
      ]);
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

            Alert.alert(
              "Succès",
              data.message || "Passager validé manuellement.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    if (route?.params?.onValidated) {
                      route.params.onValidated();
                    }
                    navigation.goBack();
                  },
                },
              ]
            );
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

/*import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function DriverQrScannerScreen({ navigation, route }) {
  const rideId = route?.params?.rideId || null;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lastValue, setLastValue] = useState("");

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;

    setScanned(true);
    setLastValue(data);

    // On renvoie juste le bookingId scanné à DriverTripDetailsScreen
   navigation.navigate("DriverTripDetails", {
  rideId,
  scannedBookingId: data,
});
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.infoText}>Chargement de la caméra...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.title}>Autorisation caméra requise</Text>
        <Text style={styles.infoText}>
          Le conducteur doit autoriser l’accès à la caméra pour scanner le QR code du passager.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={requestPermission}
        >
          <Text style={styles.primaryButtonText}>Autoriser la caméra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
     
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Scanner un passager</Text>

          <View style={styles.headerRightPlaceholder} />
        </View>

       
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <View style={styles.overlay}>
            <View style={styles.scanBox} />
          </View>
        </View>

        
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Scan du QR passager</Text>
          <Text style={styles.footerText}>
            Le QR doit contenir uniquement le bookingId du passager.
          </Text>

          {lastValue ? (
            <Text style={styles.lastValueText}>
              Dernier QR lu : {lastValue}
            </Text>
          ) : null}

          {scanned && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.primaryButtonText}>Scanner à nouveau</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  centeredContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },

  header: {
    height: 56,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  backText: {
    fontSize: 24,
    color: "#fff",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  headerRightPlaceholder: {
    width: 40,
  },

  cameraWrapper: {
    flex: 1,
    position: "relative",
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  scanBox: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  footer: {
    backgroundColor: "#111",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },

  footerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  footerText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  lastValueText: {
    color: "#2dd4bf",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },

  infoText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 20,
  },

  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  secondaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
}); */