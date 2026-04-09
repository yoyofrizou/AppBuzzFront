/*afficher les documents conducteur
permettre d’en choisir un depuis la galerie
l’envoyer au backend
enregistrer les URLs reçues
mettre à jour Redux
revenir en arrière après sauvegarde*/

import { useState } from "react"; //import d'un hook React depuis un module, React c est une bibliotheque, pour créer un état local dans le composant
import {
  View, //equivalent <div>
  Text,
  TouchableOpacity, //bouton cliquable
  StatusBar, //permet de styliser la barre d etat du tel
  Alert, //ouvre une pop up native
  ActivityIndicator, //spinner de chargement
  ScrollView, //conteneur defilable verticalement
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; //évite que ton contenu passe sous certaines choses du tel
import { Ionicons, FontAwesome } from "@expo/vector-icons"; //icones Expo + autre pack d'icones
import { useSelector, useDispatch } from "react-redux"; //hooks pour communiquer avec Redux, lire les donnees Redux et envoyer une action Redux
import * as ImagePicker from "expo-image-picker"; //ce module permet de demander l'autorisation d'acces a la galerie, ouvrir la galeire et selectionner une image

import styles from "../styles/DriverDocumentsStyles"; //On importe l’objet styles depuis un fichier séparé
           //Ensuite on l’utilise comme : style={styles.title}, pour separer le style de la logique 
import { updateDriverProfile } from "../redux/reducers/user"; //importe une action Redux appelée updateDriverProfile, pour mettre a jour le profil conducteur dans le store apres la sauvegarde

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL; //permet ensuite de faire par ex : fetch(`${EXPO_PUBLIC_API_URL}/users/uploadDriverDocument`)

export default function DriverDocumentsScreen({ navigation }) { //exporte le composant par défaut function driverDocumentsScreen
                                             //{ navigation } : on récupère la prop navigation
  const dispatch = useDispatch(); //envoyer des actions Redux
  const user = useSelector((state) => state.user.value); //lit le store Redux 
                           //(state) => state.user.value est une fonction fléchée qui prends le store global, va dans state.user puis prends value 

  const [driverLicenseUrl, setDriverLicenseUrl] = useState( //crée un state local pour stocker l’URL du permis
    user?.driverProfile?.driverLicenseUrl || null //Valeur initiale
        //?. = optional chaining donc si user existe, et si driverProfile existe alors prends driverLicenseUrl
  );
  const [identityDocumentUrl, setIdentityDocumentUrl] = useState( //state local pour la piece d'identite
    user?.driverProfile?.identityDocumentUrl || null //|| null Si la valeur de gauche est falsy (undefined, null, "", etc.), alors on prend null.
  );
  const [insuranceDocumentUrl, setInsuranceDocumentUrl] = useState( //state local pour l'assurance
    user?.driverProfile?.insuranceDocumentUrl || null 
  );

  const [uploadingType, setUploadingType] = useState(null); //state qui sert à savoir quel document est en cours d’upload
                                                   //Ça permet d’afficher le spinner seulement sur la bonne ligne
  const [saving, setSaving] = useState(false); //state qui sert à savoir si l’écran est en train de sauvegarder les documents sur le backend

  const hasAtLeastOneDocument = Boolean(  //si l’une des trois URLs existe, l’expression est vraie
  driverLicenseUrl || identityDocumentUrl || insuranceDocumentUrl //Ça sert à activer/désactiver le bouton “Enregistrer”.
);

  const pickAndUploadDocument = async (documentType) => { //(documentType) : argument qui dit quel document on traite
    try {
      const permission = //demande l’accès à la galerie photo
        await ImagePicker.requestMediaLibraryPermissionsAsync(); //demander a la bibliotheque media permission de facon asynchrone

      if (!permission.granted) { //negative
        Alert.alert(
          "Permission refusée",
          "Tu dois autoriser l'accès aux photos."
        );
        return; //arrete immediatement la fonction
      }

      const result = await ImagePicker.launchImageLibraryAsync({ //ouvre la galerie avec options. launchImageLibraryAsync( = galerie de l'appareil
        mediaTypes: ["images"], //autorise seulement les images
        allowsEditing: true, //l'utilisateur peut recadrer/modifier avant validation
        quality: 0.8, //compression de qualite 80%
      });

      if (result.canceled) return; //si l'utilisateur annule on quitte la fonction et rien ne se passe

      const selectedImage = result.assets[0]; //result.assets contient les fichiers sélectionnés
                                //[0] prend le premier élément du tableau

      if (!EXPO_PUBLIC_API_URL) { //Vérification de l’URL API
        Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant."); //Avant d’envoyer le fichier au serveur, on vérifie que l’URL du backend existe.
        return;
      }

      setUploadingType(documentType); //stocke le type de document actuellement en cours d’envoi

      const formData = new FormData(); //FormData permet d’envoyer des données de type formulaire, y compris des fichiers
      formData.append("token", user.token); //Ajoute une donnée au formulaire avec cle : token et valeur : user.token
      formData.append("documentType", documentType);//quel document envoye
      formData.append("document", { //ajoute le fichier image
        uri: selectedImage.uri, // uri = chemin local du fichier sur le tel
        name: `${documentType}-${Date.now()}.jpg`, //`${ pour voir directement le mot dans la phrase Parce que c’est plus lisible que le +
                               //valeur de documentType et timestamp actuel en millisecondes
        type: "image/jpeg", //Type MIME du fichier
      });

      const response = await fetch( //envoie au back
        `${EXPO_PUBLIC_API_URL}/users/uploadDriverDocument`,  //ex : https://buzzblablabla/users/uploadDriverDocument
        {
          method: "POST", //on envoie une nouvelle ressource / un fichier
          body: formData, //formulaire avec le fichier
        }
      );

      const data = await response.json(); //j'aurai pu ecrire const result pas data mais on l utilise souvent
                //c est ce que renvoie le back

      if (!data.result) { //propriétés de l’objet
        Alert.alert("Erreur", data.error || "Impossible d'envoyer le document.");
        return;
      }

      if (documentType === "driverLicense") { //si le document envoyé est un permis de conduire, alors on met à jour l’URL du permis avec l’URL renvoyée par le serveur.
        setDriverLicenseUrl(data.url); //propriétés de l’objet
      }

      if (documentType === "identityDocument") {
        setIdentityDocumentUrl(data.url);
      }

      if (documentType === "insuranceDocument") {
        setInsuranceDocumentUrl(data.url);
      }

      Alert.alert("Succès", "Document ajouté.");
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setUploadingType(null);
    }
  };

  const handleSaveDocuments = async () => { //Fonction asynchrone appelée quand l’utilisateur appuie sur “Enregistrer”
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant.");
      return; //on refuse de continuer si l’URL API manque
    }

    try {
      setSaving(true);  //On active l’état de sauvegarde : le bouton peut afficher “Enregistrement...”

      const response = await fetch( //Ici on envoie les données finales du profil conducteur au backend
        `${EXPO_PUBLIC_API_URL}/users/updateDriverProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ //transforme l’objet JS en chaîne JSON.
            //obejt envoye :
            token: user.token,
            brand: user?.car?.brand || "",
            model: user?.car?.model || "",
            color: user?.car?.color || "",
            nbSeats: user?.car?.nbSeats || 0,
            licencePlate: user?.car?.licencePlate || "",
            driverLicenseUrl,
            identityDocumentUrl,
            insuranceDocumentUrl,
          }),
        }
      );

      const data = await response.json(); //convertit la rep en Json

      if (!data.result) {
        Alert.alert(
          "Erreur",
          data.error || "Impossible d'enregistrer les documents."
        );
        return;
      }

      dispatch( //met à jour le store Redux avec les nouvelles données renvoyées par le backend
        updateDriverProfile({ //Action Redux importée plus haut
          car: data.car,
          driverProfile: data.driverProfile,
        })
      );

      Alert.alert("Succès", "Documents enregistrés.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
     
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setSaving(false);
    }
  };

  const renderRow = (title, value, type) => { //Cette fonction sert à éviter de répéter trois fois le même bloc JSX.
         //donc fonction réutilisable : tu fais const renderRow = (title, value, type) => { ... } et tu l appelles avec des valeurs differentes 
    const isUploading = uploadingType === type; //vérifie si cette ligne correspond au document en cours d’upload
          //si uploadingType vaut "driverLicense" et type vaut la meme chose alors isUploading = true
    
      const isDone = Boolean(value); //Si value contient une URL alors isDone = true
                      //ca permet de voir si le doc existe deja

    return (
      <View style={styles.rowCard}>
        <View style={styles.rowLeft}>
          <FontAwesome
            name={isDone ? "check-circle" : "exclamation-circle"}
            size={18}
            color={isDone ? "#2E7D32" : "#800020"}
            style={styles.rowIcon}
          />
          <Text style={styles.rowTitle}>{title}</Text>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, isDone && styles.actionButtonDone]}
          activeOpacity={0.8}
          onPress={() => pickAndUploadDocument(type)}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.actionButtonText}>
              {isDone ? "Remplacer" : "Ajouter"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.title}>Mes documents</Text>

        <Text style={styles.subtitle}>
          Ajoute les documents nécessaires à la validation de ton profil
          conducteur.
        </Text>

        {renderRow("Permis de conduire", driverLicenseUrl, "driverLicense")}
        {renderRow("Pièce d’identité", identityDocumentUrl, "identityDocument")}
        {renderRow("Assurance", insuranceDocumentUrl, "insuranceDocument")}

        <Text style={styles.helperText}>
          Tu peux enregistrer tes documents progressivement. Pour publier un
          trajet, tous les documents doivent être fournis.
        </Text>

        <TouchableOpacity
  style={[
    styles.saveButton,
    (!hasAtLeastOneDocument || saving) && styles.saveButtonDisabled,
  ]}
  onPress={handleSaveDocuments}
  activeOpacity={0.8}
  disabled={saving || !hasAtLeastOneDocument}
>
  <Text style={styles.saveButtonText}>
    {saving ? "Enregistrement..." : "Enregistrer"}
  </Text>
</TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}