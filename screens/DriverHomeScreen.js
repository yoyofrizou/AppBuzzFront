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
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TogoLogo from "../components/TogoLogo";
import styles, { ACCENT } from "../styles/DriverHomeStyles";
import { colors } from "../styles/theme";

export default function DriverHomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [location, setLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);

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

  const checkLocationPermissionAgain = useCallback(async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        const currentPosition = await Location.getCurrentPositionAsync({});
        setLocation(currentPosition);
        setLocationDenied(false);
        centerMapOnUser(currentPosition.coords);
      } else {
        setLocationDenied(true);
      }
    } catch (error) {

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
      <View style={styles.mapContainer}>
        <TouchableOpacity
          style={[styles.floatButton, styles.floatButtonLeft]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MainMenu", { mode: "driver" })}
        >
          <Ionicons name="menu" size={22} color={ACCENT} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.floatButton, styles.floatButtonRight]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Messages")}
        >
          <MaterialCommunityIcons name="message-badge-outline" size={21} color={ACCENT} />
        </TouchableOpacity>

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={false}
          followsUserLocation={false}
        >
          {location?.coords && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.pinColumn}>
                <View style={styles.pinBadge}>
                  <MaterialCommunityIcons name="steering" size={14} color={ACCENT} />
                  <Text style={styles.pinBadgeText}>Vous êtes ici</Text>
                </View>
                <View style={styles.pinDot} />
              </View>
            </Marker>
          )}
        </MapView>

        <View style={styles.switchModeToggle}>
          <View style={[styles.switchModeSegment, styles.switchModeSegmentActive]}>
            <Text style={[styles.switchModeSegmentText, styles.switchModeSegmentTextActive]}>
              Conducteur
            </Text>
          </View>

          <TouchableOpacity
            style={styles.switchModeSegment}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("PassengerHome")}
          >
            <Text style={styles.switchModeSegmentText}>Passager</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelTopRow}>
          <TogoLogo size={22} color={colors.white} />
        </View>

        <Text style={styles.headline}>Prêt à{"\n"}prendre{"\n"}la route ?</Text>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={handleGoToCreateRide}
        >
          <Text style={styles.searchPlaceholder}>Proposer un trajet</Text>
          <View style={styles.searchBarIcon}>
            <Ionicons name="add" size={22} color={colors.white} />
          </View>
        </TouchableOpacity>

        {!!driverWarningText && (
          <TouchableOpacity
            style={styles.driverWarning}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <View style={styles.warningDot} />
            <Text style={styles.driverWarningText}>{driverWarningText}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        )}

        {locationDenied && (
          <TouchableOpacity
            style={styles.locationWarning}
            activeOpacity={0.8}
            onPress={handleOpenSettings}
          >
            <View style={styles.warningDot} />
            <Text style={styles.locationWarningText}>
              Vous devez activer la géolocalisation pour afficher votre
              position. Appuyez ici.
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
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
