import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/DriverEvaluationsStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

export default function DriverEvaluationsScreen({ navigation }) {
  const user = useSelector((state) => state.user?.value);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [rates, setRates] = useState([]);
  const [average, setAverage] = useState(0);
  const [distribution, setDistribution] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchRates = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        const response = await fetch(
          `${EXPO_PUBLIC_API_URL}/rates/driver/${user.token}`
        );
        const data = await response.json();

        if (!response.ok || !data.result) {
          setRates([]);
          setAverage(0);
          setDistribution([]);
          setTotal(0);
          return;
        }

        setRates(data.rates || []);
        setAverage(data.average || 0);
        setDistribution(data.distribution || []);
        setTotal(data.total || 0);
      } catch (error) {
        setRates([]);
        setAverage(0);
        setDistribution([]);
        setTotal(0);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user.token]
  );

  useFocusEffect(
    useCallback(() => {
      fetchRates();
    }, [fetchRates])
  );

  const renderAverageStars = () => {
    const rounded = Math.round(average);

    return [1, 2, 3, 4, 5].map((star) => (
      <Ionicons
        key={star}
        name={star <= rounded ? "star" : "star-outline"}
        size={28}
        color={BORDEAUX}
        style={{ marginHorizontal: 3 }}
      />
    ));
  };

  const maxDistribution = Math.max(
    ...distribution.map((item) => item.count),
    1
  );

  // Loader
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
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()} // ✅ SIMPLE
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Mes évaluations</Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchRates(true)}
              tintColor={BORDEAUX}
            />
          }
        >
          {/* MOYENNE */}
          <View style={styles.summaryCard}>
            <Text style={styles.averageText}>
              {average > 0 ? average.toFixed(1) : "0.0"} / 5
            </Text>

            <View style={styles.averageStarsRow}>
              {renderAverageStars()}
            </View>

            <Text style={styles.totalText}>
              {total} avis reçu{total > 1 ? "s" : ""}
            </Text>
          </View>

          {/* DISTRIBUTION */}
          <View style={styles.histogramCard}>
            {distribution.map((item) => (
              <View key={item.star} style={styles.histogramRow}>
                <Text style={styles.histogramLabel}>{item.star}★</Text>

                <View style={styles.histogramBarBackground}>
                  <View
                    style={[
                      styles.histogramBarFill,
                      {
                        width: `${(item.count / maxDistribution) * 100}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.histogramCount}>{item.count}</Text>
              </View>
            ))}
          </View>

          {/* AVIS */}
          {rates.map((item) => (
            <View key={item._id} style={styles.reviewCard}>
              <View style={styles.avatarWrapper}>
                {item.reviewer?.profilePhoto ? (
                  <Image
                    source={{ uri: item.reviewer.profilePhoto }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Ionicons name="person" size={24} color="#FFFFFF" />
                  </View>
                )}
              </View>

              <View style={styles.reviewContent}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>
                    {item.reviewer?.prenom || "Utilisateur"}{" "}
                    {item.reviewer?.nom || ""}
                  </Text>

                  <Text style={styles.reviewDate}>
                    {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                  </Text>
                </View>

                <View style={styles.reviewStarsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= item.rating ? "star" : "star-outline"}
                      size={16}
                      color={BORDEAUX}
                      style={{ marginRight: 2 }}
                    />
                  ))}
                  <Text style={styles.reviewRatingText}>{item.rating}</Text>
                </View>

                <Text style={styles.reviewComment}>
                  {item.comment?.trim()
                    ? item.comment
                    : "Aucun commentaire laissé."}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}