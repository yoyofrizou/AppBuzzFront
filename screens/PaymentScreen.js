import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
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

      console.log("API URL =", EXPO_PUBLIC_API_URL);

      const response = await fetch(
        `${API_URL}/payments/payment-methods/${token}`
      );
      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible de charger les cartes");
      }

      const cards = data.cards || [];
      setSavedCards(cards);
      setSelectedCard(cards[0] || null);
    } catch (error) {
      setPaymentError("Impossible de charger les cartes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPaymentMethods();
    }, [token])
  );

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
      throw new Error(data.error || "Impossible de créer la réservation");
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
      Alert.alert("Erreur paiement", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToAddDefaultCard = () => {
    navigation.navigate("AddDefaultCard");
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
/*import React, { useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PaymentScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const amount = route?.params?.amount || 12.5;
  const currency = route?.params?.currency || "eur";
  const rideId = route?.params?.rideId || route?.params?.tripId || null;
  const passengerName =
    route?.params?.passengerName || user?.firstname || "Passager";
  const seatsBooked = route?.params?.seatsBooked || 1;
  const message = route?.params?.message || "";

  const [loading, setLoading] = useState(true);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
 const [isSubmittingSavedCard, setIsSubmittingSavedCard] = useState(false);
const [isSubmittingNewCard, setIsSubmittingNewCard] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [createdBookingId, setCreatedBookingId] = useState(null);

  const hasAtLeastOneSavedCard = savedCards.length > 0;
  const amountInCents = Math.round(amount * 100);

  const viewState = useMemo(() => {
    if (loading) return "loading";
    if (isSubmittingSavedCard || isSubmittingNewCard) return "processingPayment";
    if (paymentError) return "paymentError";
    if (selectedCard) return "hasSavedCard";
    return "noSavedCard";
  }, [loading, isSubmittingSavedCard, isSubmittingNewCard, paymentError, selectedCard]);

  const formatAmount = (value) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(value);
  };

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      setPaymentError("");

      if (!token) {
        throw new Error("Utilisateur non connecté");
      }

      const response = await fetch(`${API_URL}/payments/payment-methods/${token}`);
      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur récupération cartes");
      }

      const cards = data.cards || [];
      setSavedCards(cards);

      const defaultMethod =
        cards.find((card) => card.id === data.defaultPaymentMethodId) ||
        cards[0] ||
        null;

      setSelectedCard(defaultMethod);
    } catch (error) {
      setPaymentError(error.message || "Impossible de charger la carte");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPaymentMethods();
    }, [token])
  );

  const createBooking = async (paymentIntentIdToSave) => {
    const bookingResponse = await fetch(`${API_URL}/bookings/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        ride: rideId,
        seatsBooked,
        message,
        paymentIntentId: paymentIntentIdToSave,
        maxAmount: amountInCents,
      }),
    });

    const bookingData = await bookingResponse.json();

    if (!bookingResponse.ok || !bookingData.result) {
      throw new Error(bookingData.error || "Impossible de créer la réservation");
    }

    return bookingData.booking._id;
  };

  const goToBookingConfirmed = (bookingId, paymentIntentIdValue) => {
    navigation.navigate("BookingConfirmed", {
      bookingId,
      rideId,
      passengerName,
      paymentIntentId: paymentIntentIdValue,
      amount,
    });
  };

  const handleAuthorizeSavedCardPayment = async () => {
  if (isSubmittingSavedCard || isSubmittingNewCard) return;

  try {
    if (!selectedCard) {
      Alert.alert("Carte requise", "Ajoute une carte pour continuer.");
      return;
    }

    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    if (!rideId) {
      throw new Error("Trajet introuvable");
    }

    setPaymentError("");
    setIsSubmittingSavedCard(true);

    const paymentResponse = await fetch(`${API_URL}/payments/authorize-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        maxAmount: amountInCents,
        metadata: {
          rideId,
          seatsBooked,
        },
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok || !paymentData.result) {
      throw new Error(paymentData.error || "L'autorisation a échoué");
    }

    const newPaymentIntentId = paymentData.paymentIntentId;
    setPaymentIntentId(newPaymentIntentId);

    const realBookingId = await createBooking(newPaymentIntentId);

    setCreatedBookingId(realBookingId);

    goToBookingConfirmed(realBookingId, newPaymentIntentId);
  } catch (error) {
    setPaymentError(error.message || "L'autorisation a échoué.");
  } finally {
    setIsSubmittingSavedCard(false);
  }
};

const handleOneTimeCardPayment = async () => {
  if (isSubmittingSavedCard || isSubmittingNewCard) return;

  try {
    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    if (!rideId) {
      throw new Error("Trajet introuvable");
    }

    setPaymentError("");
    setIsSubmittingNewCard(true);

    const response = await fetch(`${API_URL}/payments/authorize-payment-onetime`, {
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
    });

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

    const newPaymentIntentId = data.paymentIntentId;
    setPaymentIntentId(newPaymentIntentId);

    const realBookingId = await createBooking(newPaymentIntentId);

    setCreatedBookingId(realBookingId);

    goToBookingConfirmed(realBookingId, newPaymentIntentId);
  } catch (error) {
    setPaymentError(error.message || "Le paiement a échoué.");
  } finally {
    setIsSubmittingNewCard(false);
  }
};

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Paiement</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <View style={styles.amountStickyContainer}>
        <Text style={styles.amountLabel}>Montant maximum autorisé</Text>
        <Text style={styles.amountValue}>{formatAmount(amount)}</Text>
        <Text style={styles.amountHelper}>
          Aucun débit immédiat. Le montant final sera capturé au démarrage du trajet.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {viewState === "loading" && (
          <View style={styles.infoBox}>
            <ActivityIndicator size="small" />
            <Text style={styles.infoText}>
              Chargement des moyens de paiement...
            </Text>
          </View>
        )}

        {viewState !== "loading" && hasAtLeastOneSavedCard && selectedCard && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Moyen de paiement</Text>

            <View style={styles.cardBox}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardBrandText}>
                  {selectedCard.brand?.toUpperCase()} •••• {selectedCard.last4}
                </Text>

                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              </View>

              <Text style={styles.cardMetaText}>
                Exp. {selectedCard.expMonth}/{selectedCard.expYear}
              </Text>
            </View>

            <View style={styles.paymentActions}>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  navigation.navigate("AddPaymentMethod", {
                    source: "profile",
                  })
                }
                disabled={isSubmittingSavedCard || isSubmittingNewCard}
              >
                <Text style={styles.linkButtonText}>Changer de carte</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleOneTimeCardPayment}
                disabled={isSubmittingSavedCard || isSubmittingNewCard}
              >
                {isSubmittingNewCard ? (
                  <ActivityIndicator color="#ad2831" />
                ) : (
                  <Text style={styles.secondaryButtonText}>
                    Utiliser une autre carte
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        {viewState !== "loading" && !hasAtLeastOneSavedCard && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Moyen de paiement</Text>

            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>Aucune carte enregistrée</Text>
              <Text style={styles.emptyText}>
                Tu peux payer avec une nouvelle carte sans l’enregistrer.
              </Text>

              <TouchableOpacity
                style={styles.addCardButton}
                onPress={handleOneTimeCardPayment}
                disabled={isSubmittingSavedCard || isSubmittingNewCard}
              >
                {isSubmittingNewCard ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.addCardButtonText}>
                    Payer avec une nouvelle carte
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() =>
                  navigation.navigate("AddPaymentMethod", {
                    source: "profile",
                  })
                }
                disabled={isSubmittingSavedCard || isSubmittingNewCard}
              >
                <Text style={styles.secondaryButtonText}>
                  Enregistrer une carte dans mon profil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!!paymentError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{paymentError}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!selectedCard || isSubmittingSavedCard || isSubmittingNewCard}
          onPress={handleAuthorizeSavedCardPayment}
          style={[
            styles.mainButton,
            (!selectedCard || isSubmittingSavedCard || isSubmittingNewCard) &&
              styles.mainButtonDisabled,
          ]}
        >
          {isSubmittingSavedCard ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.mainButtonText}>Autoriser le paiement</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#F7F7F7" },

  header: {
    height: 56,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: { width: 40, height: 40, justifyContent: "center" },
  backText: { fontSize: 24, color: "#111111" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },
  headerRightPlaceholder: { width: 40 },

  amountStickyContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111111",
  },
  amountHelper: {
    marginTop: 8,
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },

  scrollContent: { paddingBottom: 20 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 12,
  },

  paymentActions: {
  flexDirection: "row",
  marginTop: 12,
  gap: 16,
},

  cardBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardBrandText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },

  cardMetaText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },

  defaultBadge: {
    backgroundColor: "#ECFDF3",
    borderWidth: 1,
    borderColor: "#ABEFC6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  defaultBadgeText: {
    color: "#067647",
    fontSize: 12,
    fontWeight: "700",
  },

  linkButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  linkButtonText: {
    color: "#ad2831",
    fontWeight: "700",
    fontSize: 14,
  },

  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 14,
  },

  addCardButton: {
    backgroundColor: "#ad2831",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  addCardButtonText: {
    color: "white",
    fontWeight: "700",
  },

  secondaryButton: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#ad2831",
    backgroundColor: "#FFFFFF",
  },

  secondaryButtonText: {
    color: "#ad2831",
    fontWeight: "700",
  },

  infoBox: {
    padding: 20,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 15,
    color: "#666666",
    marginTop: 8,
  },

  errorBox: {
    marginHorizontal: 20,
    marginTop: 4,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FDECEC",
  },
  errorText: {
    color: "#B42318",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  mainButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
*/