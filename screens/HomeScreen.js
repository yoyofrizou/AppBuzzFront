import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TogoLogo from "../components/TogoLogo";
import styles from "../styles/HomeStyles"

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wordmarkBlock}>
        <TogoLogo size={54} style={styles.wordmarkRow} />

        <View style={styles.routeLine}>
          <View style={styles.dotDeparture} />

          <View style={styles.routeDashes}>
            {Array.from({ length: 16 }).map((_, index) => (
              <View key={`dash-${index}`} style={styles.routeDash} />
            ))}
          </View>

          <View style={styles.dotArrival} />
        </View>

        <Text style={styles.tagline}>
          Partagez la route, pas juste les frais.
        </Text>
      </View>

      <View style={styles.buttonsBlock}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={styles.primaryButtonText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={styles.secondaryButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
