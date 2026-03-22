import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import styles from "../styles/PassengerQRStyles";

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
        <Text style={styles.title}>Ton QR code</Text>

        <Text style={styles.subtitle}>
          Présente ce QR code au conducteur pour valider ta réservation.
        </Text>

        <View style={styles.qrCard}>
          <QRCode value={qrValue} size={220} />
        </View>

        <Text style={styles.bookingIdText}>Booking ID : {bookingId}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("PassengerTrips", {
              initialTab: "upcoming",
            })
          }
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Voir mon trajet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>Retour à l’accueil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}