import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/DriverHomeStyles";

export default function DriverHomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [location, setLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [driverAddress, setDriverAddress] = useState("");

  const [showDriverProfileModal, setShowDriverProfileModal] = useState(false);
  const [driverWarningText, setDriverWarningText] = useState("");

  const mapRef = useRef(null);

  const hasCarInfo = Boolean(
    user?.car?.brand &&
      user?.car?.model &&
      user?.car?.color &&
      user?.car?.nbSeats > 0 &&
      user?.car?.licencePlate
  );

  const hasDriverDocuments = Boolean(
    user?.driverProfile?.driverLicenseUrl &&
      user?.driverProfile?.identityDocumentUrl &&
      user?.driverProfile?.insuranceDocumentUrl
  );

  const canPublishRide = Boolean(user?.driverProfile?.isProfileComplete);

  useFocusEffect(
    useCallback(() => {
      checkLocationPermissionAgain();
      checkDriverRequirements();
    }, [canPublishRide, hasCarInfo, hasDriverDocuments])
  );

  const centerMapOnUser = (coords) => {
    if (!coords) return;

    setTimeout(() => {
      mapRef.current?.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }, 300);
  };

  const reverseGeocodeAddress = async (coords) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (result && result.length > 0) {
        const place = result[0];
        const formattedAddress = [
          place.name,
          place.street,
          place.postalCode,
          place.city,
        ]
          .filter(Boolean)
          .join(", ");

        setDriverAddress(formattedAddress || "Adresse non disponible");
      }
    } catch (error) {
      console.log("Erreur récupération adresse :", error);
      setDriverAddress("Adresse non disponible");
    }
  };

  /*const checkLocationPermissionAgain = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        const currentPosition = await Location.getCurrentPositionAsync({});
        setLocation(currentPosition);
        setLocationDenied(false);
        centerMapOnUser(currentPosition.coords);
        reverseGeocodeAddress(currentPosition.coords);
      } else {
        setLocationDenied(true);
      }
    } catch (error) {
      console.log("Erreur vérification localisation :", error);
    }
  };*/
  const checkLocationPermissionAgain = useCallback(async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "granted") {
      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation(currentPosition);
      setLocationDenied(false);
      centerMapOnUser(currentPosition.coords);
      reverseGeocodeAddress(currentPosition.coords);
    } else {
      setLocationDenied(true);
    }
  } catch (error) {
    console.log("Erreur vérification localisation :", error);
  }
}, []);

  const getDriverWarningText = () => {
    if (!hasCarInfo && !hasDriverDocuments) {
      return "Attention, vous devez encore renseigner les informations de votre véhicule et transmettre vos documents pour pouvoir publier un trajet.";
    }

    if (!hasCarInfo) {
      return "Attention, vous n’avez pas encore renseigné les informations de votre véhicule.";
    }

    if (!hasDriverDocuments) {
      return "Attention, vous n’avez pas encore transmis les documents nécessaires à la vérification de votre profil conducteur.";
    }

    return "";
  };

  const checkDriverRequirements = useCallback(async () => {
  if (canPublishRide) {
    setShowDriverProfileModal(false);
    setDriverWarningText("");
    return;
  }

  setDriverWarningText(getDriverWarningText());

  try {
    const alreadySeen = await AsyncStorage.getItem(
      "driverProfileIntroModalAlreadyShown"
    );

    if (!alreadySeen && !showDriverProfileModal) {
      setShowDriverProfileModal(true);
      await AsyncStorage.setItem(
        "driverProfileIntroModalAlreadyShown",
        "true"
      );
    }
  } catch (error) {
    console.log("Erreur AsyncStorage driver profile intro:", error);
  }
}, [canPublishRide, showDriverProfileModal]);

  const handleGoToCreateRide = () => {
    if (!canPublishRide) {
      setShowDriverProfileModal(true);
      return;
    }

    navigation.navigate("CreateRide");
  };

  const handleOpenSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ouvrir les réglages.");
    }
  };

  const initialRegion = {
    latitude: location?.coords?.latitude || 48.8566,
    longitude: location?.coords?.longitude || 2.3522,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>BUZZ</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("DriverProfile")}
            style={styles.profileIcon}
          >
            <Ionicons name="person-circle-outline" size={40} color="#111" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={handleGoToCreateRide}
        >
          <Text style={styles.searchPlaceholder}>Proposer un trajet</Text>
          <Ionicons name="add-circle-outline" size={30} color="#7A7A7A" />
        </TouchableOpacity>

        {!!driverWarningText && (
          <TouchableOpacity
            style={styles.driverWarning}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Ionicons name="alert-circle-outline" size={20} color="#8B2332" />
            <Text style={styles.driverWarningText}>{driverWarningText}</Text>
            <Ionicons name="chevron-forward" size={20} color="#8B2332" />
          </TouchableOpacity>
        )}

        {locationDenied && (
          <TouchableOpacity
            style={styles.locationWarning}
            activeOpacity={0.8}
            onPress={handleOpenSettings}
          >
            <Ionicons name="warning-outline" size={20} color="#8B2332" />
            <Text style={styles.locationWarningText}>
              Vous devez activer la géolocalisation pour afficher votre
              position. Appuyez ici.
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#8B2332" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {location?.coords && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Votre position"
            >
              <View style={styles.driverMarker}>
                <MaterialCommunityIcons
                  name="steering"
                  size={22}
                  color="#fff"
                />
              </View>

              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>Vous êtes ici</Text>
                  <Text style={styles.calloutText}>
                    {driverAddress || "Adresse en cours de chargement..."}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>

        <TouchableOpacity
          style={styles.switchModeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.switchModeButtonText}>
            Passer en mode passager
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDriverProfileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDriverProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Complétez votre profil conducteur</Text>
            <Text style={styles.modalText}>
              Pour pouvoir publier un trajet, vous devez compléter les
              informations de votre véhicule et transmettre vos documents de
              vérification, comme votre permis, votre pièce d’identité et votre
              assurance.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.allowButton}
                onPress={() => {
                  setShowDriverProfileModal(false);
                  navigation.navigate("DriverProfile");
                }}
              >
                <Text style={styles.allowButtonText}>Compléter maintenant</Text>
              </Pressable>

              <Pressable
                style={styles.denyButton}
                onPress={() => setShowDriverProfileModal(false)}
              >
                <Text style={styles.denyButtonText}>Plus tard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
