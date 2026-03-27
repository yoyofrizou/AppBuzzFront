import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/InscriptionStyles";
import CustomButton from "../components/CustomButton";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function InscriptionScreen({ navigation }) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission refusée", "Tu dois autoriser l'accès aux photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setProfileImage(result.assets[0]);
    }
  };

  const validateForm = () => {
    setEmailError(false);
    setPasswordError(false);

    if (!profileImage) {
      return "La photo de profil est obligatoire.";
    }

    if (!prenom || !nom || !email || !telephone || !password || !confirmPassword) {
      return "Tous les champs sont obligatoires.";
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(true);
      return "Adresse email invalide.";
    }

    const phoneRegex = /^[0-9+ ]{8,20}$/;
    if (!phoneRegex.test(telephone.trim())) {
      return "Numéro de téléphone invalide.";
    }

    const passwordRegex = /^(?=.*[^A-Za-z0-9])[A-Za-z0-9\S]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return "Le mot de passe doit contenir au moins 8 caractères et au moins 1 caractère spécial.";
    }

    if (password !== confirmPassword) {
      return "Le mot de passe et la confirmation doivent être identiques.";
    }

    if (!EXPO_PUBLIC_API_URL) {
      return "EXPO_PUBLIC_API_URL est manquant dans le fichier .env.";
    }

    return null;
  };

const handleSignup = async () => {
  const errorMessage = validateForm();

  if (errorMessage) {
    Alert.alert("Erreur", errorMessage);
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("prenom", prenom.trim());
    formData.append("nom", nom.trim());
    formData.append("email", email.trim().toLowerCase());
    formData.append("telephone", telephone.trim());
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    formData.append("profilePhoto", {
      uri: profileImage.uri,
      name: profileImage.fileName || `profile-${Date.now()}.jpg`,
      type: profileImage.mimeType || "image/jpeg",
    });

    const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/register`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.result) {
      Alert.alert(
        "Erreur",
        data.error || data.message || "Erreur lors de la création du compte."
      );
      return;
    }

    Alert.alert(
      "Compte créé",
      "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Connexion"),
        },
      ]
    );
  } catch (error) {
    Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={26} color="#111" />
            </TouchableOpacity>

            <Text style={styles.logo}>BUZZ</Text>
            <Text style={styles.title}>Créer un compte</Text>

            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage.uri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}

              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Prénom"
              style={styles.input}
              onChangeText={setPrenom}
              value={prenom}
            />

            <TextInput
              placeholder="Nom"
              style={styles.input}
              onChangeText={setNom}
              value={nom}
            />

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

            <TextInput
              placeholder="Numéro de téléphone"
              style={styles.input}
              onChangeText={setTelephone}
              value={telephone}
              keyboardType="phone-pad"
            />

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

            <Text
              style={[
                styles.passwordInfo,
                passwordError && styles.passwordInfoError,
              ]}
            >
              Minimum 8 caractères (lettres ou chiffres), dont 1 caractère spécial.
            </Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirmation mot de passe"
                style={styles.passwordInput}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <CustomButton
              title={loading ? "Création..." : "Créer mon compte"}
              onPress={handleSignup}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


/*import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import styles from "../styles/InscriptionStyles";
import CustomButton from "../components/CustomButton"
import { Ionicons } from "@expo/vector-icons";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL
// Grabbed from emailregex.com
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function InscriptionScreen({ navigation }) {

  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [profileImage, setProfileImage] = useState(null)

  const [emailError, setEmailError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      Alert.alert("Permission refusée", "Tu dois autoriser l'accès aux photos.")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0])
    }
  }

  const validateForm = () => {
    setEmailError(false);
    setPasswordError(false);

    if (!profileImage) {
      return "La photo de profil est obligatoire."
    }

    if (!prenom || !nom || !email || !telephone || !password || !confirmPassword) {
      return "Tous les champs sont obligatoires."
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError(true)
      return "Adresse email invalide."
    }

    setEmailError(false)

    const phoneRegex = /^[0-9+ ]{8,20}$/
    if (!phoneRegex.test(telephone.trim())) {
      return "Numéro de téléphone invalide."
    }

    const passwordRegex = /^(?=.*[^A-Za-z0-9])[A-Za-z0-9\S]{8,}$/
if (!passwordRegex.test(password)) {
  setPasswordError(true);
  return "Le mot de passe doit contenir au moins 8 caractères et au moins 1 caractère spécial.";
}
setPasswordError(false);

    if (password !== confirmPassword) {
      return "Le mot de passe et la confirmation doivent être identiques."
    }

    if (!EXPO_PUBLIC_API_URL) {
      return "EXPO_PUBLIC_API_URL est manquant dans le fichier .env."
    }

    return null
  }

  const handleSignup = async () => {
    const errorMessage = validateForm()

    if (errorMessage) {
      Alert.alert("Erreur", errorMessage)
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("prenom", prenom.trim())
      formData.append("nom", nom.trim())
      formData.append("email", email.trim().toLowerCase())
      formData.append("telephone", telephone.trim())
      formData.append("password", password)
      formData.append("confirmPassword", confirmPassword)

      formData.append("profilePhoto", {
  uri: profileImage.uri,
  name: `profile-${Date.now()}.jpg`,
  type: "image/jpeg",
      })

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/register`, {
  method: "POST",
  body: formData,
});

const data = await response.json();

if (!response.ok || !data.result) {
  Alert.alert(
    "Erreur",
    data.error || data.message || "Erreur lors de la création du compte."
  );
  return;
}
 Alert.alert(
        "Compte créé",
        "Votre compte a bien été créé. Vous pouvez maintenant vous connecter.",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Connexion"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <TouchableOpacity
    onPress={() => navigation.navigate("Home")}
    style={styles.backButton}
  >
    <Ionicons name="arrow-back" size={26} color="#111" />
  </TouchableOpacity>
            <Text style={styles.logo}>BUZZ</Text>
            <Text style={styles.title}>Créer un compte</Text>

            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={pickImage}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage.uri }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}

              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Prénom"
              style={styles.input}
              onChangeText={setPrenom}
              value={prenom}
            />

            <TextInput
              placeholder="Nom"
              style={styles.input}
              onChangeText={setNom}
              value={nom}
            />

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

            <TextInput
              placeholder="Numéro de téléphone"
              style={styles.input}
              onChangeText={setTelephone}
              value={telephone}
              keyboardType="phone-pad"
            />

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

<Text
  style={[
    styles.passwordInfo,
    passwordError && styles.passwordInfoError,
  ]}
>
  Minimum 8 caractères (lettres ou chiffres), dont 1 caractère spécial.
</Text>

           <View style={styles.passwordContainer}>
  <TextInput
    placeholder="Confirmation mot de passe"
    style={styles.passwordInput}
    onChangeText={setConfirmPassword}
    value={confirmPassword}
    secureTextEntry={!showConfirmPassword}
    autoCapitalize="none"
  />

  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
    <Ionicons
      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
      size={22}
      color="#555"
    />
  </TouchableOpacity>
</View>

            <CustomButton
              title={loading ? "Création..." : "Créer mon compte"}
              onPress={handleSignup}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}*/