import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import styles from "../styles/DriverDocumentsStyles";
import { updateDriverProfile } from "../redux/reducers/user";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverDocumentsScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [driverLicenseUrl, setDriverLicenseUrl] = useState(
    user?.driverProfile?.driverLicenseUrl || null
  );
  const [identityDocumentUrl, setIdentityDocumentUrl] = useState(
    user?.driverProfile?.identityDocumentUrl || null
  );
  const [insuranceDocumentUrl, setInsuranceDocumentUrl] = useState(
    user?.driverProfile?.insuranceDocumentUrl || null
  );

  const [uploadingType, setUploadingType] = useState(null);
  const [saving, setSaving] = useState(false);

  const hasAtLeastOneDocument = Boolean(
  driverLicenseUrl || identityDocumentUrl || insuranceDocumentUrl
);

  const pickAndUploadDocument = async (documentType) => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission refusée",
          "Tu dois autoriser l'accès aux photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) return;

      const selectedImage = result.assets[0];

      if (!EXPO_PUBLIC_API_URL) {
        Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant.");
        return;
      }

      setUploadingType(documentType);

      const formData = new FormData();
      formData.append("token", user.token);
      formData.append("documentType", documentType);
      formData.append("document", {
        uri: selectedImage.uri,
        name: `${documentType}-${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/uploadDriverDocument`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible d'envoyer le document.");
        return;
      }

      if (documentType === "driverLicense") {
        setDriverLicenseUrl(data.url);
      }

      if (documentType === "identityDocument") {
        setIdentityDocumentUrl(data.url);
      }

      if (documentType === "insuranceDocument") {
        setInsuranceDocumentUrl(data.url);
      }

      Alert.alert("Succès", "Document ajouté.");
    } catch (error) {
      console.log("Erreur upload document :", error);
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setUploadingType(null);
    }
  };

  const handleSaveDocuments = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/updateDriverProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

      const data = await response.json();

      if (!data.result) {
        Alert.alert(
          "Erreur",
          data.error || "Impossible d'enregistrer les documents."
        );
        return;
      }

      dispatch(
        updateDriverProfile({
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
      console.log("Erreur sauvegarde documents :", error);
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setSaving(false);
    }
  };

  const renderRow = (title, value, type) => {
    const isUploading = uploadingType === type;
    const isDone = Boolean(value);

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
        {renderRow(
          "Pièce d’identité",
          identityDocumentUrl,
          "identityDocument"
        )}
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