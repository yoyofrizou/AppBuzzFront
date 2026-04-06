import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/PaymentStyles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PaymentScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const amount = route?.params?.amount || 12.5;
  const currency = route?.params?.currency || "eur";
  const rideId = route?.params?.rideId || route?.params?.tripId || null;
  const seatsBooked = route?.params?.seatsBooked || 1;
  const message = route?.params?.message || "";

  const [loading, setLoading] = useState(true);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const hasSavedCard = savedCards.length > 0;

  const formatAmount = (value) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(value);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      setPaymentError("");

      if (!API_URL) {
        throw new Error("API_URL manquante");
      }

      if (!token) {
        throw new Error("Token utilisateur manquant");
      }

      const response = await fetch(
        `${API_URL}/payments/payment-methods/${token}`
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible de charger les cartes");
      }

      const cards = data.cards || [];
      setSavedCards(cards);

      const defaultCard =
        cards.find((card) => card.id === data.defaultPaymentMethodId) ||
        cards[0] ||
        null;

      setSelectedCard(defaultCard);
    } catch (error) {
      setPaymentError(error.message || "Impossible de charger les cartes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPaymentMethods();
    }, [token])
  );

  const goToPassengerTripsCurrent = () => {
    navigation.navigate("MainTabs", {
      screen: "PassengerTrips",
      params: { initialTab: "current" },
    });
  };

  const createBooking = async (paymentIntentId) => {
    const response = await fetch(`${API_URL}/bookings/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        ride: rideId,
        seatsBooked,
        message,
        paymentIntentId,
        maxAmount: Math.round(amount * 100),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.result) {
      const backendError =
        data.error || "Impossible de créer la réservation";

      if (
        backendError.includes("Vous avez déjà un trajet en cours")
      ) {
        const conflictError = new Error(backendError);
        conflictError.code = "CURRENT_RIDE_CONFLICT";
        throw conflictError;
      }

      throw new Error(backendError);
    }

    return data;
  };

  const handleAuthorizePayment = async () => {
    if (!selectedCard) return;

    try {
      if (!token) {
        throw new Error("Utilisateur non connecté");
      }

      if (!rideId) {
        throw new Error("Trajet introuvable");
      }

      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/payments/authorize-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          rideId,
          maxAmount: Math.round(amount * 100),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur lors de l'autorisation");
      }

      const bookingData = await createBooking(data.paymentIntentId);

      navigation.navigate("PassengerQR", {
        bookingId: bookingData.booking?._id,
        rideId,
        conversationId: bookingData.conversationId,
      });
    } catch (error) {
      if (error.code === "CURRENT_RIDE_CONFLICT") {
        Alert.alert(
          "Trajet déjà en cours",
          "Vous avez déjà un trajet en cours. Impossible de réserver un autre trajet pour le moment.",
          [
            { text: "Fermer", style: "cancel" },
            {
              text: "Voir mes trajets",
              onPress: goToPassengerTripsCurrent,
            },
          ]
        );
        return;
      }

      Alert.alert("Erreur paiement", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToAddDefaultCard = () => {
    navigation.navigate("AddDefaultCard", {
      source: "payment",
      mode: selectedCard ? "replace-default" : "create-default",
      rideId,
      amount,
      currency,
      seatsBooked,
      message,
    });
  };

  const goToNewCardPayment = () => {
    navigation.navigate("PayWithNewCard", {
      rideId,
      amount,
      currency,
      seatsBooked,
      message,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Paiement</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>Montant maximum autorisé</Text>
          <Text style={styles.amountValue}>{formatAmount(amount)}</Text>
          <Text style={styles.amountHelper}>
            Aucun débit immédiat. Le montant final sera capturé au départ.
          </Text>
        </View>

        <ScrollView style={styles.scroll}>
          {loading && <ActivityIndicator size="small" />}

          {!loading && hasSavedCard && selectedCard && (
            <>
              <Text style={styles.sectionTitle}>Moyen de paiement</Text>

              <View style={styles.cardBox}>
                <Text style={styles.cardText}>
                  {selectedCard.brand?.toUpperCase()} •••• {selectedCard.last4}
                </Text>

                <Text style={styles.cardMeta}>
                  Exp. {selectedCard.expMonth}/{selectedCard.expYear}
                </Text>
              </View>

              <TouchableOpacity onPress={goToAddDefaultCard}>
                <Text style={styles.link}>Changer de carte</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToNewCardPayment}>
                <Text style={styles.link}>Utiliser une nouvelle carte</Text>
              </TouchableOpacity>
            </>
          )}

          {!loading && !hasSavedCard && (
            <>
              <Text style={styles.sectionTitle}>Moyen de paiement</Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={goToAddDefaultCard}
              >
                <Text style={styles.primaryButtonText}>
                  Ajouter une carte par défaut
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={goToNewCardPayment}
              >
                <Text style={styles.secondaryButtonText}>
                  Utiliser une nouvelle carte
                </Text>
              </TouchableOpacity>
            </>
          )}

          {paymentError ? (
            <Text style={styles.errorText}>{paymentError}</Text>
          ) : null}
        </ScrollView>

        {selectedCard && (
          <TouchableOpacity
            style={styles.mainButton}
            onPress={handleAuthorizePayment}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.mainButtonText}>Autoriser le paiement</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}