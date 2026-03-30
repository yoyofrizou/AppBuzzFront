import React, { useCallback, useMemo, useState } from "react";
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

function formatReviewDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function renderStars(rating = 0, size = 16, color = BORDEAUX) {
  const rounded = Math.round(Number(rating) || 0);

  return [1, 2, 3, 4, 5].map((star) => (
    <Ionicons
      key={star}
      name={star <= rounded ? "star" : "star-outline"}
      size={size}
      color={color}
      style={{ marginRight: 2 }}
    />
  ));
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
  const [selectedRating, setSelectedRating] = useState(null);

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

        if (!response.ok || !data.result) {
          setDriver(null);
          setRates([]);
          setAverage(0);
          setDistribution([]);
          setTotal(0);
          setUpcomingRides([]);
          return;
        }

        const sortedRates = Array.isArray(data.rates)
          ? [...data.rates].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [];

        setDriver(data.driver || null);
        setRates(sortedRates);
        setAverage(Number(data.average) || 0);
        setDistribution(Array.isArray(data.distribution) ? data.distribution : []);
        setTotal(Number(data.total) || 0);

        const filteredUpcoming = (data.upcomingRides || []).filter(
          (item) => String(item?._id) !== String(rideId)
        );

        setUpcomingRides(filteredUpcoming);
      } catch (error) {
        
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

  const filteredRates = useMemo(() => {
    if (!selectedRating) return rates;

    return rates.filter(
      (item) => Math.round(Number(item.rating) || 0) === selectedRating
    );
  }, [rates, selectedRating]);

  const maxDistribution = Math.max(
    ...distribution.map((item) => Number(item.count) || 0),
    1
  );

  const handleSelectRating = (star) => {
    setSelectedRating(star);
  };

  const handleShowAllComments = () => {
    setSelectedRating(null);
  };

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
  <View style={styles.headerSpacer} />

  <Text style={styles.pageTitle}>Profil conducteur</Text>

  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => navigation.goBack()}
    activeOpacity={0.7}
  >
    <Ionicons name="close" size={28} color="#111111" />
  </TouchableOpacity>
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

            <View style={styles.starsRow}>{renderStars(average, 22)}</View>

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

            {distribution.map((item) => {
              const star = Number(item.star) || 0;
              const count = Number(item.count) || 0;
              const isActive = selectedRating === star;

              return (
                <TouchableOpacity
                  key={item.star}
                  style={[
                    styles.histogramRow,
                    isActive && styles.histogramRowActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleSelectRating(star)}
                >
                  <Text
                    style={[
                      styles.histogramLabel,
                      isActive && styles.histogramLabelActive,
                    ]}
                  >
                    {star} étoiles
                  </Text>

                  <View style={styles.histogramBarBackground}>
                    <View
                      style={[
                        styles.histogramBarFill,
                        {
                          width: `${(count / maxDistribution) * 100}%`,
                        },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.histogramCount,
                      isActive && styles.histogramCountActive,
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {selectedRating ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleShowAllComments}
              >
                <Text style={styles.showAllText}>
                  Voir tous les commentaires
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>
              {selectedRating
                ? `Commentaires ${selectedRating} étoiles`
                : "Tous les commentaires"}
            </Text>

            {filteredRates.length === 0 ? (
              <Text style={styles.emptyText}>
                {selectedRating
                  ? `Aucun avis ${selectedRating} étoiles pour le moment.`
                  : "Aucun avis pour le moment."}
              </Text>
            ) : (
              filteredRates.map((item) => (
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
                        {item.reviewer?.prenom ||
                          item.reviewer?.firstname ||
                          "Utilisateur"}{" "}
                        {item.reviewer?.nom || item.reviewer?.lastname || ""}
                      </Text>

                      <Text style={styles.reviewDate}>
                        {formatReviewDate(item.createdAt)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.reviewStarsRow}>
                    {renderStars(item.rating, 16)}
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
                    <Text style={styles.ridePrice}>{ride.price ?? 0}€</Text>

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