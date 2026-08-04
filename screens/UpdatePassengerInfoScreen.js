import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfos } from "../redux/reducers/user";
import { persistUser } from "../utils/persistUser";
import styles from "../styles/UpdatePassengerInfoStyles";
import { colors } from "../styles/theme";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const UpdatePassengerInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.value);
  const token = user?.token;

  const [firstName, setFirstName] = useState(user?.prenom || "");
  const [lastName, setLastName] = useState(user?.nom || "");
  const [phone, setPhone] = useState(user?.telephone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant dans le fichier .env");
      return;
    }

    if (!token) {
      Alert.alert("Erreur", "Utilisateur non identifié");
      return;
    }

    if (!firstName || !lastName || !phone || !email) {
      Alert.alert("Erreur", "Merci de remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = {
        token,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
      };

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/updatePassengerInfos`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.result) {
        throw new Error(
          data?.message || data?.error || "Erreur lors de la mise à jour"
        );
      }

      const nextInfos = {
        prenom: data.user?.prenom ?? updatedUser.firstName,
        nom: data.user?.nom ?? updatedUser.lastName,
        email: data.user?.email ?? updatedUser.email,
        telephone: data.user?.telephone ?? updatedUser.phone,
      };

      dispatch(updateUserInfos(nextInfos));

      await persistUser({ ...user, ...nextInfos });

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Erreur",
        error.message || "Impossible de sauvegarder vos informations."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Mettre à jour vos informations</Text>
        <Text style={styles.description}>
          Veuillez saisir vos informations personnelles telles qu'elles doivent
          apparaître dans votre profil.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Prénom"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nom"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Téléphone"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Sauvegarder</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassengerInfoScreen;