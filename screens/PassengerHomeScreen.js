import { useCallback, useEffect, useRef, useState } from "react";
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TogoLogo from "../components/TogoLogo";
import styles, { ACCENT } from "../styles/PassengerHomeStyles";
import { colors } from "../styles/theme";

export default function PassengerHomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);

  const mapRef = useRef(null);

  const centerMapOnUser = useCallback((coords) => {
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
  }, []);

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
  }, [centerMapOnUser]);

  const checkIfLocationModalShouldOpen = useCallback(async () => {
    try {
      const alreadyShown = await AsyncStorage.getItem(
        "locationModalAlreadyShown"
      );

      if (!alreadyShown) {
        setShowLocationModal(true);
        await AsyncStorage.setItem("locationModalAlreadyShown", "true");
      } else {
        checkLocationPermissionAgain();
      }
    } catch (error) {

    }
  }, [checkLocationPermissionAgain]);

  useEffect(() => {
    checkIfLocationModalShouldOpen();
  }, [checkIfLocationModalShouldOpen]);

  useFocusEffect(
    useCallback(() => {
      checkLocationPermissionAgain();
    }, [checkLocationPermissionAgain])
  );

  const handleAllowLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationDenied(true);
        setShowLocationModal(false);
        return;
      }

      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation(currentPosition);
      setLocationDenied(false);
      setShowLocationModal(false);
      centerMapOnUser(currentPosition.coords);
    } catch (error) {

      setShowLocationModal(false);
    }
  };

  const handleDenyLocation = () => {
    setLocationDenied(true);
    setShowLocationModal(false);
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
          onPress={() => navigation.navigate("MainMenu", { mode: "passenger" })}
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
          <TouchableOpacity
            style={styles.switchModeSegment}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <Text style={styles.switchModeSegmentText}>Conducteur</Text>
          </TouchableOpacity>

          <View style={[styles.switchModeSegment, styles.switchModeSegmentActive]}>
            <Text style={[styles.switchModeSegmentText, styles.switchModeSegmentTextActive]}>
              Passager
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelTopRow}>
          <TogoLogo size={22} color={colors.white} />
        </View>

        <Text style={styles.headline}>Où{"\n"}allez-vous ?</Text>

        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("PassengerSearch")}
        >
          <Text style={styles.searchPlaceholder}>Rechercher un trajet</Text>
          <View style={styles.searchBarIcon}>
            <Ionicons name="search" size={18} color={colors.white} />
          </View>
        </TouchableOpacity>

        {locationDenied && (
          <TouchableOpacity
            style={styles.locationWarning}
            activeOpacity={0.8}
            onPress={handleOpenSettings}
          >
            <View style={styles.warningDot} />
            <Text style={styles.locationWarningText}>
              Vous devez activer la géolocalisation pour voir les trajets
              disponibles autour de vous. Appuyez ici.
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showLocationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Autoriser la géolocalisation ?
            </Text>
            <Text style={styles.modalText}>
              Togo a besoin d&apos;accéder à votre position pour vous proposer
              des trajets autour de vous.
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.allowButton}
                onPress={handleAllowLocation}
              >
                <Text style={styles.allowButtonText}>Autoriser</Text>
              </Pressable>

              <Pressable
                style={styles.denyButton}
                onPress={handleDenyLocation}
              >
                <Text style={styles.denyButtonText}>Refuser</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
