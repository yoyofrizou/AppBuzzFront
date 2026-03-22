import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/HomeStyles"

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>BUZZ</Text>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={styles.homeButtonText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={styles.homeButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}