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
    if (Number.isNaN(date.getTime())) return "";

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

      const response = await fetch(
        `${API_URL}/payments/payment-methods/${token}`
      );
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
                    {String(defaultCard.brand || "Carte").toUpperCase()} ••••{" "}
                    {defaultCard.last4 || "0000"}
                  </Text>
                  <Text style={styles.cardMeta}>
                    Exp. {defaultCard.expMonth || "--"}/
                    {defaultCard.expYear || "--"}
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
                Ajoute une carte par défaut pour payer plus rapidement tes
                prochains trajets.
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
              <Text style={styles.emptyHistoryTitle}>
                Aucun paiement enregistré
              </Text>
              <Text style={styles.emptyHistoryText}>
                Tes paiements confirmés apparaîtront ici après tes trajets.
              </Text>
            </View>
          ) : (
            paymentHistory.map((payment) => (
              <View key={payment._id} style={styles.historyCard}>
                <View style={styles.historyTopRow}>
                  <Text style={styles.historyTitle}>
                    {payment.title || "Trajet"}
                  </Text>
                  <Text style={styles.historyAmount}>
                    {formatAmount(payment.amount || 0)}
                  </Text>
                </View>

                <Text style={styles.historyDate}>
                  {formatDate(payment.date)}
                </Text>
              </View>
            ))
          )}

          {!!errorHistory && (
            <Text style={styles.errorText}>{errorHistory}</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}