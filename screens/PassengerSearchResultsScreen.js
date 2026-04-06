import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/PassengerSearchResultsStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

function formatHour(dateString) {
  if (!dateString) return "--:--";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFullDate(dateString) {
  if (!dateString) return "Date non renseignée";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date non renseignée";
  }

  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDriverAverageRating(ride) {
  const parsed = Number(ride?.user?.driverAverageRating ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getDriverRatingsCount(ride) {
  const parsed = Number(ride?.user?.driverRatingsCount ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function renderRatingStars(rating) {
  const rounded = Math.round(rating);

  return [1, 2, 3, 4, 5].map((star) => (
    <Ionicons
      key={star}
      name={star <= rounded ? "star" : "star-outline"}
      size={16}
      color="#8B2332"
      style={{ marginRight: 2 }}
    />
  ));
}

function formatWalkingMinutes(distanceMeters) {
  const parsed = Number(distanceMeters);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  const minutes = Math.max(1, Math.round(parsed / 80));

  return `${minutes} min à pied`;
}

export default function PassengerSearchResultsScreen({ navigation }) {
  const user = useSelector((state) => state.user?.value);
  const rides = useSelector((state) => state.rides.searchedRides) || [];
  const searchParams = useSelector((state) => state.rides.searchParams);

  const mapRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [checkingRideAccess, setCheckingRideAccess] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedRide(null);
      };
    }, [])
  );

  const filteredRides = useMemo(() => {
    if (!user?._id) return rides;

    return rides.filter((ride) => {
      const driverId =
        ride?.user?._id || ride?.driver?._id || ride?.user || ride?.driver;

      return String(driverId) !== String(user._id);
    });
  }, [rides, user?._id]);

  const initialRegion = useMemo(() => {
    if (filteredRides.length > 0) {
      return {
        latitude: Number(filteredRides[0].departureLatitude) || 48.8566,
        longitude: Number(filteredRides[0].departureLongitude) || 2.3522,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
    }

    if (searchParams?.departureCoordinates) {
      return {
        latitude: searchParams.departureCoordinates.latitude,
        longitude: searchParams.departureCoordinates.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
    }

    return {
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };
  }, [filteredRides, searchParams]);

  const handleMarkerPress = (ride) => {
    setSelectedRide(ride);
  };

  const passengerHasCurrentRide = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      throw new Error("EXPO_PUBLIC_API_URL est manquant dans le fichier .env.");
    }

    if (!user?.token) {
      throw new Error("Utilisateur non connecté.");
    }

    const response = await fetch(
      `${EXPO_PUBLIC_API_URL}/rides/passenger-bookings/${user.token}`
    );

    const data = await response.json();

    if (!response.ok || !data.result) {
      throw new Error(data.error || "Impossible de vérifier vos trajets.");
    }

    const bookings = data.bookings || [];

    return bookings.some(
      (booking) =>
        booking?.status !== "cancelled" &&
        booking?.ride &&
        booking.ride.status === "started"
    );
  };

  const handleValidateRide = async () => {
    if (!selectedRide?._id) {
      Alert.alert("Erreur", "Trajet introuvable.");
      return;
    }

    try {
      setCheckingRideAccess(true);

      const hasCurrentRide = await passengerHasCurrentRide();

      if (hasCurrentRide) {
        Alert.alert(
          "Trajet déjà en cours",
          "Vous avez déjà un trajet en cours. Vous ne pouvez pas réserver un autre trajet pour le moment."
        );
        return;
      }

      const rideToOpen = selectedRide;
      setSelectedRide(null);

      navigation.navigate("Payment", {
        rideId: rideToOpen._id,
        amount: rideToOpen.price ?? 0,
        currency: "eur",
        seatsBooked: 1,
        message: "",
      });
    } catch (error) {
      Alert.alert(
        "Erreur",
        error.message || "Impossible de continuer vers le paiement."
      );
    } finally {
      setCheckingRideAccess(false);
    }
  };

  const handleOpenDriverPublicProfile = () => {
    if (!selectedRide?.user?._id) {
      Alert.alert("Erreur", "Conducteur introuvable.");
      return;
    }

    setSelectedRide(null);

    navigation.navigate("DriverPublicProfile", {
      driverId: selectedRide.user._id,
      rideId: selectedRide._id,
      driverName:
        `${selectedRide.user?.firstname || selectedRide.user?.prenom || ""} ${
          selectedRide.user?.lastname || selectedRide.user?.nom || ""
        }`.trim(),
    });
  };

  const pickupWalkTime = formatWalkingMinutes(
    selectedRide?.departureDistanceMeters
  );

  const dropoffWalkTime = formatWalkingMinutes(
    selectedRide?.destinationDistanceMeters
  );

  return (
    <View style={styles.container}>
      <View style={styles.topOverlay}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#8B2332" />
          </TouchableOpacity>

          <Text style={styles.logo}>BUZZ</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.profileButton}
            activeOpacity={0.7}
          >
            <Ionicons name="person-circle-outline" size={40} color="#111" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.searchRecap}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="search-outline" size={20} color="#8B2332" />
          <Text style={styles.searchRecapText} numberOfLines={1}>
            {searchParams?.departure || "Départ"} →{" "}
            {searchParams?.destination || "Destination"}
          </Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(event) => {
          if (event?.nativeEvent?.action === "marker-press") {
            return;
          }
          setSelectedRide(null);
        }}
      >
        {filteredRides.map((ride) => {
          const latitude = Number(ride.departureLatitude);
          const longitude = Number(ride.departureLongitude);

          if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
            return null;
          }

          return (
            <Marker
              key={ride._id}
              coordinate={{ latitude, longitude }}
              onSelect={() => handleMarkerPress(ride)}
            >
              <View style={styles.priceMarker}>
                <View style={styles.priceMarkerTop}>
                  <MaterialCommunityIcons
                    name="steering"
                    size={14}
                    color="#FFFFFF"
                  />
                  <Text style={styles.priceMarkerPrice}>
                    {ride.price ?? 0}€
                  </Text>
                </View>

                <Text style={styles.priceMarkerTime}>
                  {formatHour(ride.departureDateTime)}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {filteredRides.length > 0 && !selectedRide && (
        <View style={styles.resultsBadge}>
          <Text style={styles.resultsBadgeText}>
            {filteredRides.length} trajet(s) trouvé(s)
          </Text>
        </View>
      )}

      {filteredRides.length === 0 && (
        <View style={styles.emptyOverlay}>
          <Text style={styles.emptyTitle}>Aucun trajet trouvé</Text>
          <Text style={styles.emptyText}>
            Essaie de modifier le départ, l’arrivée ou l’heure de recherche.
          </Text>

          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.emptyButtonText}>Modifier ma recherche</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={!!selectedRide}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedRide(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedRide(null)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            {selectedRide && (
              <>
                <View style={styles.modalHandle} />

                <Text style={styles.modalTitle}>Détails du trajet</Text>

                <TouchableOpacity
                  style={styles.driverCard}
                  activeOpacity={0.85}
                  onPress={handleOpenDriverPublicProfile}
                >
                  {selectedRide.user?.profilePhoto ? (
                    <Image
                      source={{ uri: selectedRide.user.profilePhoto }}
                      style={styles.driverImage}
                    />
                  ) : (
                    <View style={styles.driverPlaceholder}>
                      <Ionicons name="person" size={20} color="#FFFFFF" />
                    </View>
                  )}

                  <View style={styles.driverInfo}>
                    <Text style={styles.driverLabel}>Conducteur</Text>

                    <Text style={styles.driverName}>
                      {selectedRide.user?.firstname ||
                        selectedRide.user?.prenom ||
                        ""}{" "}
                      {selectedRide.user?.lastname ||
                        selectedRide.user?.nom ||
                        ""}
                    </Text>

                    <View style={styles.driverRatingRow}>
                      <View style={styles.driverStarsRow}>
                        {renderRatingStars(getDriverAverageRating(selectedRide))}
                      </View>

                      <Text style={styles.driverRatingText}>
                        {getDriverAverageRating(selectedRide).toFixed(1)}
                      </Text>

                      <Text style={styles.driverRatingCountText}>
                        ({getDriverRatingsCount(selectedRide)} avis)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <Text style={styles.modalDateTime}>
                  Départ le {formatFullDate(selectedRide.departureDateTime)}
                </Text>

                <View style={styles.modalAddressBlock}>
                  <View style={styles.addressRow}>
                    <Text style={styles.modalAddressLabel}>Départ</Text>
                    {pickupWalkTime && (
                      <Text style={styles.walkingTimeText}>
                        {pickupWalkTime}
                      </Text>
                    )}
                  </View>

                  <Text style={styles.modalAddressText}>
                    {selectedRide.departureAddress ||
                      "Adresse de départ non renseignée"}
                  </Text>
                </View>

                <View style={styles.modalAddressBlock}>
                  <View style={styles.addressRow}>
                    <Text style={styles.modalAddressLabel}>Arrivée</Text>
                    {dropoffWalkTime && (
                      <Text style={styles.walkingTimeText}>
                        {dropoffWalkTime}
                      </Text>
                    )}
                  </View>

                  <Text style={styles.modalAddressText}>
                    {selectedRide.destinationAddress ||
                      "Adresse d’arrivée non renseignée"}
                  </Text>
                </View>

                <View style={styles.modalPriceRow}>
                  <Text style={styles.modalPrice}>
                    {selectedRide.price ?? 0}€
                  </Text>
                  <Text style={styles.modalSeats}>
                    {selectedRide.placesLeft ?? 1} place
                    {(selectedRide.placesLeft ?? 1) > 1 ? "s" : ""} disponibles
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.validateButton,
                    checkingRideAccess && { opacity: 0.6 },
                  ]}
                  activeOpacity={checkingRideAccess ? 1 : 0.8}
                  disabled={checkingRideAccess}
                  onPress={handleValidateRide}
                >
                  {checkingRideAccess ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.validateButtonText}>
                      Valider le trajet
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}