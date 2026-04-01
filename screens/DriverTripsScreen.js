import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setDriverRides } from "../redux/reducers/rides";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/DriverTripsStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

function formatDateTime(dateString) {
  if (!dateString) return "--/--/---- à --:--";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "--/--/---- à --:--";

  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} à ${formattedTime}`;
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

export default function DriverTripsScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const rides = useSelector((state) => state.rides.driverRides) || [];

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    route?.params?.initialTab || "upcoming"
  );
  const [bookingActionLoadingId, setBookingActionLoadingId] = useState(null);
  const [startRideLoadingId, setStartRideLoadingId] = useState(null);
  const [cancelRideLoadingId, setCancelRideLoadingId] = useState(null);

  const canPublishRide = Boolean(user?.driverProfile?.isProfileComplete);

  const fetchDriverRides = useCallback(async () => {
    try {
      if (!user?.token) {
        console.log("DRIVER FETCH: NO TOKEN");
        dispatch(setDriverRides([]));
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/driver/${user.token}`
      );

      const data = await response.json();


      if (data.result) {
        dispatch(setDriverRides(data.rides || []));
      } else {
        dispatch(setDriverRides([]));
      }
    } catch (error) {
      dispatch(setDriverRides([]));
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
    }, [route?.params?.initialTab, navigation])
  );

  useFocusEffect(
    useCallback(() => {
      fetchDriverRides();
    }, [fetchDriverRides])
  );

  useEffect(() => {
    if (user?.token) {
      fetchDriverRides();
    } else {
      dispatch(setDriverRides([]));
    }
  }, [user?.token, fetchDriverRides, dispatch]);

  const categorized = useMemo(() => {
    const current = [];
    const upcoming = [];
    const past = [];

    rides.forEach((ride) => {
      const category = ride.tripCategory || getTripCategory(ride);

      if (category === "current") current.push(ride);
      else if (category === "past") past.push(ride);
      else upcoming.push(ride);
    });

    current.sort(
      (a, b) =>
        new Date(a?.departureDateTime).getTime() -
        new Date(b?.departureDateTime).getTime()
    );

    upcoming.sort(
      (a, b) =>
        new Date(a?.departureDateTime).getTime() -
        new Date(b?.departureDateTime).getTime()
    );

    past.sort(
      (a, b) =>
        new Date(b?.departureDateTime).getTime() -
        new Date(a?.departureDateTime).getTime()
    );

    return { current, upcoming, past };
  }, [rides]);

  const displayedRides = useMemo(() => {
    if (activeTab === "current") {
      return categorized.current;
    }

    if (activeTab === "past") {
      return categorized.past;
    }

    return categorized.upcoming;
  }, [activeTab, categorized]);

  const handleScanPassenger = (bookingId) => {
    navigation.navigate("DriverQrScanner", {
      bookingId,
      onValidated: fetchDriverRides,
    });
  };

  const handleManualValidate = async (bookingId) => {
    try {
      setBookingActionLoadingId(bookingId);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/bookings/${bookingId}/manual-validate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert(
          "Erreur",
          data?.error || "Impossible de valider manuellement le passager."
        );
        return;
      }

      await fetchDriverRides();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de valider manuellement le passager.");
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  const handleMarkAbsent = async (bookingId) => {
    try {
      setBookingActionLoadingId(bookingId);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/bookings/${bookingId}/mark-absent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert(
          "Erreur",
          data?.error || "Impossible de marquer le passager absent."
        );
        return;
      }

      await fetchDriverRides();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de marquer le passager absent.");
    } finally {
      setBookingActionLoadingId(null);
    }
  };

  const handleStartRide = async (rideId) => {
    try {
      setStartRideLoadingId(rideId);

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/rides/${rideId}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert(
          "Erreur",
          data?.error || "Impossible de démarrer le trajet pour le moment."
        );
        return;
      }

      await fetchDriverRides();

      navigation.navigate("DriverTripTracking", {
        rideId,
      });
    } catch (error) {
      console.log("Erreur démarrage trajet :", error);
      Alert.alert("Erreur", "Impossible de démarrer le trajet.");
    } finally {
      setStartRideLoadingId(null);
    }
  };

  const getPresenceLabel = (status) => {
    if (status === "scanned") return "QR validé";
    if (status === "manual") return "Validé manuellement";
    if (status === "absent") return "Absent";
    return "En attente";
  };
  
  /*const handleCancelRide = (rideId) => {
  Alert.alert(
    "Annuler le trajet",
    "Voulez-vous vraiment annuler ce trajet ? Toutes les réservations passagers seront annulées.",
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

            setCancelRideLoadingId(rideId);

            const response = await fetch(
              `${EXPO_PUBLIC_API_URL}/rides/${rideId}/cancel`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: user.token,
                }),
              }
            );

            const data = await response.json();

            if (!response.ok || !data.result) {
              Alert.alert(
                "Erreur",
                data?.error || "Impossible d’annuler le trajet."
              );
              return;
            }

            Alert.alert("Trajet annulé");
            await fetchDriverRides();
            setActiveTab("past");
          } catch (error) {
            console.log("Erreur annulation trajet :", error);
            Alert.alert("Erreur", "Impossible d’annuler le trajet.");
          } finally {
            setCancelRideLoadingId(null);
          }
        },
      },
    ]
  );
};*/

const handleCancelRide = (rideId) => {
  Alert.alert(
    "Annuler le trajet",
    "Voulez-vous vraiment annuler ce trajet ? Toutes les réservations passagers seront annulées.",
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

            const url = `${EXPO_PUBLIC_API_URL}/rides/${rideId}/cancel`;
            console.log("CANCEL URL =", url);

            setCancelRideLoadingId(rideId);

            const response = await fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: user.token,
              }),
            });

            console.log("CANCEL STATUS =", response.status);

            const data = await response.json();
            console.log("CANCEL RESPONSE =", data);

            if (!response.ok || !data.result) {
              Alert.alert(
                "Erreur",
                data?.error || "Impossible d’annuler le trajet."
              );
              return;
            }

            Alert.alert("Trajet annulé");
            await fetchDriverRides();
            setActiveTab("past");
          } catch (error) {
            console.log("Erreur annulation trajet =", error);
            Alert.alert("Erreur", "Impossible d’annuler le trajet.");
          } finally {
            setCancelRideLoadingId(null);
          }
        },
      },
    ]
  );
};

  const handleContactPassenger = async (ride, booking) => {
    try {
      const passenger = booking.passenger || booking.user;

      if (!ride?._id || !passenger?._id) {
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
            otherUserId: passenger._id,
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

      navigation.navigate("ChatScreen", {
        conversationId: data.conversation._id,
        conversation: data.conversation,
      });
    } catch (error) {
      console.log("Erreur ouverture conversation conducteur :", error);
      Alert.alert("Erreur", "Impossible d'ouvrir la conversation.");
    }
  };

  const handleOpenPassengerProfile = (booking, ride) => {
    const passenger = booking.passenger || booking.user;

    if (!passenger?._id || !ride?._id) {
      Alert.alert("Erreur", "Impossible d'ouvrir le profil du passager.");
      return;
    }

    navigation.navigate("PassengerPublicProfile", {
      passengerId: passenger._id,
      rideId: ride._id,
    });
  };

  const canOpenUpcomingRide = (ride) => {
    const passengers = ride?.passengers || [];

    if (passengers.length === 0) return false;

    return passengers.every((booking) => {
      const status = booking?.passengerPresenceStatus || "pending";
      return status !== "pending";
    });
  };

  const renderPassengerCard = (booking, ride, showContactOnly = false) => {
    const passenger = booking.passenger || booking.user;
    const status = booking.passengerPresenceStatus || "pending";
    const isPending = status === "pending";
    const isLoading = bookingActionLoadingId === booking._id;
    

    return (
      <View key={booking._id} style={styles.passengerCard}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOpenPassengerProfile(booking, ride)}
        >
          {passenger?.profilePhoto ? (
            <Image
              source={{ uri: passenger.profilePhoto }}
              style={styles.passengerAvatar}
            />
          ) : (
            <View style={styles.passengerAvatarPlaceholder}>
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleOpenPassengerProfile(booking, ride)}
        >
          <Text style={styles.passengerCardName} numberOfLines={2}>
            {passenger?.prenom || passenger?.firstname || ""}{" "}
            {passenger?.nom || passenger?.lastname || ""}
          </Text>
        </TouchableOpacity>

        <Text style={styles.passengerCardStatus}>
          {getPresenceLabel(status)}
        </Text>

        {showContactOnly ? (
          <TouchableOpacity
            style={styles.passengerCardPrimaryButton}
            activeOpacity={0.8}
            onPress={() => handleContactPassenger(ride, booking)}
          >
            <Text style={styles.passengerCardPrimaryButtonText}>Contacter</Text>
          </TouchableOpacity>
        ) : isPending ? (
          <View style={styles.passengerCardButtons}>
            <TouchableOpacity
              style={styles.passengerCardPrimaryButton}
              activeOpacity={0.8}
              disabled={isLoading}
              onPress={() => handleScanPassenger(booking._id)}
            >
              <Text style={styles.passengerCardPrimaryButtonText}>
                {isLoading ? "..." : "Scanner le QR"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.passengerCardSecondaryButton}
              activeOpacity={0.8}
              disabled={isLoading}
              onPress={() => handleManualValidate(booking._id)}
            >
              <Text style={styles.passengerCardSecondaryButtonText}>
                Valider manuellement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.passengerCardSecondaryButton}
              activeOpacity={0.8}
              disabled={isLoading}
              onPress={() => handleMarkAbsent(booking._id)}
            >
              <Text style={styles.passengerCardSecondaryButtonText}>
                Absent
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.passengerCardPrimaryButton}
            activeOpacity={0.8}
            onPress={() => handleContactPassenger(ride, booking)}
          >
            <Text style={styles.passengerCardPrimaryButtonText}>Contacter</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderRide = ({ item }) => {
    const passengers = item.passengers || [];
    const canStartRide = Boolean(item.canStartRide);
    const isUpcoming = activeTab === "upcoming";
    const isPast = activeTab === "past";
    const isStartLoading = startRideLoadingId === item._id;

    const canOpenRide = isUpcoming ? canOpenUpcomingRide(item) : true;
    const isCancelLoading = cancelRideLoadingId === item._id;
     const canCancelRide = isUpcoming && ["published", "open"].includes(item?.status);

    const handlePressRide = () => {
      if (!canOpenRide) {
        Alert.alert(
          "Trajet verrouillé",
          passengers.length === 0
            ? "Vous ne pouvez pas ouvrir ce trajet tant qu’il n’y a pas de réservation."
            : "Vous devez d’abord valider la présence ou l’absence de tous les passagers."
        );
        return;
      }

      navigation.navigate("DriverTripTracking", {
        rideId: item._id,
      });
    };

    return (
      <View style={styles.rideCard}>
        <TouchableOpacity
          activeOpacity={canOpenRide ? 0.85 : 1}
          onPress={handlePressRide}
        >
          <View style={styles.rideHeader}>
            <View style={styles.rideHeaderLeft}>
              <Text style={styles.rideDateTimeText}>
                {formatDateTime(item.departureDateTime)}
              </Text>

              <Text style={styles.rideRouteText}>
                <Text style={styles.labelBold}>Départ : </Text>
                {item.departureAddress || item.departureCity || "Non renseigné"}
              </Text>

              <Text style={styles.rideRouteText}>
                <Text style={styles.labelBold}>Arrivée : </Text>
                {item.destinationAddress ||
                  item.destinationCity ||
                  "Non renseigné"}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={canOpenRide ? "#8B2332" : "#BDBDBD"}
            />
          </View>

          <View style={styles.rideDivider} />

          <View style={styles.rideFooterRow}>
            <Text style={styles.ridePrice}>
              {(item.price ?? 0).toFixed(2)} €
            </Text>

            <Text style={styles.rideSeats}>
              {item.placesLeft ?? item.availableSeats ?? item.seats ?? 0} place
              {(item.placesLeft ?? item.availableSeats ?? item.seats ?? 0) > 1
                ? "s"
                : ""}
            </Text>
          </View>

          {item.description ? (
            <Text style={styles.rideDescription}>{item.description}</Text>
          ) : null}

          {isUpcoming && !canOpenRide ? (
            <Text style={styles.lockedRideText}>
              {passengers.length === 0
                ? "En attente d’une réservation"
                : "Validez d’abord la présence ou l’absence de tous les passagers"}
            </Text>
          ) : null}
        </TouchableOpacity>

        {isUpcoming && (
          <View style={styles.passengersSection}>
            <Text style={styles.passengersSectionTitle}>Passagers</Text>

            {passengers.length === 0 ? (
              <Text style={styles.noPassengersText}>
                Aucun passager pour le moment.
              </Text>
            ) : (
              <View style={styles.passengersGrid}>
                {passengers.map((booking) =>
                  renderPassengerCard(booking, item, false)
                )}
              </View>
            )}

            <TouchableOpacity
              disabled={!canStartRide || isStartLoading}
              style={[
                styles.startRideButton,
                (!canStartRide || isStartLoading) &&
                  styles.startRideButtonDisabled,
              ]}
              activeOpacity={canStartRide && !isStartLoading ? 0.8 : 1}
              onPress={() => handleStartRide(item._id)}
            >
              <Text
                style={[
                  styles.startRideButtonText,
                  (!canStartRide || isStartLoading) &&
                    styles.startRideButtonTextDisabled,
                ]}
              >
                {isStartLoading
                  ? "Démarrage..."
                  : canStartRide
                  ? "Démarrer le trajet"
                  : "En attente des passagers"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {canCancelRide && (
  <TouchableOpacity
    disabled={isCancelLoading}
    style={[
      styles.cancelRideButton,
      isCancelLoading && styles.cancelRideButtonDisabled,
    ]}
    activeOpacity={isCancelLoading ? 1 : 0.8}
    onPress={() => handleCancelRide(item._id)}
  >
    <Text
      style={[
        styles.cancelRideButtonText,
        isCancelLoading && styles.cancelRideButtonTextDisabled,
      ]}
    >
      {isCancelLoading ? "Annulation..." : "Annuler le trajet"}
    </Text>
  </TouchableOpacity>
)}

        {isPast && (
          <View style={styles.passengersSection}>
            <Text style={styles.passengersSectionTitle}>Passagers</Text>

            {passengers.length === 0 ? (
              <Text style={styles.noPassengersText}>
                Aucun passager sur ce trajet.
              </Text>
            ) : (
              <View style={styles.passengersGrid}>
                {passengers.map((booking) =>
                  renderPassengerCard(booking, item, true)
                )}
              </View>
            )}
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
      subtitle = "Vos trajets en cours apparaîtront ici.";
    } else if (activeTab === "upcoming") {
      title = "Aucun trajet à venir";
      subtitle = canPublishRide
        ? "Vos trajets publiés apparaîtront ici."
        : "Complétez votre profil conducteur pour publier un trajet.";
    } else if (activeTab === "past") {
      title = "Aucun trajet passé";
      subtitle = "Vos trajets terminés apparaîtront ici.";
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="car-outline" size={58} color="#8A8A8A" />
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyText}>{subtitle}</Text>

        {activeTab === "upcoming" && canPublishRide ? (
          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("CreateRide")}
          >
            <Text style={styles.emptyButtonText}>Créer un trajet</Text>
          </TouchableOpacity>
        ) : null}

        {activeTab === "upcoming" && !canPublishRide ? (
          <TouchableOpacity
            style={styles.emptySecondaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Text style={styles.emptySecondaryButtonText}>
              Compléter mon profil
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Mes trajets</Text>
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
            data={displayedRides}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={renderRide}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}