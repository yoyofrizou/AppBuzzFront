import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/DriverTripTrackingStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const DEFAULT_LAT_DELTA = 0.02;
const DEFAULT_LNG_DELTA = 0.02;

function formatEtaFromMinutes(minutes) {
  if (!Number.isFinite(minutes) || minutes < 0) return "--:--";

  const now = new Date();
  const arrival = new Date(now.getTime() + minutes * 60 * 1000);

  return arrival.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function distanceInKm(a, b) {
  if (!a || !b) return 0;

  const R = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

function estimateMinutesRemaining(current, destination) {
  const km = distanceInKm(current, destination);
  const averageSpeedKmH = 30;
  return (km / averageSpeedKmH) * 60;
}

export default function DriverTripTrackingScreen({ navigation, route }) {
  const user = useSelector((state) => state.user?.value);
  const rideId = route?.params?.rideId;

  const mapRef = useRef(null);
  const locationSubscriptionRef = useRef(null);
  const previousDriverLocation = useRef(null);

  const [loading, setLoading] = useState(true);
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [endingRide, setEndingRide] = useState(false);
  const [driverHeading, setDriverHeading] = useState(0);

  const animatedDriverLocation = useRef(
    new AnimatedRegion({
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: DEFAULT_LAT_DELTA,
      longitudeDelta: DEFAULT_LNG_DELTA,
    })
  ).current;

  const calculateHeading = useCallback((from, to) => {
    if (!from || !to) return 0;

    const lat1 = (from.latitude * Math.PI) / 180;
    const lon1 = (from.longitude * Math.PI) / 180;
    const lat2 = (to.latitude * Math.PI) / 180;
    const lon2 = (to.longitude * Math.PI) / 180;

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  }, []);

  const fetchRide = useCallback(async () => {
    if (!user?.token || !rideId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/driver/${user.token}`
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        setRide(null);
        return;
      }

      const foundRide = (data.rides || []).find((item) => item._id === rideId);
      setRide(foundRide || null);
    } catch (error) {
      console.log("Erreur récupération suivi conducteur :", error);
      setRide(null);
    } finally {
      setLoading(false);
    }
  }, [rideId, user?.token]);

  const sendLocationToBackend = useCallback(
    async (coords) => {
      if (!coords || !rideId || !user?.token || !EXPO_PUBLIC_API_URL) return;

      try {
        await fetch(`${EXPO_PUBLIC_API_URL}/rides/${rideId}/location`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        });
      } catch (error) {
        console.log("Erreur envoi position backend :", error);
      }
    },
    [rideId, user?.token]
  );

  const startLiveLocation = useCallback(async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "La position est nécessaire pour suivre le trajet en temps réel."
        );
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      const firstCoord = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };

      setDriverLocation(firstCoord);
      previousDriverLocation.current = firstCoord;

      animatedDriverLocation.setValue({
        latitude: firstCoord.latitude,
        longitude: firstCoord.longitude,
        latitudeDelta: DEFAULT_LAT_DELTA,
        longitudeDelta: DEFAULT_LNG_DELTA,
      });

      await sendLocationToBackend(firstCoord);

      mapRef.current?.animateToRegion(
        {
          ...firstCoord,
          latitudeDelta: DEFAULT_LAT_DELTA,
          longitudeDelta: DEFAULT_LNG_DELTA,
        },
        700
      );

      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 4000,
          distanceInterval: 5,
        },
        async (location) => {
          const nextCoord = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          setDriverLocation(nextCoord);
          await sendLocationToBackend(nextCoord);

          mapRef.current?.animateToRegion(
            {
              ...nextCoord,
              latitudeDelta: DEFAULT_LAT_DELTA,
              longitudeDelta: DEFAULT_LNG_DELTA,
            },
            700
          );
        }
      );
    } catch (error) {
      console.log("Erreur position conducteur :", error);
    }
  }, [animatedDriverLocation, sendLocationToBackend]);

  useFocusEffect(
    useCallback(() => {
      fetchRide();
    }, [fetchRide])
  );

  useEffect(() => {
    startLiveLocation();

    return () => {
      if (locationSubscriptionRef.current) {
        locationSubscriptionRef.current.remove();
      }
    };
  }, [startLiveLocation]);

  useEffect(() => {
    if (!driverLocation?.latitude || !driverLocation?.longitude) return;

    const newCoordinate = {
      latitude: driverLocation.latitude,
      longitude: driverLocation.longitude,
    };

    if (previousDriverLocation.current) {
      const heading = calculateHeading(
        previousDriverLocation.current,
        newCoordinate
      );
      setDriverHeading(heading);
    }

    animatedDriverLocation
      .timing({
        latitude: newCoordinate.latitude,
        longitude: newCoordinate.longitude,
        duration: 1000,
        useNativeDriver: false,
      })
      .start();

    previousDriverLocation.current = newCoordinate;
  }, [animatedDriverLocation, calculateHeading, driverLocation]);

  const destination = useMemo(() => {
    if (!ride) return null;

    if (
      typeof ride.destinationLatitude === "number" &&
      typeof ride.destinationLongitude === "number"
    ) {
      return {
        latitude: ride.destinationLatitude,
        longitude: ride.destinationLongitude,
      };
    }

    return null;
  }, [ride]);

  const departure = useMemo(() => {
    if (!ride) return null;

    if (
      typeof ride.departureLatitude === "number" &&
      typeof ride.departureLongitude === "number"
    ) {
      return {
        latitude: ride.departureLatitude,
        longitude: ride.departureLongitude,
      };
    }

    return null;
  }, [ride]);

  const polylineCoordinates = useMemo(() => {
    if (driverLocation && destination) {
      return [driverLocation, destination];
    }

    if (departure && destination) {
      return [departure, destination];
    }

    return [];
  }, [driverLocation, departure, destination]);

  const kmRemaining = useMemo(() => {
    if (!driverLocation || !destination) return null;
    return distanceInKm(driverLocation, destination);
  }, [driverLocation, destination]);

  const etaText = useMemo(() => {
    if (!driverLocation || !destination) return "--:--";
    const minutes = estimateMinutesRemaining(driverLocation, destination);
    return formatEtaFromMinutes(minutes);
  }, [driverLocation, destination]);

  const handleCompleteRide = async () => {
    try {
      setEndingRide(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/${rideId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert("Erreur", data?.error || "Impossible de terminer le trajet.");
        return;
      }

      const presentPassengers = (ride.passengers || []).filter(
        (booking) => booking.passenger || booking.user
      );

      if (presentPassengers.length === 0) {
        navigation.reset({
          index: 0,
          routes: [{ name: "DriverTrips", params: { initialTab: "past" } }],
        });
        return;
      }

      navigation.replace("DriverRate", {
        rideId: ride._id,
        passengers: presentPassengers,
      });
    } catch (error) {
      console.log("Erreur fin de trajet :", error);
      Alert.alert("Erreur", "Impossible de terminer le trajet.");
    } finally {
      setEndingRide(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Chargement du trajet...</Text>
      </View>
    );
  }

  if (!ride) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Trajet introuvable</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const initialRegion = {
    latitude:
      driverLocation?.latitude ||
      departure?.latitude ||
      destination?.latitude ||
      48.8566,
    longitude:
      driverLocation?.longitude ||
      departure?.longitude ||
      destination?.longitude ||
      2.3522,
    latitudeDelta: DEFAULT_LAT_DELTA,
    longitudeDelta: DEFAULT_LNG_DELTA,
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.topBarBack}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.topBarTitle}>Suivi du trajet</Text>

        <View style={styles.topBarSpacer} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
      >
        {departure && (
          <Marker coordinate={departure}>
            <View style={styles.startDot} />
          </Marker>
        )}

        {destination && (
          <Marker coordinate={destination}>
            <View style={styles.destinationPinWrapper}>
              <Ionicons name="location" size={40} color="#FF7A59" />
            </View>
          </Marker>
        )}

        {polylineCoordinates.length >= 2 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeWidth={6}
            strokeColor="#1DA1F2"
          />
        )}

        <Marker.Animated
          coordinate={animatedDriverLocation}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Animated.View
            style={{
              transform: [{ rotate: `${driverHeading}deg` }],
            }}
          >
            <View style={styles.carMarkerContainer}>
              <Ionicons name="car" size={24} color="#7A2335" />
            </View>
          </Animated.View>
        </Marker.Animated>
      </MapView>

      <View style={styles.bottomSheet}>
        <Text style={styles.etaTitle}>Arrivée estimée : {etaText}</Text>
        <Text style={styles.etaSubtitle}>
          {kmRemaining !== null
            ? `${kmRemaining.toFixed(1)} km restants`
            : "-- km restants"}
        </Text>

        <Text style={styles.sectionTitle}>Passagers</Text>

        <View style={styles.passengersRow}>
          {(ride.passengers || []).map((booking) => {
            const passenger = booking.passenger || booking.user;

            return (
              <View key={booking._id} style={styles.passengerItem}>
                <View style={styles.avatarCircle}>
                  {passenger?.profilePhoto ? (
                    <Image
                      source={{ uri: passenger.profilePhoto }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <Ionicons name="person" size={28} color="#777777" />
                  )}
                </View>

                <Text style={styles.passengerName}>
                  {passenger?.prenom || ""}{" "}
                  {passenger?.nom ? `${passenger.nom.charAt(0)}.` : ""}
                </Text>

                <Text style={styles.passengerState}>
                  {booking.passengerPresenceStatus === "scanned"
                    ? "À bord"
                    : booking.passengerPresenceStatus === "manual"
                    ? "Validé manuellement"
                    : booking.passengerPresenceStatus === "absent"
                    ? "Absent"
                    : "Enregistré"}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.securityButton}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Sécurité", "Fonction à brancher.")}
        >
          <Text style={styles.securityButtonText}>Centre de sécurité</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          disabled={endingRide}
          onPress={handleCompleteRide}
        >
          <Text style={styles.primaryButtonText}>
            {endingRide ? "Fin..." : "Trajet terminé"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}