import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/HomeStyles"

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

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
