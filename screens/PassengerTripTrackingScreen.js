import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/PassengerTripTrackingStyles";

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

function toDeg(value) {
  return (value * 180) / Math.PI;
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
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

function estimateMinutesRemaining(current, destination) {
  const km = distanceInKm(current, destination);
  const averageSpeedKmH = 30;
  return (km / averageSpeedKmH) * 60;
}

function getHeading(from, to) {
  if (!from || !to) return 0;

  const lat1 = toRad(from.latitude);
  const lon1 = toRad(from.longitude);
  const lat2 = toRad(to.latitude);
  const lon2 = toRad(to.longitude);

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const bearing = toDeg(Math.atan2(y, x));
  return (bearing + 360) % 360;
}

export default function PassengerTripTrackingScreen({ navigation, route }) {
  const user = useSelector((state) => state.user?.value);
  const bookingId = route?.params?.bookingId;

  const mapRef = useRef(null);
  const previousDriverLocationRef = useRef(null);

  const animatedCoordinate = useRef(
    new AnimatedRegion({
      latitude: 48.8566,
      longitude: 2.3522,
      latitudeDelta: DEFAULT_LAT_DELTA,
      longitudeDelta: DEFAULT_LNG_DELTA,
    })
  ).current;

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [carRotation, setCarRotation] = useState(0);

  const fetchBooking = useCallback(async () => {
    if (!user?.token || !bookingId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/passenger-bookings/${user.token}`
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        setBooking(null);
        return;
      }

      const foundBooking = (data.bookings || []).find(
        (item) => item._id === bookingId
      );

      setBooking(foundBooking || null);
    } catch (error) {
      
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [bookingId, user?.token]);

  useFocusEffect(
    useCallback(() => {
      fetchBooking();
    }, [fetchBooking])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBooking();
    }, 4000);

    return () => clearInterval(interval);
  }, [fetchBooking]);

  const ride = booking?.ride || null;

  const driverLocation = useMemo(() => {
    if (!ride) return null;

    if (
      typeof ride.currentLatitude === "number" &&
      typeof ride.currentLongitude === "number"
    ) {
      return {
        latitude: ride.currentLatitude,
        longitude: ride.currentLongitude,
      };
    }

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

  useEffect(() => {
    if (!driverLocation) return;

    const previous = previousDriverLocationRef.current;

    if (!previous) {
      animatedCoordinate.setValue({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: DEFAULT_LAT_DELTA,
        longitudeDelta: DEFAULT_LNG_DELTA,
      });
    } else {
      const heading = getHeading(previous, driverLocation);
      setCarRotation(heading);

      animatedCoordinate.timing({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    }

    previousDriverLocationRef.current = driverLocation;

    mapRef.current?.animateToRegion(
      {
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: DEFAULT_LAT_DELTA,
        longitudeDelta: DEFAULT_LNG_DELTA,
      },
      1200
    );
  }, [driverLocation, animatedCoordinate]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#8B2332" />
      </View>
    );
  }

  if (!booking?.ride) {
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

  const initialRegion = driverLocation || departure || destination || {
    latitude: 48.8566,
    longitude: 2.3522,
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
        initialRegion={{
          ...initialRegion,
          latitudeDelta: DEFAULT_LAT_DELTA,
          longitudeDelta: DEFAULT_LNG_DELTA,
        }}
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

        {driverLocation && (
  <Marker.Animated
    coordinate={animatedCoordinate}
    anchor={{ x: 0.5, y: 0.5 }}
  >
    <Animated.View
      style={{
        transform: [{ rotate: `${carRotation}deg` }],
      }}
    >
      <View style={styles.carMarkerContainer}>
        <Ionicons name="car" size={24} color="#7A2335" />
      </View>
    </Animated.View>
  </Marker.Animated>
)}
      </MapView>

      <View style={styles.bottomSheet}>
        <Text style={styles.etaTitle}>Arrivée estimée: {etaText}</Text>
        <Text style={styles.etaSubtitle}>
          {kmRemaining !== null
            ? `${kmRemaining.toFixed(1)} km restants`
            : "-- km restants"}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Conducteur</Text>
          <Text style={styles.infoText}>
            {ride.user?.prenom || ""} {ride.user?.nom || ""}
          </Text>
          <Text style={styles.infoSubtext}>
            {ride.user?.car?.brand || "Voiture"}{" "}
            {ride.user?.car?.model || ""}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Statut</Text>
          <Text style={styles.infoText}>
            {ride.status === "started"
              ? "Le trajet est en cours"
              : ride.status === "completed"
              ? "Le trajet est terminé"
              : "En attente du départ"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.arrivedButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("PassengerRate", {
  driver: ride?.driver || ride?.user,
  rideId: ride?._id,
  booking,
  ride,
})
          }
        >
          <Text style={styles.arrivedButtonText}>
            Bien arrivé à destination
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}