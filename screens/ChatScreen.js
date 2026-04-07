import React, { useCallback, useState } from "react";  //useState memoire locale pour messages/text/isLoading et UseCallback pour memoriser une fonction qu on utilise avec UseFocusEffect
import {
  View,
  Text,
  FlatList, //composant optimisé pour afficher une liste, ici tous les messages
  TextInput, //champ pour taper le message
  TouchableOpacity,
  KeyboardAvoidingView, //évite que le clavier recouvre ton champ de saisie.
  Platform, //permet de savoir si on est sur IOS ou android pour adapter keyboardAvoidingView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; //Évite que le contenu soit caché sous l’encoche ou la barre du haut
import { useSelector } from "react-redux";   //Lire des données dans Redux, ici utilisateur 
import { useFocusEffect } from "@react-navigation/native"; //Déclencher une action quand l’écran reprend le focus, ici recharger les messages quand on arrive sur le chat
import styles from "../styles/ChatStyles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatScreen({ route, navigation }) { //ici pour go back
  const user = useSelector((state) => state.user.value); //lire l utilisateur connecte
  const token = user?.token;     //je recup 2 infos : le token
  const currentUserId = user?._id; //et le currentUserId pour savoir si le message est envoye par moi ou l'autre

  const { conversationId, conversation } = route.params; //recup 2 parametres envoyes a cet ecran, un pour les appels API l'autre pour afficher rapidos les infos sans faire un fetch de suite

  const [messages, setMessages] = useState([]); //liste des messages affiches et fonction pour changer la liste
  const [text, setText] = useState(""); //ce que l'utilisateur ecrit, au depart chaine vide
  const [isLoading, setIsLoading] = useState(true); //Déclencher une action quand l’écran reprend le focus, qd l'ecran s'ouvre on considere qu il est en telechargement

  const isCurrentUserDriver = //compare IdDriver et currentUserId savoir si c est le conducteur qui ecrit ou non
    String(conversation.driver?._id || conversation.driver) === //conversation.driver?._id parce que parfois deja un objet peuple avec id
    String(currentUserId);  //string car l'id en Mongo peut etre une chaine, un objet ou un objectId donc on met tout en texte pour comparer

  const otherUser = isCurrentUserDriver //si je suis conducteur alors autre passager sinon inverse
    ? conversation.passenger           //utile pour afficher le nom de l'autre
    : conversation.driver;

  const headerName =     //construire le nom avec : prenom ou firstname et nom ou lastname
    `${otherUser?.prenom || otherUser?.firstname || ""} ${
      otherUser?.nom || otherUser?.lastname || ""
    }`.trim() ||
    (isCurrentUserDriver  //si le nom du otherUser est pas dispo alors on prend le nom stocke dans la conversation
      ? conversation.passengerName
      : conversation.driverName) ||
    "Utilisateur"; //3eme fallback, sinon utilisateur

  /*const loadMessages = async () => {  //Fonction asynchrone qui va chercher les messages au backend
    try {

      setIsLoading(true); //Avant de lancer le fetch, je mets l’écran en mode chargement

      const response = await fetch(   //appelle mon backend pour récup les messages de cette conversation pour cet utilisateur
        `${API_URL}/messages/${conversationId}/${token}` //quelle conv et quel utilisateur la lit
      );

      const data = await response.json();  //convertit la reponse backend en objet JS

      if (data.result) {   //si le backend rep bien je mets les messages dans l'etat sinon je vide la liste
        setMessages(data.messages || []); //|| [] au cas ou data.messages serait absent
      } else {
        setMessages([]);
      }
    } catch (error) {  //si erreur je mets une liste vide et j arrete le loading comme ca je ne reste pas bloque 
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  }; */

  const loadMessages = async () => {
  try {
    console.log("LOAD MESSAGES CALLED");

    setIsLoading(true);

    const url = `${API_URL}/messages/${conversationId}/${token}`;
    console.log("FETCH URL =", url);

    const response = await fetch(url);
    console.log("RESPONSE STATUS =", response.status);

    const data = await response.json();
    console.log("MESSAGES DATA =", data);

    if (data.result) {
      setMessages(data.messages || []);
    } else {
      setMessages([]);
    }
  } catch (error) {
    console.log("LOAD MESSAGES ERROR =", error);
    setMessages([]);
  } finally {
    setIsLoading(false);
  }
};

  useFocusEffect(    //cette logique se lance quand l’écran prend le focus c est a dire quand on arrive sur le chat et quand on y revient, quand l ecran redevient actif en fait
    useCallback(() => {    //memorise la fonction selon ces dependances
      if (token && conversationId) {  //je charge que si j'ai un token et un id conv pour eviter un appel inutile ou casse
        loadMessages();
      }
    }, [token, conversationId])
  );

  const sendMessage = async () => { //Fonction appelée quand on appuie sur “Envoyer”
    if (!text.trim()) return;   //Si le texte est vide ou seulement des espaces : on n’envoie rien

    try {
      const response = await fetch(`${API_URL}/messages/add`, { 
        method: "POST",  //Tu envoies une requête POST au backend avec token, conversationId et content
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          conversationId,
          content: text,
        }),
      });

      const data = await response.json(); //lis la rep backend

      if (data.result) {
        setText("");
        loadMessages();
      }    //apres je vide le champ texte et recharges les messages
    } catch (error) {}  //en cas d'erreur je fais rien
  };

  const renderMessage = ({ item }) => {    //Fonction appelée par FlatList pour afficher chaque message, item c est le message actuel
    const isSystem = item.type === "system"; //on regarde si c est un message systeme
    const isMine =  //on regarde si le message est a moi en comparant l auteur du message avec mon id utilisateur
      String(item.sender?._id || item.sender) === String(currentUserId);

    if (isSystem) {  //Si le message est système je l affiche dans un style special
      return (
        <View style={styles.systemMessageContainer}>
          <View style={styles.systemMessageBubble}>
            <Text style={styles.systemMessageText}>{item.content}</Text>
          </View>
        </View>
      );
    }

    return (  //Tu affiches une ligne de message pour le message utilisateur
      <View
        style={[
          styles.messageRow,   //style commun + style different si le message est a moi ou non
          isMine ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[   //meme logique pour la bulle
            styles.messageBubble,
            isMine ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[   //pareil pour le texte
              styles.messageText,
              isMine ? styles.myMessageText : styles.otherMessageText,
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

    {/*behavior :si on est sur IOS padding sinon rien de spe    
       headername : nom de l'autre utilisateur dans le header
       isloading : si ca charge j'affiche le bloc chargement
       flatlist : sinon j'affiche la liste des messages
       keyExtractor : cle unique pour chaque message, pour gerer la liste proprement
       data.messages : liste a afficher
       renderItem : affiche une ligne de message
       contentContainerStyle : style global appliqué au contenu de la liste
       inputBar : champ de saisie et bouton
       placeholder : texte gris affiché tant que l’utilisateur n’a rien tapé
       onChangeText : à chaque frappe, tu mets à jour l’état
       multiline False : une seule ligne
       le total est un champ contrôlé par React, l etat decide du texte affiche et la saisie met a jour l etat*/}

  return (

    <SafeAreaView style={styles.container}>  
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{headerName}</Text>
        </View>

        {isLoading ? ( 
          <View style={styles.centerContent}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : (
          <FlatList    
            data={messages}
            keyExtractor={(item) => String(item._id)}  
            renderItem={renderMessage}  
            contentContainerStyle={styles.messagesList} 
          />
        )}

        <View style={styles.inputBar}> 
          <TextInput
            style={styles.input}
            placeholder="Envoyer un message..."  
            value={text}   
            onChangeText={setText}   
            multiline={false}  
          /> 

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

