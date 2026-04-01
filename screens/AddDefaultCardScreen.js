import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateStripePaymentMethod } from "../redux/reducers/user";
import styles from "../styles/AddDefaultCardStyles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export default function AddDefaultCardScreen({ navigation, route }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const mode = route?.params?.mode || "create-default";
  const [loading, setLoading] = useState(false);

  const title =
    mode === "replace-default"
      ? "Changer de carte"
      : "Ajouter une carte par défaut";

  const description =
    mode === "replace-default"
      ? "Cette nouvelle carte remplacera votre carte par défaut actuelle."
      : "Enregistrez une carte par défaut pour payer plus rapidement vos trajets.";

  const buttonLabel =
    mode === "replace-default"
      ? "Enregistrer comme nouvelle carte par défaut"
      : "Ajouter une carte par défaut";

  const handleAddCard = async () => {
    try {
      if (!token) {
        Alert.alert(
          "Connexion requise",
          "Veuillez vous connecter avant d'ajouter une carte."
        );
        return;
      }

      setLoading(true);

      const response = await fetch(`${API_URL}/payments/setup-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur Stripe");
      }

      const {
        customerId,
        ephemeralKeySecret,
        setupIntentClientSecret,
      } = data;

      const init = await initPaymentSheet({
        merchantDisplayName: "BUZZ",
        customerId,
        customerEphemeralKeySecret: ephemeralKeySecret,
        setupIntentClientSecret,
        allowsDelayedPaymentMethods: false,
        returnURL: "buzz://stripe-redirect",
      });

      if (init.error) {
        throw new Error(init.error.message);
      }

      const present = await presentPaymentSheet();

      if (present.error) {
        throw new Error(present.error.message);
      }

      const setupIntentId = setupIntentClientSecret.split("_secret")[0];

      const attachResponse = await fetch(
        `${API_URL}/payments/attach-default-payment-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            setupIntentId,
          }),
        }
      );

      const attachData = await attachResponse.json();

      if (!attachResponse.ok || !attachData.result) {
        throw new Error(
          attachData.error || "Impossible d'enregistrer la carte"
        );
      }

      Alert.alert(
        "Carte enregistrée",
        "Votre carte par défaut a bien été enregistrée.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erreur paiement",
        error.message || "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          <View style={styles.placeholder} />
        </View>

        <View style={styles.card}>
          <Text style={styles.description}>{description}</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCard}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.addButtonText}>{buttonLabel}</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.testCard}>
            Carte test Stripe : 4242 4242 4242 4242 — 12/34 — 123
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/*import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateStripePaymentMethod } from "../reducers/users";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function AddPaymentMethodScreen({ navigation }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const token = user?.token;

  const [loading, setLoading] = useState(false);

  // texte différent selon l'écran d'origine
  const description =
    source === "profile"
      ? "Enregistre une carte dans ton profil pour payer plus rapidement lors de tes prochains trajets."
      : "Ajoute une carte pour effectuer ce paiement.";

  const handleAddCard = async () => {
    try {
      if (!token) {
        Alert.alert(
          "Connexion requise",
          "Veuillez vous connecter avant d'ajouter une carte."
        );
        return;
      }

      setLoading(true);

      // 1️⃣ créer SetupIntent + ephemeral key
      const response = await fetch(`${API_URL}/payments/setup-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur Stripe");
      }

      const {
        customerId,
        ephemeralKeySecret,
        setupIntentClientSecret,
      } = data;

      // 2️⃣ init PaymentSheet
      const init = await initPaymentSheet({
        merchantDisplayName: "BUZZ",
        customerId,
        customerEphemeralKeySecret: ephemeralKeySecret,
        setupIntentClientSecret,
        allowsDelayedPaymentMethods: false,
      });

      if (init.error) {
        throw new Error(init.error.message);
      }

      // 3️⃣ ouvrir PaymentSheet
      const present = await presentPaymentSheet();

      if (present.error) {
        throw new Error(present.error.message);
      }

      // 4️⃣ récupérer setupIntentId
      const setupIntentId = setupIntentClientSecret.split("_secret")[0];

      // 5️⃣ enregistrer carte par défaut
      const attachResponse = await fetch(
        `${API_URL}/payments/attach-default-payment-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            setupIntentId,
          }),
        }
      );

      const attachData = await attachResponse.json();

      if (!attachResponse.ok || !attachData.result) {
        throw new Error(
          attachData.error || "Impossible d'enregistrer la carte"
        );
      }

      dispatch(
        updateStripePaymentMethod({
          stripeCustomerId: customerId,
          defaultPaymentMethodId: attachData.defaultPaymentMethodId,
        })
      );

      Alert.alert(
        "Carte enregistrée",
        "Votre carte est maintenant enregistrée dans votre profil."
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur paiement", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une carte</Text>

      <Text style={styles.description}>
        Enregistre une carte dans ton profil pour payer plus rapidement lors
        de tes prochains trajets.
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCard}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.addButtonText}>Ajouter une carte</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.testCard}>
        Test Stripe : 4242 4242 4242 4242 — 12/34 — 123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },

  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },

  addButton: {
    backgroundColor: "#ad2831",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },

  testCard: {
    marginTop: 20,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
}); */