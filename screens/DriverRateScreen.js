import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../styles/DriverRateStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

export default function DriverRateScreen({ navigation, route }) {
  const { passengers = [], rideId } = route.params;
  const user = useSelector((state) => state.user?.value);

  const normalizedPassengers = useMemo(() => {
    return passengers
      .map((item) => ({
        bookingId: item._id,
        passenger: item.passenger || item.user || null,
      }))
      .filter((item) => item.passenger?._id);
  }, [passengers]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [ratings, setRatings] = useState(
    normalizedPassengers.map((item) => ({
      passengerId: item.passenger._id,
      rating: 0,
      comment: "",
    }))
  );

  const currentPassenger = normalizedPassengers[currentIndex];
  const currentRating = ratings[currentIndex]?.rating || 0;
  const currentComment = ratings[currentIndex]?.comment || "";

  const updateCurrentRating = (value) => {
    const next = [...ratings];
    next[currentIndex] = {
      ...next[currentIndex],
      rating: value,
    };
    setRatings(next);
  };

  const updateCurrentComment = (value) => {
    const next = [...ratings];
    next[currentIndex] = {
      ...next[currentIndex],
      comment: value,
    };
    setRatings(next);
  };

  const handleNext = async () => {
    if (currentRating === 0) {
      Alert.alert("Note requise", "Merci de sélectionner une note.");
      return;
    }

    if (currentIndex < normalizedPassengers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rates/rate-passengers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rideId,
            token: user.token,
            ratings,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible d'envoyer les évaluations.");
      }

      Alert.alert("Merci", "Les évaluations ont bien été envoyées.", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("DriverTabs", {
              screen: "DriverHome",
            }),
        },
      ]);
    } catch (error) {
   
      Alert.alert("Erreur", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => updateCurrentRating(star)}>
        <Ionicons
          name={star <= currentRating ? "star" : "star-outline"}
          size={38}
          color={BORDEAUX}
          style={{ marginHorizontal: 4 }}
        />
      </TouchableOpacity>
    ));
  };

  if (!currentPassenger) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun passager à évaluer.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Évaluation des passagers</Text>
        <Text style={styles.stepText}>
          Passager {currentIndex + 1} sur {normalizedPassengers.length}
        </Text>
      </View>

      <View style={styles.passengerCard}>
        {currentPassenger.passenger?.profilePhoto ? (
          <Image
            source={{ uri: currentPassenger.passenger.profilePhoto }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Ionicons name="person" size={42} color="#FFFFFF" />
          </View>
        )}

        <Text style={styles.passengerName}>
          {currentPassenger.passenger?.prenom || ""}{" "}
          {currentPassenger.passenger?.nom || ""}
        </Text>
      </View>

      <Text style={styles.question}>Comment s'est passé ce trajet ?</Text>

      <View style={styles.starsContainer}>{renderStars()}</View>

      <Text style={styles.commentLabel}>Laissez un commentaire (optionnel)</Text>

      <TextInput
        style={styles.input}
        placeholder="Écrivez votre commentaire ici..."
        placeholderTextColor="#A0A0A0"
        multiline
        value={currentComment}
        onChangeText={updateCurrentComment}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          { opacity: currentRating === 0 || loading ? 0.6 : 1 },
        ]}
        disabled={currentRating === 0 || loading}
        onPress={handleNext}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>
            {currentIndex < normalizedPassengers.length - 1
              ? "SUIVANT"
              : "ENVOYER LES ÉVALUATIONS"}
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

