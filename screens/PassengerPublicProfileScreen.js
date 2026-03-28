import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles/PassengerPublicProfileStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function renderStars(rating = 0, size = 16, color = BORDEAUX) {
  const rounded = Math.round(Number(rating) || 0);

  return [1, 2, 3, 4, 5].map((star) => (
    <Ionicons
      key={star}
      name={star <= rounded ? "star" : "star-outline"}
      size={size}
      color={color}
      style={{ marginRight: 2 }}
    />
  ));
}

export default function PassengerPublicProfileScreen({ navigation, route }) {
  const { passengerId, rideId } = route.params || {};
  const user = useSelector((state) => state.user.value);

  const [loading, setLoading] = useState(true);
  const [contactLoading, setContactLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const fetchPassengerProfile = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rates/passenger-public-profile/${passengerId}`
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert(
          "Erreur",
          data?.error || "Impossible de charger le profil du passager."
        );
        setProfileData(null);
        return;
      }

      const sortedRates = Array.isArray(data.rates)
        ? [...data.rates].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [];

      setProfileData({
        passenger: data.passenger || null,
        average: Number(data.average) || 0,
        total: Number(data.total) || 0,
        distribution: Array.isArray(data.distribution)
          ? data.distribution
          : [],
        rates: sortedRates,
      });
    } catch (error) {
      console.log("Erreur profil public passager :", error);
      Alert.alert("Erreur", "Impossible de charger le profil du passager.");
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, [passengerId]);

  useFocusEffect(
    useCallback(() => {
      fetchPassengerProfile();
    }, [fetchPassengerProfile])
  );

  const handleContactPassenger = async () => {
    try {
      if (!user?.token || !rideId || !passengerId) {
        Alert.alert("Erreur", "Impossible d'ouvrir la conversation.");
        return;
      }

      setContactLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/conversations/open-or-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
            rideId,
            otherUserId: passengerId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result || !data.conversation) {
        Alert.alert(
          "Erreur",
          data?.error || "Impossible d'ouvrir la conversation."
        );
        return;
      }

      navigation.navigate("Chat", {
        conversationId: data.conversation._id,
        conversation: data.conversation,
      });
    } catch (error) {
      console.log("Erreur ouverture conversation profil passager :", error);
      Alert.alert("Erreur", "Impossible d'ouvrir la conversation.");
    } finally {
      setContactLoading(false);
    }
  };

  const passenger = profileData?.passenger || null;
  const rates = Array.isArray(profileData?.rates) ? profileData.rates : [];
  const total = Number(profileData?.total) || 0;
  const average = Number(profileData?.average) || 0;
  const distribution = Array.isArray(profileData?.distribution)
    ? profileData.distribution
    : [];

  const getDistributionCount = useCallback(
    (star) => {
      const found = distribution.find((item) => Number(item.star) === star);
      return found ? Number(found.count) || 0 : 0;
    },
    [distribution]
  );

  const filteredRates = useMemo(() => {
    if (!selectedRating) return rates;

    return rates.filter(
      (rate) => Math.round(Number(rate.rating) || 0) === selectedRating
    );
  }, [rates, selectedRating]);

  const handleSelectRating = (star) => {
    setSelectedRating(star);
  };

  const handleShowAllComments = () => {
    setSelectedRating(null);
  };

  const renderReviewItem = ({ item }) => {
    const reviewer = item.reviewer || {};

    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewAuthor}>
            {reviewer?.prenom || reviewer?.firstname || "Utilisateur"}{" "}
            {reviewer?.nom || reviewer?.lastname || ""}
          </Text>

          <Text style={styles.reviewDate}>{formatDate(item.createdAt)}</Text>
        </View>

        <View style={styles.reviewStars}>
          {renderStars(item.rating, 15)}
        </View>

        {!!item.comment && (
          <Text style={styles.reviewComment}>{item.comment}</Text>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    if (!passenger) return null;

    return (
      <View>
        <View style={styles.topBar}>
          <View style={styles.topBarSpacer} />
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={26} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          {passenger?.profilePhoto ? (
            <Image
              source={{ uri: passenger.profilePhoto }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={38} color="#FFFFFF" />
            </View>
          )}

          <Text style={styles.name}>
            {passenger?.prenom || passenger?.firstname || ""}{" "}
            {passenger?.nom || passenger?.lastname || ""}
          </Text>

          <TouchableOpacity
            style={styles.contactButton}
            activeOpacity={0.8}
            disabled={contactLoading}
            onPress={handleContactPassenger}
          >
            <Text style={styles.contactButtonText}>
              {contactLoading ? "Ouverture..." : "Contacter"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingCard}>
          <Text style={styles.ratingCardTitle}>Avis passager</Text>

          <View style={styles.averageRow}>
            <Text style={styles.averageValue}>{average.toFixed(1)}</Text>

            <View style={styles.averageStars}>
              {renderStars(average, 18)}
            </View>

            <Text style={styles.averageCount}>{total} avis</Text>
          </View>

          <View style={styles.distributionList}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = getDistributionCount(star);
              const ratio = total > 0 ? (count / total) * 100 : 0;
              const isActive = selectedRating === star;

              return (
                <TouchableOpacity
                  key={star}
                  style={[
                    styles.distributionRow,
                    isActive && styles.distributionRowActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleSelectRating(star)}
                >
                  <Text
                    style={[
                      styles.distributionLabel,
                      isActive && styles.distributionLabelActive,
                    ]}
                  >
                    {star} étoiles
                  </Text>

                  <View style={styles.distributionBarTrack}>
                    <View
                      style={[
                        styles.distributionBarFill,
                        { width: `${ratio}%` },
                      ]}
                    />
                  </View>

                  <Text
                    style={[
                      styles.distributionCount,
                      isActive && styles.distributionCountActive,
                    ]}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedRating ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShowAllComments}
            >
              <Text style={styles.showAllText}>
                Voir tous les commentaires
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>
            {selectedRating
              ? `Commentaires ${selectedRating} étoiles`
              : "Tous les commentaires"}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={BORDEAUX} />
        </View>
      </SafeAreaView>
    );
  }

  if (!passenger) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.topBar}>
          <View style={styles.topBarSpacer} />
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={26} color="#111111" />
          </TouchableOpacity>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Profil introuvable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filteredRates}
        keyExtractor={(item, index) => item?._id || index.toString()}
        renderItem={renderReviewItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyCommentsContainer}>
            <Text style={styles.emptyCommentsText}>
              {selectedRating
                ? `Aucun commentaire ${selectedRating} étoiles.`
                : "Aucun commentaire pour le moment."}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}