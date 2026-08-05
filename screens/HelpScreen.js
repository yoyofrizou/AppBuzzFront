import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/HelpStyles";
import { colors } from "../styles/theme";
import BackButton from "../components/BackButton";

const FAQ_ITEMS = [
  {
    icon: "car-outline",
    question: "Comment publier un trajet ?",
    answer:
      "Depuis l'accueil conducteur, appuie sur \"Proposer un trajet\", complète les informations du trajet et valide. Il faut d'abord avoir renseigné ta voiture et tes documents dans ton profil.",
  },
  {
    icon: "search-outline",
    question: "Comment réserver un trajet ?",
    answer:
      "Depuis l'accueil passager, indique ton départ et ton arrivée, choisis un trajet dans les résultats puis suis les étapes de paiement pour confirmer ta réservation.",
  },
  {
    icon: "chatbubble-ellipses-outline",
    question: "Comment contacter un conducteur ou un passager ?",
    answer:
      "Une conversation s'ouvre automatiquement dès qu'une réservation est faite. Retrouve-la dans Menu > Messagerie.",
  },
  {
    icon: "card-outline",
    question: "Comment fonctionne le paiement ?",
    answer:
      "Le montant est autorisé au moment de la réservation puis capturé au départ du trajet. Tu peux gérer tes moyens de paiement dans Menu > Paiements.",
  },
  {
    icon: "close-circle-outline",
    question: "Comment annuler un trajet ou une réservation ?",
    answer:
      "Depuis Menu > Trajets, ouvre le trajet à venir concerné et utilise le bouton d'annulation disponible sur sa fiche.",
  },
];

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <BackButton color={colors.textPrimary} />
        <Text style={styles.headerTitle}>Aide</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Les réponses aux questions les plus fréquentes sur TOGO.
        </Text>

        {FAQ_ITEMS.map((item) => (
          <View key={item.question} style={styles.faqCard}>
            <View style={styles.faqQuestionRow}>
              <View style={styles.faqIconBadge}>
                <Ionicons name={item.icon} size={17} color={colors.textPrimary} />
              </View>
              <Text style={styles.faqQuestion}>{item.question}</Text>
            </View>

            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
