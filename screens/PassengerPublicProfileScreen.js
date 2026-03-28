import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/PassengerPublicProfileStyles";

export default function PassengerPublicProfile({ navigation, route }) {
  const { driverName = "Conducteur" } = route?.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F6" />

      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={28} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.pageTitle}>Profil conducteur</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.driverName}>{driverName}</Text>
            <Text style={styles.placeholderText}>
              Écran profil public conducteur à compléter.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}