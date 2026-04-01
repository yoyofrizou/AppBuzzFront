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
import styles from "../styles/PassengerRateStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const BORDEAUX = "#8B2332";

function formatPaidAmount(booking, ride) {
  if (
    typeof booking?.finalAmount === "number" &&
    booking.finalAmount >= 0
  ) {
    return `${(booking.finalAmount / 100).toFixed(2)} €`;
  }

  if (
    typeof booking?.maxAmount === "number" &&
    booking.maxAmount >= 0
  ) {
    return `${(booking.maxAmount / 100).toFixed(2)} €`;
  }

  if (typeof ride?.price === "number") {
    return `${ride.price.toFixed(2)} €`;
  }

  return "0,00 €";
}

export default function PassengerRateScreen({ navigation, route }) {
  const { driver, rideId, booking, ride } = route.params || {};
  const user = useSelector((state) => state.user?.value);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const paidAmount = useMemo(() => {
    return formatPaidAmount(booking, ride);
  }, [booking, ride]);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Note requise", "Merci de sélectionner une note.");
      return;
    }

    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_API_URL est manquant dans le fichier .env."
      );
      return;
    }

    if (!user?.token || !driver?._id || !rideId) {
      Alert.alert("Erreur", "Informations de trajet incomplètes.");
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
        Alert.alert("Information", "Vous avez déjà évalué ce trajet.", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("MainTabs", {
                screen: "PassengerHome",
              }),
          },
        ]);
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
      Alert.alert("Erreur", error.message || "Impossible d'envoyer l'évaluation.");
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
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Évaluation</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Merci d’avoir utilisé Buzz</Text>
        <Text style={styles.summarySubtitle}>Votre trajet est terminé.</Text>
        <Text style={styles.paidAmountLabel}>Montant final payé</Text>
        <Text style={styles.paidAmountValue}>{paidAmount}</Text>
      </View>

      <View style={styles.driverCard}>
        {driver?.profilePhoto ? (
          <Image source={{ uri: driver.profilePhoto }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={42} color="#FFFFFF" />
          </View>
        )}

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