import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/HomeStyles"
import { colors } from "../styles/theme";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.routeRow}>
          <View style={styles.routeDotStart} />

          <View style={styles.routeDots}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View key={`dot-left-${index}`} style={styles.routeDot} />
            ))}
          </View>

          <View style={styles.routeCarBadge}>
            <Ionicons name="car-sport" size={20} color={colors.white} />
          </View>

          <View style={styles.routeDots}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View key={`dot-right-${index}`} style={styles.routeDot} />
            ))}
          </View>

          <View style={styles.routeDotEnd} />
        </View>

        <Text style={styles.heroCaption}>
          Des trajets partagés, en toute simplicité
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.logo}>TOGO</Text>
        <Text style={styles.tagline}>Voyagez ensemble, simplement.</Text>

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
    </View>
  )
}
