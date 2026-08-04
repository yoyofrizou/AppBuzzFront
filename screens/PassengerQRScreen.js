import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import styles from "../styles/PassengerQRStyles";
import { colors } from "../styles/theme";

export default function PassengerQRScreen({ navigation, route }) {
  const bookingId = route?.params?.bookingId || "booking_demo";
  const rideId = route?.params?.rideId || null;

  const qrValue = JSON.stringify({
    bookingId,
    rideId,
    type: "buzz-passenger-booking",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconBadge}>
          <Ionicons name="qr-code-outline" size={34} color={colors.textPrimary} />
        </View>

        <Text style={styles.title}>Ton QR code</Text>

        <Text style={styles.subtitle}>
          Présente ce QR code au conducteur pour valider ta réservation.
        </Text>

        <View style={styles.qrCard}>
          <QRCode value={qrValue} size={220} />
        </View>

        <View style={styles.bookingIdBadge}>
          <Text style={styles.bookingIdText}>Réservation {bookingId}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
           navigation.navigate("MainTabs", {
             screen: "PassengerTrips",
             params: { initialTab: "upcoming" },
           })
              }
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Voir mon trajet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
                   navigation.navigate("MainTabs", {
                     screen: "PassengerHome",
                     })
                     }
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Retour à l’accueil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}