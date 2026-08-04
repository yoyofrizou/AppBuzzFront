import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/HomeStyles"
import { colors } from "../styles/theme";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.routeRow}>
          <View style={styles.routeDotDeparture} />

          <View style={styles.routeDots}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View key={`dot-left-${index}`} style={styles.routeDot} />
            ))}
          </View>

          <View style={styles.routeCarBadge}>
            <MaterialCommunityIcons name="steering" size={32} color={colors.mint} />
          </View>

          <View style={styles.routeDots}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View key={`dot-right-${index}`} style={styles.routeDot} />
            ))}
          </View>

          <View style={styles.routeDotArrival} />
        </View>

        <Text style={styles.heroCaption}>
          Partagez la route, pas juste les frais.
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
