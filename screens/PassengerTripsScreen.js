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
import {
  setPassengerBookings,
  removePassengerBooking,
} from "../redux/reducers/rides";
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

function formatDisplayedPrice(booking, ride, activeTab) {
  const hasBookingFinalAmount =
    typeof booking?.finalAmount === "number" && booking.finalAmount >= 0;

  const hasBookingMaxAmount =
    typeof booking?.maxAmount === "number" && booking.maxAmount >= 0;

  if (activeTab === "past" && hasBookingFinalAmount) {
    return `${(booking.finalAmount / 100).toFixed(2)} €`;
  }

  if ((activeTab === "upcoming" || activeTab === "current") && hasBookingMaxAmount) {
    return `${(booking.maxAmount / 100).toFixed(2)} €`;
  }

  if (typeof ride?.price === "number") {
    return `${ride.price.toFixed(2)} €`;
  }

  return "0,00 €";
}

export default function PassengerTripsScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.value);
  const bookings = useSelector((state) => state.rides.passengerBookings) || [];

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    route?.params?.initialTab || "upcoming"
  );
  const [bookingActionLoadingId, setBookingActionLoadingId] = useState(null);

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
      if (booking?.status === "cancelled") return;

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
    if (activeTab === "current") return categorized.current;
    if (activeTab === "past") return categorized.past;
    return categorized.upcoming;
  }, [activeTab, categorized]);

  const handleContactDriver = async (booking) => {
    try {
      if (!EXPO_PUBLIC_API_URL) {
        Alert.alert("Erreur", "API URL manquante.");
        return;
      }

      if (!user?.token) {
        Alert.alert("Erreur", "Utilisateur non connecté.");
        return;
      }

      const ride = booking?.ride;
      const driverUser = ride?.user || ride?.driver;

      if (!ride?._id || !driverUser?._id) {
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
            otherUserId: driverUser._id,
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
      
      Alert.alert("Erreur", "Impossible d'ouvrir la conversation.");
    }
  };

  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "Annuler la réservation",
      "Voulez-vous vraiment annuler ce trajet ?",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Oui",
          style: "destructive",
          onPress: async () => {
            try {
              if (!EXPO_PUBLIC_API_URL) {
                Alert.alert("Erreur", "API URL manquante.");
                return;
              }

              setBookingActionLoadingId(bookingId);

              const response = await fetch(
                `${EXPO_PUBLIC_API_URL}/bookings/delete/${bookingId}`,
                {
                  method: "DELETE",
                }
              );

              const data = await response.json();

              if (!response.ok || !data.result) {
                Alert.alert(
                  "Erreur",
                  data.error || "Impossible d’annuler la réservation."
                );
                return;
              }

              dispatch(removePassengerBooking(bookingId));
              Alert.alert("Réservation annulée");
              await fetchPassengerBookings();
            } catch (error) {
             
              Alert.alert("Erreur", "Impossible d’annuler la réservation.");
            } finally {
              setBookingActionLoadingId(null);
            }
          },
        },
      ]
    );
  };

  const renderTripCard = ({ item }) => {
    const ride = item.ride;
    if (!ride) return null;

    const driverUser = ride?.user || ride?.driver || null;

    const isCurrent = activeTab === "current";
    const isUpcoming = activeTab === "upcoming";
    const isPast = activeTab === "past";

    const canTrackRide = ride?.status === "started";
    const isQrValidated = item?.passengerPresenceStatus === "scanned";
    const isBookingActionLoading = bookingActionLoadingId === item._id;

    const displayedPrice = formatDisplayedPrice(item, ride, activeTab);

    return (
      <View style={styles.tripCard}>
        <View style={styles.tripMainRow}>
          <View style={styles.tripLeft}>
            <Text style={styles.tripRouteText}>
              {ride.departureAddress || "Départ"} -{" "}
              {formatHour(ride.departureDateTime)}
            </Text>

            <Text style={styles.tripRouteText}>
              {ride.destinationAddress || "Arrivée"} 
            </Text>

            <View style={styles.tripDivider} />

            <Text style={styles.tripPrice}>{displayedPrice}</Text>
          </View>

          
        <View style={styles.tripMiddle}>
  {driverUser?.profilePhoto ? (
    <Image
      source={{ uri: driverUser.profilePhoto }}
      style={styles.driverImage}
    />
  ) : (
    <View style={styles.driverPlaceholder}>
      <Ionicons name="person" size={22} color="#FFFFFF" />
    </View>
  )}

  <View style={{ flex: 1 }}>
    <Text style={styles.driverName}>
      {driverUser?.prenom || driverUser?.firstname || ""}{" "}
      {driverUser?.nom || driverUser?.lastname || ""}
    </Text>

    <Text style={styles.driverCar}>
      {driverUser?.car?.brand || "Voiture"}{" "}
      {driverUser?.car?.model || ""}
      {driverUser?.car?.licencePlate
        ? ` • ${driverUser.car.licencePlate}`
        : ""}
    </Text>
  </View>
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
              <>
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

                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.secondaryActionButton,
                    isBookingActionLoading && styles.actionButtonDisabled,
                  ]}
                  activeOpacity={isBookingActionLoading ? 1 : 0.8}
                  disabled={isBookingActionLoading}
                  onPress={() => handleCancelBooking(item._id)}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      styles.secondaryActionButtonText,
                      isBookingActionLoading && styles.actionButtonTextDisabled,
                    ]}
                  >
                    {isBookingActionLoading
                      ? "Annulation..."
                      : "Annuler la réservation"}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {isPast && (
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
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("PassengerHome");
            }
          }}
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