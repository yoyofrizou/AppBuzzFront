import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles/DriverPayoutsStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#7A2335";

function formatRideDate(dateString) {
  if (!dateString) return "Trajet du --";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Trajet du --";

  const datePart = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `Trajet du ${datePart} à ${timePart}`;
}

function formatAmount(amount) {
  const value = Number(amount || 0);

  return `+${value.toFixed(2).replace(".", ",")} €`;
}

export default function DriverPayoutsScreen({ navigation }) {
  const user = useSelector((state) => state.user?.value);

  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState([]);

  const fetchPayouts = useCallback(async () => {
    try {
      if (!user?.token) {
        setPayouts([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/payouts/driver/${user.token}`
      );

      const data = await response.json();

      if (!response.ok || !data?.result) {
        setPayouts([]);
        return;
      }

      setPayouts(data.payouts || []);
    } catch (error) {
      console.log("Erreur récupération versements conducteur :", error);
      setPayouts([]);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useFocusEffect(
    useCallback(() => {
      fetchPayouts();
    }, [fetchPayouts])
  );

  const sortedPayouts = useMemo(() => {
    return [...payouts].sort(
      (a, b) =>
        new Date(b?.departureDateTime).getTime() -
        new Date(a?.departureDateTime).getTime()
    );
  }, [payouts]);

  const renderPayout = ({ item }) => {
    const departure =
      item.departureAddress || item.departureCity || "Adresse de départ";
    const destination =
      item.destinationAddress || item.destinationCity || "Adresse d'arrivée";
    const passengersCount =
      item.passengersCount ?? item.passengers?.length ?? item.bookedSeats ?? 0;
    const amount = item.amount ?? item.payoutAmount ?? 0;

    return (
      <View style={styles.card}>
        <Text style={styles.dateText}>
          {formatRideDate(item.departureDateTime)}
        </Text>

        <Text style={styles.routeText}>
          {departure} → {destination}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.passengersText}>
            {passengersCount} passager{passengersCount > 1 ? "s" : ""}
          </Text>

          <Text style={styles.amountText}>{formatAmount(amount)}</Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="card-outline" size={58} color="#8A8A8A" />
        <Text style={styles.emptyTitle}>Aucun versement</Text>
        <Text style={styles.emptyText}>
          Vos versements apparaîtront ici après vos trajets.
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={BORDEAUX} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Mes versements</Text>

          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          data={sortedPayouts}
          keyExtractor={(item, index) => item._id || index.toString()}
          renderItem={renderPayout}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}