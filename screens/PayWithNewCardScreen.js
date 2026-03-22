import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import styles from "../styles/PayWithNewCardStyles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PayWithNewCardScreen({ navigation, route }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const rideId = route?.params?.rideId || route?.params?.tripId || null;
  const amount = route?.params?.amount || 12.5;
  const currency = route?.params?.currency || "eur";
  const seatsBooked = route?.params?.seatsBooked || 1;
  const message = route?.params?.message || "";

  const [loading, setLoading] = useState(false);

  const amountInCents = Math.round(amount * 100);

  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  }, [amount, currency]);

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
        maxAmount: amountInCents,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.result) {
      throw new Error(data.error || "Impossible de créer la réservation");
    }

    return data;
  };

  const handlePayWithNewCard = async () => {
    try {
      if (!token) {
        throw new Error("Utilisateur non connecté");
      }

      if (!rideId) {
        throw new Error("Trajet introuvable");
      }

      setLoading(true);

      const response = await fetch(
        `${API_URL}/payments/authorize-payment-onetime`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            maxAmount: amountInCents,
            currency,
            metadata: {
              rideId,
              seatsBooked,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible d'initialiser le paiement");
      }

      const init = await initPaymentSheet({
        merchantDisplayName: "BUZZ",
        paymentIntentClientSecret: data.paymentIntentClientSecret,
        allowsDelayedPaymentMethods: false,
      });

      if (init.error) {
        throw new Error(init.error.message);
      }

      const present = await presentPaymentSheet();

      if (present.error) {
        throw new Error(present.error.message);
      }

      const bookingData = await createBooking(data.paymentIntentId);

      navigation.navigate("PassengerQR", {
        bookingId: bookingData.booking?._id,
        rideId,
        conversationId: bookingData.conversationId,
      });
    } catch (error) {
      Alert.alert("Paiement", error.message || "Le paiement a échoué.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Nouvelle carte</Text>

          <View style={styles.placeholder} />
        </View>

        <View style={styles.card}>
          <Text style={styles.amountLabel}>Montant maximum autorisé</Text>
          <Text style={styles.amountValue}>{formattedAmount}</Text>

          <Text style={styles.description}>
            Cette carte sera utilisée une seule fois et ne sera pas enregistrée
            dans votre profil.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePayWithNewCard}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.payButtonText}>Payer</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Aucun débit définitif immédiat : le montant final sera capturé selon
          les règles du trajet.
        </Text>
      </View>
    </SafeAreaView>
  );
}