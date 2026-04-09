import React, { useState } from "react"; //react = librairie principale qui permet de créer des composants
                   //je prends aussi le hook useState pour creer une petite memoire locale dans le composant
import {   //import des composants react native
  View,   //conteneur (div de react native)
  Text, 
  TouchableOpacity, //bouton cliquable, touchable, peut reagir ou lancer une action (ici pour bouton retour et ajouter une carte)
  ActivityIndicator, //rond qui tourne quand ca charge
  Alert, //afficher une fenetre native de message (succes, erreur, etc)
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; //zone “sûre” qui évite que ton contenu passe sous l'enoche, la barre du haut ou des bords de l'ecran
import { useStripe } from "@stripe/stripe-react-native";  //hook fournit par stripe
import { useSelector } from "react-redux";  //importe deux hook redux, pour lire une donnee et pour envoyer une action Redux
import styles from "../styles/AddDefaultCardStyles"; //importe les styles de cet ecran, je separe logique et visuel

const API_URL = process.env.EXPO_PUBLIC_API_URL; //on met pas l'URL duback direct, on la prend dans le .env

export default function AddDefaultCardScreen({ navigation, route }) {  //c’est ce composant ecran qu’on exporte par défaut depuis ce fichier, navigation pour revenir en arriere ou aller sur un autre ecran et route contient les parametres envoyes a cet ecran
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); //on recup deux fonctions, une qui prepare l interface stripe et l autre qui affiche l'interface stripe
                         //Parce que useStripe() renvoie un objet avec plusieurs propriétés moi je prends que celles la

  const user = useSelector((state) => state.user.value);   //lis l'utilisateur depuis Redux
  const token = user?.token;      //state = tout le store redux / state.user = le slice user et state.user.value = l'objet utilisateur

  const mode = route?.params?.mode || "create-default";
  const [loading, setLoading] = useState(false);   //utilise la petite mémoire locale, dis si le processus stripe est en cours et la fonction pour changer sa valeur setLoading
  // cree un etat local

  const title =   //regarde si l’écran a reçu un paramètre mode
    mode === "replace-default"   
      ? "Changer de carte"
      : "Ajouter une carte par défaut";   //affiche un titre différent selon le mode

  const description =
    mode === "replace-default"   //pareil pour le texte
      ? "Cette nouvelle carte remplacera votre carte par défaut actuelle."
      : "Enregistrez une carte par défaut pour payer plus rapidement vos trajets.";

  const buttonLabel =     //pareil pour le texte du bouton
    mode === "replace-default"
      ? "Enregistrer comme nouvelle carte par défaut"
      : "Ajouter une carte par défaut";

      //ces 3 constantes évitent de dupliquer tout l’écran juste pour changer 3 textes
      //J’ai rendu l’écran réutilisable grâce à un paramètre mode qui adapte les textes sans changer toute la structure

  const handleAddCard = async () => { //fonction lancee quand on clique sur le bouton
              // async : la fonction contient des opérations asynchrones, comme : fetch, stripe et attente reseau
       try {   //si une erreur arrive j irai dans le catch
        if (!token) {
        Alert.alert(
          "Connexion requise",
          "Veuillez vous connecter avant d'ajouter une carte."
        );
        return;   //si pas de token j'affiche une alerte, j'arrete la fonction
      }

      setLoading(true); //je passe a l'ecran en mode chargement

      const response = await fetch(`${API_URL}/payments/setup-intent`, {  //envoie une requete HTTP, URL complete avec route paiement setup-intent
        method: "POST", //envoie des donnees
        headers: {
          "Content-Type": "application/json",  //envoi en json
        },
        body: JSON.stringify({ token }),   //tu transformes l’objet JS en texte JSON
      });    //appelle mon backend pour lui demander de préparer Stripe

      const data = await response.json(); //convertis la reponse backend en objet js

      if (!response.ok || !data.result) {
        throw new Error(data.error || "Erreur Stripe");
      } //si requete echoue alors erreur, ca envoie l'execution dans le catch

      const {
        customerId,
        ephemeralKeySecret,
        setupIntentClientSecret,
      } = data;   //récup les 3 infos renvoyées par ton backend car stripe en a besoin pour preparer le PaymentSheet

      const init = await initPaymentSheet({ //prepare l interface stripe
        merchantDisplayName: "BUZZ",
        customerId,
        customerEphemeralKeySecret: ephemeralKeySecret,
        setupIntentClientSecret,
        allowsDelayedPaymentMethods: false, //desactive les methodes de paiement differees
        returnURL: "buzz://stripe-redirect", //URL de retour dans l’app mobile après le flow Stripe, pour que stripe puisse revenir dans l'app
      });

      if (init.error) {    //Si Stripe n’arrive pas à préparer la feuille de paiement, tu lances une erreur.
        throw new Error(init.error.message);
      }

      const present = await presentPaymentSheet(); //affiche l'interface stripe

      if (present.error) {
        throw new Error(present.error.message);
      }   //si annule ou probleme ca gère ça via catch

      const setupIntentId = setupIntentClientSecret.split("_secret")[0]; //prend le clientSecret, puis extrait la partie avant _secret pour avoir le setupIntentId

      const attachResponse = await fetch(  //appelle mon backend une deuxième fois
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
      ); //mtn que la carte est enregistree il faut l'attacher au customer stripe et la definir comme carte par defaut

      const attachData = await attachResponse.json(); //lire la reponse

      if (!attachResponse.ok || !attachData.result) { //verif erreur
        throw new Error(
          attachData.error || "Impossible d'enregistrer la carte"
        );
      }

      Alert.alert( //affiche succes 
        "Carte enregistrée",
        "Votre carte par défaut a bien été enregistrée.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),   //revient a l ecran precedent quand clique sur ok
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erreur paiement",
        error.message || "Une erreur est survenue"
      );
    } finally {      //Qu’il y ait succès ou erreur, tu remets loading à false sinon le bouton peut rester bloque en chargement
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>  
      <View style={styles.container}> 
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}> 
            <Text style={styles.backText}> </Text>
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

