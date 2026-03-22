import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../styles/PassengerSearchResultsStyles";

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

export default function PassengerSearchResultsScreen({ navigation }) {
  const rides = useSelector((state) => state.rides.searchedRides) || [];
  const searchParams = useSelector((state) => state.rides.searchParams);

  const mapRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState(null);

  const initialRegion = useMemo(() => {
    if (rides.length > 0) {
      return {
        latitude: Number(rides[0].departureLatitude) || 48.8566,
        longitude: Number(rides[0].departureLongitude) || 2.3522,
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
  }, [rides, searchParams]);

  const handleMarkerPress = (ride) => {
    setSelectedRide(ride);
  };

  const handleValidateRide = () => {
    if (!selectedRide?._id) {
      Alert.alert("Erreur", "Trajet introuvable.");
      return;
    }

    navigation.navigate("Payment", {
      rideId: selectedRide._id,
      amount: selectedRide.price ?? 0,
      currency: "eur",
      seatsBooked: 1,
      message: "",
    });
  };

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
            onPress={() => navigation.navigate("ProfileScreen")}
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
        onPress={() => setSelectedRide(null)}
      >
        {rides.map((ride) => {
          const latitude = Number(ride.departureLatitude);
          const longitude = Number(ride.departureLongitude);

          if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
            return null;
          }

          return (
            <Marker
              key={ride._id}
              coordinate={{ latitude, longitude }}
              onPress={() => handleMarkerPress(ride)}
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

      {rides.length > 0 && !selectedRide && (
        <View style={styles.resultsBadge}>
          <Text style={styles.resultsBadgeText}>
            {rides.length} trajet(s) trouvé(s)
          </Text>
        </View>
      )}

      {rides.length === 0 && (
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

<View style={styles.driverCard}>
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
                </View>


                <Text style={styles.modalRoute}>
                  {selectedRide.departureAddress} →{" "}
                  {selectedRide.destinationAddress}
                </Text>

                <Text style={styles.modalMeta}>
                  Départ : {formatFullDate(selectedRide.departureDateTime)}
                </Text>

                <View style={styles.modalPriceRow}>
                  <Text style={styles.modalPrice}>
                    {selectedRide.price ?? 0}€
                  </Text>
                  <Text style={styles.modalSeats}>
                    {selectedRide.placesLeft ?? 1} place(s)
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.validateButton}
                  activeOpacity={0.8}
                  onPress={handleValidateRide}
                >
                  <Text style={styles.validateButtonText}>
                    Valider le trajet
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

/* import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRide } from "../redux/reducers/rides";

export default function PassengerSearchResultsScreen({ navigation }) {
  const dispatch = useDispatch();
  const rides = useSelector((state) => state.rides.searchedRides) || [];

  const renderRide = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          dispatch(setSelectedRide(item));
          navigation.navigate("RideDetailsScreen");
        }}
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {item.departureAddress} → {item.destinationAddress}
        </Text>

        <Text>
          {item.date} • {item.time}
        </Text>

        <Text>{item.price} €</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F5F5", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 20 }}>
        Trajets trouvés
      </Text>

      <FlatList
        data={rides}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderRide}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text>Aucun trajet trouvé</Text>
          </View>
        }
      />
    </View>
  );
} */
