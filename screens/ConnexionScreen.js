import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
 import { Ionicons } from "@expo/vector-icons";

import { login } from "../redux/reducers/user";
import CustomButton from "../components/CustomButton";
import styles from "../styles/ConnexionStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ConnexionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

const [forgotModalVisible, setForgotModalVisible] = useState(false);
const [forgotEmail, setForgotEmail] = useState("");
const [forgotLoading, setForgotLoading] = useState(false);



const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir l'email et le mot de passe.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(true);
      Alert.alert("Erreur", "Adresse email invalide.");
      return;
    }

    setEmailError(false);

    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "La variable EXPO_PUBLIC_API_URL manque dans le fichier .env.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  email: email.trim().toLowerCase(),
  password,
}),
})

    const data = await response.json();

if (!response.ok || !data.result) {
  Alert.alert("Erreur", data.error || data.message || "Erreur de connexion.");
  return;
}

      dispatch(
        login({
          token: data.token || null,
          _id: data.user?.id || data.user?._id || null,
          prenom: data.user?.prenom || null,
          nom: data.user?.nom || null,
          email: data.user?.email || email.trim().toLowerCase(),
          telephone: data.user?.telephone || null,
          profilePhoto: data.user?.profilePhoto || null,
          
          car: data.user?.car || null,
          photos: data.user?.photos || [],
          driverProfile: data.user?.driverProfile || null,

          stripeCustomerId: data.user?.stripeCustomerId || null,
          defaultPaymentMethodId: data.user?.defaultPaymentMethodId || null,
        })
      );

      navigation.replace("MainTabs", { screen: "PassengerHome" });
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setLoading(false);
    }
  }; 

        const handleForgotPassword = async () => {
  if (!forgotEmail.trim()) {
    Alert.alert("Erreur", "Veuillez entrer votre adresse email.");
    return;
  }

  if (!EMAIL_REGEX.test(forgotEmail.trim())) {
    Alert.alert("Erreur", "Adresse email invalide.");
    return;
  }

  if (!EXPO_PUBLIC_API_URL) {
    Alert.alert("Erreur", "La variable EXPO_PUBLIC_API_URL manque dans le fichier .env.");
    return;
  }

  try {
    setForgotLoading(true);

    const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotEmail.trim().toLowerCase(),
      }),
    });

    const data = await response.json();

    setForgotModalVisible(false);

    Alert.alert(
      "Email envoyé",
      data.message ||
        "Si un compte existe avec cette adresse, un email de réinitialisation a été envoyé."
    );

    setForgotEmail("");
  } catch (error) {
    Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
  } finally {
    setForgotLoading(false);
  }
};
  

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.card}>
          
          <TouchableOpacity
    onPress={() => navigation.navigate("Home")}
    style={styles.backButton}
  >
    <Ionicons name="arrow-back" size={26} color="#111" />
  </TouchableOpacity>

          <Text style={styles.logo}>BUZZ</Text>
          <Text style={styles.title}>Se connecter</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
          />

          {emailError && <Text style={styles.error}>Adresse email invalide</Text>}

          <View style={styles.passwordContainer}>
                        <TextInput
                          placeholder="Mot de passe"
                          style={styles.passwordInput}
                          onChangeText={setPassword}
                          value={password}
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                        />
          
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={22}
                            color="#555"
                          />
                        </TouchableOpacity>
                      </View>

          <TouchableOpacity onPress={() => setForgotModalVisible(true)}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <CustomButton
            title={loading ? "Connexion..." : "Se connecter"}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
     <Modal visible={forgotModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Réinitialiser le mot de passe</Text>

            <Text style={styles.modalText}>
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </Text>

            <TextInput
              placeholder="Votre email"
              style={styles.input}
              value={forgotEmail}
              onChangeText={setForgotEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setForgotModalVisible(false)}
              >
                <Text>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleForgotPassword}
                disabled={forgotLoading}
              >
                <Text>{forgotLoading ? "Envoi..." : "Envoyer"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}