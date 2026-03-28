import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/DriverPublicProfileStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

function formatDateTime(dateString) {
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

export default function DriverPublicProfileScreen({ navigation, route }) {
  const { driverId, driverName = "", rideId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [driver, setDriver] = useState(null);
  const [rates, setRates] = useState([]);
  const [average, setAverage] = useState(0);
  const [distribution, setDistribution] = useState([]);
  const [total, setTotal] = useState(0);
  const [upcomingRides, setUpcomingRides] = useState([]);

  const fetchDriverPublicProfile = useCallback(
    async (isRefresh = false) => {
      if (!driverId || !EXPO_PUBLIC_API_URL) {
        setLoading(false);
        setRefreshing(false);
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const response = await fetch(
          `${EXPO_PUBLIC_API_URL}/rates/driver-public-profile/${driverId}`
        );

        const data = await response.json();
        console.log("driver public profile response:", data);

        console.log("rideId courant:", rideId);
        console.log("upcomingRides avant filtre:", data.upcomingRides);

        if (!response.ok || !data.result) {
          setDriver(null);
          setRates([]);
          setAverage(0);
          setDistribution([]);
          setTotal(0);
          setUpcomingRides([]);
          return;
        }

        setDriver(data.driver || null);
        setRates(data.rates || []);
        setAverage(data.average || 0);
        setDistribution(data.distribution || []);
        setTotal(data.total || 0);

        // on enlève éventuellement le trajet déjà consulté
       const filteredUpcoming = (data.upcomingRides || []).filter(
       (item) => String(item?._id) !== String(rideId)
        );

         console.log("upcomingRides après filtre:", filteredUpcoming);

        setUpcomingRides(filteredUpcoming);
      } catch (error) {
        console.log("Erreur récupération profil public conducteur :", error);
        setDriver(null);
        setRates([]);
        setAverage(0);
        setDistribution([]);
        setTotal(0);
        setUpcomingRides([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [driverId, rideId]
  );

  useFocusEffect(
    useCallback(() => {
      fetchDriverPublicProfile();
    }, [fetchDriverPublicProfile])
  );

  const renderAverageStars = () => {
    const rounded = Math.round(average);

    return [1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rounded ? "star" : "star-outline"}
        size={22}
        color={BORDEAUX}
        style={{ marginRight: 2 }}
      />
    ));
  };

  const maxDistribution = Math.max(
    ...distribution.map((item) => item.count),
    1
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F4F6" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={BORDEAUX} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F6" />

      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Profil conducteur</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchDriverPublicProfile(true)}
              tintColor={BORDEAUX}
            />
          }
        >
          <View style={styles.profileCard}>
            {driver?.profilePhoto ? (
              <Image
                source={{ uri: driver.profilePhoto }}
                style={styles.driverImage}
              />
            ) : (
              <View style={styles.driverPlaceholder}>
                <Ionicons name="person" size={34} color="#FFFFFF" />
              </View>
            )}

            <Text style={styles.driverName}>
              {driver?.firstname || driver?.prenom || driverName || ""}{" "}
              {driver?.lastname || driver?.nom || ""}
            </Text>

            <View style={styles.starsRow}>{renderAverageStars()}</View>

            <Text style={styles.averageText}>
              {average > 0 ? average.toFixed(1) : "0.0"} / 5
            </Text>

            <Text style={styles.totalText}>
              {total} avis reçu{total > 1 ? "s" : ""}
            </Text>

            {!!driver?.car && (
              <View style={styles.carBox}>
                <MaterialCommunityIcons
                  name="car"
                  size={18}
                  color={BORDEAUX}
                />
                <Text style={styles.carText}>
                  {driver?.car?.brand || ""} {driver?.car?.model || ""}
                  {driver?.car?.color ? ` • ${driver.car.color}` : ""}
                  {driver?.car?.licencePlate
                    ? ` • ${driver.car.licencePlate}`
                    : ""}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Répartition des notes</Text>

            {distribution.map((item) => (
              <View key={item.star} style={styles.histogramRow}>
                <Text style={styles.histogramLabel}>{item.star}★</Text>

                <View style={styles.histogramBarBackground}>
                  <View
                    style={[
                      styles.histogramBarFill,
                      {
                        width: `${(item.count / maxDistribution) * 100}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.histogramCount}>{item.count}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Avis</Text>

            {rates.length === 0 ? (
              <Text style={styles.emptyText}>Aucun avis pour le moment.</Text>
            ) : (
              rates.map((item) => (
                <View key={item._id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatarWrapper}>
                      {item.reviewer?.profilePhoto ? (
                        <Image
                          source={{ uri: item.reviewer.profilePhoto }}
                          style={styles.reviewAvatar}
                        />
                      ) : (
                        <View style={styles.reviewAvatarFallback}>
                          <Ionicons name="person" size={18} color="#FFFFFF" />
                        </View>
                      )}
                    </View>

                    <View style={styles.reviewHeaderContent}>
                      <Text style={styles.reviewerName}>
                        {item.reviewer?.prenom || "Utilisateur"}{" "}
                        {item.reviewer?.nom || ""}
                      </Text>

                      <Text style={styles.reviewDate}>
                        {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.reviewStarsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= item.rating ? "star" : "star-outline"}
                        size={16}
                        color={BORDEAUX}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                    <Text style={styles.reviewRatingText}>{item.rating}</Text>
                  </View>

                  <Text style={styles.reviewComment}>
                    {item.comment?.trim()
                      ? item.comment
                      : "Aucun commentaire laissé."}
                  </Text>
                </View>
              ))
            )}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Autres trajets prévus</Text>

            {upcomingRides.length === 0 ? (
              <Text style={styles.emptyText}>
                Aucun autre trajet prévu pour le moment.
              </Text>
            ) : (
              upcomingRides.map((ride) => (
                <View key={ride._id} style={styles.rideCard}>
                  <Text style={styles.rideDate}>
                    {formatDateTime(ride.departureDateTime)}
                  </Text>

                  <Text style={styles.rideRouteLabel}>Départ</Text>
                  <Text style={styles.rideRouteText}>
                    {ride.departureAddress || "Adresse non renseignée"}
                  </Text>

                  <Text style={styles.rideRouteLabel}>Arrivée</Text>
                  <Text style={styles.rideRouteText}>
                    {ride.destinationAddress || "Adresse non renseignée"}
                  </Text>

                  <View style={styles.rideFooter}>
                    <Text style={styles.ridePrice}>
                      {ride.price ?? 0}€
                    </Text>

                    <Text style={styles.rideSeats}>
                      {ride.placesLeft ?? 0} place
                      {(ride.placesLeft ?? 0) > 1 ? "s" : ""} disponibles
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}