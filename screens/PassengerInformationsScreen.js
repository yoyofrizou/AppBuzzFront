import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import styles from "../styles/PassengerInformationsStyles";

const PassengerInformationsScreen = ({ navigation }) => {

 const user = useSelector((state) => state.user.value);

const passenger = {
  firstName: user?.prenom || "",
  lastName: user?.nom || "",
  phone: user?.telephone || "",
  email: user?.email || "",
};

const fullName =
  `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim();

  const InfoRow = ({ icon, value }) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Feather name={icon} size={22} color="#5F6368" style={styles.rowIcon} />
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.title}>Informations personnelles</Text>

        <View style={styles.card}>
          <InfoRow icon="user" value={fullName || "Nom non renseigné"} />

          <View style={styles.separator} />

          <InfoRow
            icon="smartphone"
            value={passenger.phone || "Téléphone non renseigné"}
          />

          <View style={styles.separator} />

          <InfoRow
            icon="mail"
            value={passenger.email || "Email non renseigné"}
          />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("UpdatePassengerInfo")}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PassengerInformationsScreen;