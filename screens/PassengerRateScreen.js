import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../styles/PassengerRateStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

export default function PassengerRateScreen({ navigation, route }) {
  const { driver, rideId } = route.params;
  const user = useSelector((state) => state.user?.value);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Note requise", "Merci de sélectionner une note.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/rates/rate-driver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverId: driver._id,
          rideId,
          rating,
          comment,
          token: user.token,
        }),
      });

      const data = await response.json();

      if (data.error === "ALREADY_RATED") {
        Alert.alert("Information", "Vous avez déjà évalué ce trajet.");
        navigation.goBack();
        return;
      }

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Impossible d'envoyer l'évaluation.");
      }

      Alert.alert("Merci", "Votre évaluation a bien été envoyée.", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("MainTabs", {
              screen: "PassengerHome",
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
      <TouchableOpacity key={star} onPress={() => setRating(star)}>
        <Ionicons
          name={star <= rating ? "star" : "star-outline"}
          size={38}
          color={BORDEAUX}
          style={{ marginHorizontal: 4 }}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Évaluation</Text>
      </View>

      <View style={styles.driverCard}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={42} color="#FFFFFF" />
        </View>

        <Text style={styles.driverName}>
          {driver?.prenom || ""} {driver?.nom || ""}
        </Text>

        <Text style={styles.driverCar}>
          {driver?.car?.brand || "Voiture"} {driver?.car?.model || ""}
        </Text>
      </View>

      <Text style={styles.question}>Comment s'est passé votre trajet ?</Text>

      <View style={styles.starsContainer}>{renderStars()}</View>

      <Text style={styles.commentLabel}>Laissez un commentaire (optionnel)</Text>

      <TextInput
        style={styles.input}
        placeholder="Écrivez votre commentaire ici..."
        placeholderTextColor="#A0A0A0"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      <TouchableOpacity
        style={[
          styles.submitButton,
          { opacity: rating === 0 || loading ? 0.6 : 1 },
        ]}
        disabled={rating === 0 || loading}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>ENVOYER L'ÉVALUATION</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}