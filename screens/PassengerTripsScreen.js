import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerBookings } from "../redux/reducers/rides";
import styles from "../styles/PassengerTripsStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

function formatHour(dateString) {
  if (!dateString) return "--:--";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "--:--";

  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTripCategory(ride) {
  if (!ride?.departureDateTime) return "upcoming";

  const now = new Date();
  const departure = new Date(ride.departureDateTime);

  if (Number.isNaN(departure.getTime())) return "upcoming";

  const twoHoursAfterDeparture = new Date(
    departure.getTime() + 2 * 60 * 60 * 1000
  );

  if (now < departure) return "upcoming";
  if (now >= departure && now <= twoHoursAfterDeparture) return "current";
  return "past";
}

export default function PassengerTripsScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.value);
  const bookings = useSelector((state) => state.rides.passengerBookings) || [];

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    route?.params?.initialTab || "upcoming"
  );

  const fetchPassengerBookings = useCallback(async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_API_URL est manquant dans le fichier .env."
      );
      setLoading(false);
      return;
    }

    if (!user?.token) {
      dispatch(setPassengerBookings([]));
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
        dispatch(setPassengerBookings([]));
        return;
      }

      dispatch(setPassengerBookings(data.bookings || []));
    } catch (error) {
      console.log("Erreur récupération trajets passager :", error);
      dispatch(setPassengerBookings([]));
    } finally {
      setLoading(false);
    }
  }, [dispatch, user?.token]);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.initialTab) {
        setActiveTab(route.params.initialTab);

        navigation.setParams({
          initialTab: undefined,
        });
      }

      fetchPassengerBookings();
    }, [fetchPassengerBookings, route?.params?.initialTab, navigation])
  );

  const categorized = useMemo(() => {
    const current = [];
    const upcoming = [];
    const past = [];

    bookings.forEach((booking) => {
      const ride = booking.ride;
      const category =
        booking.tripCategory || ride?.tripCategory || getTripCategory(ride);

      if (category === "current") current.push(booking);
      else if (category === "past") past.push(booking);
      else upcoming.push(booking);
    });

    current.sort(
      (a, b) =>
        new Date(a.ride?.departureDateTime).getTime() -
        new Date(b.ride?.departureDateTime).getTime()
    );

    upcoming.sort(
      (a, b) =>
        new Date(a.ride?.departureDateTime).getTime() -
        new Date(b.ride?.departureDateTime).getTime()
    );

    past.sort(
      (a, b) =>
        new Date(b.ride?.departureDateTime).getTime() -
        new Date(a.ride?.departureDateTime).getTime()
    );

    return { current, upcoming, past };
  }, [bookings]);

  const displayedBookings = useMemo(() => {
    if (activeTab === "current") {
      return categorized.current;
    }

    if (activeTab === "past") {
      return categorized.past;
    }

    return categorized.upcoming;
  }, [activeTab, categorized]);

  const handleContactDriver = async (booking) => {
    try {
      const ride = booking?.ride;

      if (!ride?._id || !ride?.driver?._id) {
        Alert.alert("Erreur", "Impossible de trouver cette conversation.");
        return;
      }

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/conversations/open-or-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
            rideId: ride._id,
            otherUserId: ride.driver._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result || !data.conversation) {
        Alert.alert(
          "Erreur",
          data.error || "Impossible d'ouvrir la conversation."
        );
        return;
      }

      navigation.navigate("Chat", {
        conversationId: data.conversation._id,
        conversation: data.conversation,
      });
    } catch (error) {
      console.log("Erreur ouverture conversation passager :", error);
      Alert.alert("Erreur", "Impossible d'ouvrir la conversation.");
    }
  };

  const renderTripCard = ({ item }) => {
    const ride = item.ride;
    if (!ride) return null;

    const isCurrent = activeTab === "current";
    const isUpcoming = activeTab === "upcoming";
    const canTrackRide = ride?.status === "started";
    const isQrValidated = item?.passengerPresenceStatus === "scanned";
    const isManualValidation = item?.passengerPresenceStatus === "manual";

    return (
      <View style={styles.tripCard}>
        <View style={styles.tripMainRow}>
          <View style={styles.tripLeft}>
            <Text style={styles.tripRouteText}>
              {ride.departureAddress || "Départ"} -{" "}
              {formatHour(ride.departureDateTime)}
            </Text>

            <Text style={styles.tripRouteText}>
              {ride.destinationAddress || "Arrivée"} -{" "}
              {formatHour(ride.departureDateTime)}
            </Text>

            <View style={styles.tripDivider} />

            <Text style={styles.tripPrice}>
              {(ride.price ?? 0).toFixed(2)} €
            </Text>
          </View>

          <View style={styles.tripMiddle}>
            {ride.driver?.profilePhoto ? (
              <Image
                source={{ uri: ride.driver.profilePhoto }}
                style={styles.driverImage}
              />
            ) : (
              <View style={styles.driverPlaceholder}>
                <Ionicons name="person" size={22} color="#FFFFFF" />
              </View>
            )}

            <Text style={styles.driverName}>
              {ride.driver?.prenom || ""} {ride.driver?.nom || ""}
            </Text>

            <Text style={styles.driverCar}>
              {ride.driver?.car?.brand || "Voiture"}{" "}
              {ride.driver?.car?.model || ""}
              {ride.driver?.car?.licencePlate
                ? ` - ${ride.driver.car.licencePlate}`
                : ""}
            </Text>
          </View>

          <View style={styles.tripRight}>
            {isCurrent && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  !canTrackRide && styles.actionButtonDisabled,
                ]}
                activeOpacity={canTrackRide ? 0.8 : 1}
                disabled={!canTrackRide}
                onPress={() => {
                  if (!canTrackRide) return;

                  navigation.navigate("PassengerTripTracking", {
                    bookingId: item._id,
                  });
                }}
              >
                <Text
                  style={[
                    styles.actionButtonText,
                    !canTrackRide && styles.actionButtonTextDisabled,
                  ]}
                >
                  {canTrackRide
                    ? "Suivi du trajet"
                    : "En attente du départ"}
                </Text>
              </TouchableOpacity>
            )}

            {isUpcoming && (
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("PassengerQR", {
                    bookingId: item._id,
                  })
                }
              >
                <Text style={styles.actionButtonText}>Voir le QR code</Text>
              </TouchableOpacity>
            )}

            {activeTab === "past" && (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.8}
                  onPress={() => handleContactDriver(item)}
                >
                  <Text style={styles.actionButtonText}>Contacter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryActionButton]}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert("Info", "Détail du trajet passé à venir.")
                  }
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      styles.secondaryActionButtonText,
                    ]}
                  >
                    Voir le détail
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {isUpcoming && isQrValidated && (
          <View style={styles.validationInfoBox}>
            <Text style={styles.validationInfoTitle}>QR code validé</Text>
            <Text style={styles.validationInfoText}>
              Le conducteur a validé votre QR code. Attendez le démarrage du
              trajet.
            </Text>
          </View>
        )}

        {isUpcoming && isManualValidation && (
          <View style={styles.manualWarningBox}>
            <Text style={styles.manualWarningTitle}>
              Présence validée manuellement
            </Text>
            <Text style={styles.manualWarningText}>
              Le conducteur a validé votre présence manuellement. Vérifiez la
              plaque, le véhicule et l’identité du chauffeur avant de monter.
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => {
    let title = "Aucun trajet";
    let subtitle = "Aucun trajet trouvé pour cet onglet.";

    if (activeTab === "current") {
      title = "Aucun trajet en cours";
      subtitle = "Votre trajet en cours apparaîtra ici.";
    } else if (activeTab === "upcoming") {
      title = "Aucun trajet à venir";
      subtitle = "Vos trajets réservés apparaîtront ici avec leur QR code.";
    } else if (activeTab === "past") {
      title = "Aucun trajet passé";
      subtitle = "Vos trajets terminés apparaîtront ici.";
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptySubtitle}>{subtitle}</Text>
      </View>
    );
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

        <Text style={styles.topBarTitle}>Mes trajets</Text>

        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.tabsWrapper}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "current" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("current")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "current" && styles.tabButtonTextActive,
              ]}
            >
              En cours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "upcoming" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "upcoming" && styles.tabButtonTextActive,
              ]}
            >
              À venir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "past" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "past" && styles.tabButtonTextActive,
              ]}
            >
              Passés
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#7A2335" />
          </View>
        ) : (
          <FlatList
            data={displayedBookings}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={renderTripCard}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}