import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/PassengerPaymentsStyles";
import BackButton from "../components/BackButton";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function PassengerPaymentsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const [loadingCard, setLoadingCard] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [defaultCard, setDefaultCard] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [errorCard, setErrorCard] = useState("");
  const [errorHistory, setErrorHistory] = useState("");

  const formatAmount = useCallback((amountInCents, currency = "eur") => {
    const value = Number(amountInCents || 0) / 100;

    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: String(currency).toUpperCase(),
    }).format(value);
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }, []);

  const fetchDefaultCard = async () => {
    try {
      setLoadingCard(true);
      setErrorCard("");

      if (!token) {
        throw new Error("Utilisateur non connecté");
      }

      const response = await fetch(`${API_URL}/payments/payment-methods/${token}`);
      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible de charger la carte");
      }

      const cards = data.cards || [];
      const selected =
        cards.find((card) => card.id === data.defaultPaymentMethodId) ||
        cards[0] ||
        null;

      setDefaultCard(selected);
    } catch (error) {
      setDefaultCard(null);
      setErrorCard(error.message || "Impossible de charger la carte");
    } finally {
      setLoadingCard(false);
    }
  };

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      setErrorHistory("");

      if (!token) {
        throw new Error("Utilisateur non connecté");
      }

      const response = await fetch(`${API_URL}/payments/history/${token}`);
      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur récupération historique");
      }

      setPaymentHistory(data.history || []);
    } catch (error) {
      setPaymentHistory([]);
      setErrorHistory(error.message || "Impossible de charger l'historique");
    } finally {
      setLoadingHistory(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDefaultCard();
      fetchHistory();
    }, [token])
  );

  const goToAddDefaultCard = () => {
    navigation.navigate("AddDefaultCard", {
      mode: defaultCard ? "replace-default" : "create-default",
      source: "profile",
    });
  };

  const historyTitle = useMemo(() => {
    if (paymentHistory.length === 0) return "Aucun paiement pour le moment";
    if (paymentHistory.length === 1) return "1 paiement effectué";
    return `${paymentHistory.length} paiements effectués`;
  }, [paymentHistory.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backWrapper}>
            <BackButton />
          </View>

          <Text style={styles.headerTitle}>Paiement</Text>

          <View style={styles.backWrapper} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Carte par défaut</Text>

          {loadingCard ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
              <Text style={styles.loadingText}>Chargement de la carte...</Text>
            </View>
          ) : defaultCard ? (
            <View style={styles.cardBox}>
              <View style={styles.cardTopRow}>
                <View>
                  <Text style={styles.cardBrand}>
                    {String(defaultCard.brand || "Carte").toUpperCase()} •••• {defaultCard.last4}
                  </Text>
                  <Text style={styles.cardMeta}>
                    Exp. {defaultCard.expMonth}/{defaultCard.expYear}
                  </Text>
                </View>

                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Par défaut</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryAction}
                onPress={goToAddDefaultCard}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryActionText}>
                  Remplacer la carte par défaut
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCardBox}>
              <Ionicons name="card-outline" size={30} color="#7A2335" />
              <Text style={styles.emptyCardTitle}>Aucune carte enregistrée</Text>
              <Text style={styles.emptyCardText}>
                Ajoute une carte par défaut pour payer plus rapidement tes prochains trajets.
              </Text>

              <TouchableOpacity
                style={styles.primaryAction}
                onPress={goToAddDefaultCard}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryActionText}>
                  Ajouter une carte par défaut
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {!!errorCard && <Text style={styles.errorText}>{errorCard}</Text>}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Historique des paiements</Text>
          <Text style={styles.sectionSubtitle}>{historyTitle}</Text>

          {loadingHistory ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator />
              <Text style={styles.loadingText}>
                Chargement de l'historique...
              </Text>
            </View>
          ) : paymentHistory.length === 0 ? (
            <View style={styles.emptyHistoryBox}>
              <Ionicons name="receipt-outline" size={30} color="#7A2335" />
              <Text style={styles.emptyHistoryTitle}>Aucun paiement enregistré</Text>
              <Text style={styles.emptyHistoryText}>
                Tes paiements confirmés apparaîtront ici après tes trajets.
              </Text>
            </View>
          ) : (
            paymentHistory.map((payment) => (
              <View key={payment.id} style={styles.historyCard}>
                <View style={styles.historyTopRow}>
                  <Text style={styles.historyTitle}>{payment.title}</Text>
                  <Text style={styles.historyAmount}>
                    {formatAmount(payment.amount)}
                  </Text>
                </View>

                <Text style={styles.historyDate}>
                  {formatDate(payment.date)}
                </Text>
              </View>
            ))
          )}

          {!!errorHistory && <Text style={styles.errorText}>{errorHistory}</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/*import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import Arrow from "../components/Arrow";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ProfilePaymentScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [cardsResponse, historyResponse] = await Promise.all([
        fetch(`${API_URL}/payments/payment-methods/${token}`),
        fetch(`${API_URL}/payments/history/${token}`),
      ]);

      const cardsData = await cardsResponse.json();
      const historyData = await historyResponse.json();

      if (!cardsResponse.ok || !cardsData.result) {
        throw new Error(cardsData.error || "Erreur cartes");
      }

      if (!historyResponse.ok || !historyData.result) {
        throw new Error(historyData.error || "Erreur historique");
      }

      setCards(cardsData.cards || []);
      setDefaultPaymentMethodId(cardsData.defaultPaymentMethodId || null);
      setHistory(historyData.history || []);
    } catch (err) {
      setError(err.message || "Erreur chargement paiement");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchData();
      }
    }, [token])
  );

  const defaultCard =
    cards.find((card) => card.id === defaultPaymentMethodId) || cards[0] || null;

  const formatAmount = (valueInCents) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format((valueInCents || 0) / 100);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    return new Date(dateValue).toLocaleDateString("fr-FR");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Arrow />

        <Text style={styles.title}>Paiement</Text>

        {loading ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator />
            <Text style={styles.loaderText}>Chargement...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.cardSection}>
              <Text style={styles.sectionTitle}>Mon moyen de paiement</Text>

              {defaultCard ? (
                <View style={styles.defaultCardBox}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Par défaut</Text>
                  </View>

                  <Text style={styles.cardBrand}>
                    {defaultCard.brand?.toUpperCase()} •••• {defaultCard.last4}
                  </Text>
                  <Text style={styles.cardMeta}>
                    Exp. {defaultCard.expMonth}/{defaultCard.expYear}
                  </Text>
                </View>
              ) : (
                <View style={styles.emptyCardBox}>
                  <Text style={styles.emptyCardText}>
                    Aucun moyen de paiement enregistré
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.addPaymentButton}
                onPress={() =>
                  navigation.navigate("AddPaymentMethod", {
                    source: "profile",
                  })
                }
              >
                <Text style={styles.addPaymentButtonText}>
                  Ajouter un moyen de paiement
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.historySection}>
              <Text style={styles.sectionTitle}>Mes versements</Text>

              {history.length === 0 ? (
                <View style={styles.emptyHistoryBox}>
                  <Text style={styles.emptyHistoryText}>
                    Aucun versement pour le moment
                  </Text>
                </View>
              ) : (
                history.map((item) => (
                  <View key={item.id} style={styles.historyRow}>
                    <View style={styles.historyLeft}>
                      <View style={styles.iconCircle}>
                        <Text style={styles.iconText}>€</Text>
                      </View>

                      <View>
                        <Text style={styles.historyTitle}>{item.title}</Text>
                        <Text style={styles.historyDate}>
                          {formatDate(item.date)}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.historyAmount}>
                      {formatAmount(item.amount)}
                    </Text>
                  </View>
                ))
              )}
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    marginBottom: 20,
  },

  loaderBox: {
    marginTop: 40,
    alignItems: "center",
  },

  loaderText: {
    marginTop: 10,
    color: "#666666",
  },

  cardSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111111",
  },

  defaultCardBox: {
    backgroundColor: "#F8F5FF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E9D5FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },

  badgeText: {
    color: "#6B21A8",
    fontSize: 12,
    fontWeight: "700",
  },

  cardBrand: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },

  cardMeta: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },

  emptyCardBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  emptyCardText: {
    color: "#666666",
    fontSize: 14,
  },

  addPaymentButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  addPaymentButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  historySection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  emptyHistoryBox: {
    paddingVertical: 12,
  },

  emptyHistoryText: {
    color: "#666666",
    fontSize: 14,
  },

  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconText: {
    color: "#7C3AED",
    fontWeight: "800",
  },

  historyTitle: {
    fontSize: 15,
    color: "#111111",
    fontWeight: "600",
  },

  historyDate: {
    fontSize: 13,
    color: "#777777",
    marginTop: 2,
  },

  historyAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginLeft: 12,
  },

  errorText: {
    color: "#B42318",
    marginTop: 20,
    textAlign: "center",
  },
});*/