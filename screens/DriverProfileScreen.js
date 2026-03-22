import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { logout, updateProfilePhoto } from "../redux/reducers/user";

import styles from "../styles/DriverProfileStyles";
import BackButton from "../components/BackButton";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

const [profileImage, setProfileImage] = useState(user?.profilePhoto || null);

useEffect(() => {
  if (user?.profilePhoto) {
    setProfileImage(user.profilePhoto);
  }
}, [user?.profilePhoto]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

   const hasCarInfo = Boolean(
    user?.car?.brand &&
      user?.car?.model &&
      user?.car?.color &&
      user?.car?.nbSeats &&
      user?.car?.licencePlate
  );

  const hasDriverDocuments = Boolean(
    user?.driverProfile?.driverLicenseUrl &&
      user?.driverProfile?.identityDocumentUrl &&
      user?.driverProfile?.insuranceDocumentUrl
  );

  useEffect(() => {
    if (user.profilePhoto) {
      setProfileImage(user.profilePhoto);
    }
  }, [user.profilePhoto]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission refusée", "Tu dois autoriser l'accès aux photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant dans le fichier .env.");
      return;
    }

    const selectedImage = result.assets[0];

    try {
      setLoadingPhoto(true);

      const formData = new FormData();
      formData.append("token", user.token);
      formData.append("profilePhoto", {
        uri: selectedImage.uri,
        name: `profile-${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/updateProfilePhoto`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible de mettre à jour la photo.");
        return;
      }

      const newPhoto = data.profilePhoto || selectedImage.uri;

      setProfileImage(newPhoto);
      dispatch(updateProfilePhoto(newPhoto));

      Alert.alert("Succès", "Photo de profil mise à jour.");
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    dispatch(logout());
    navigation.replace("Auth", { screen: "Home" });
  };

  const confirmDeleteAccount = async () => {
    setDeleteModalVisible(false);

    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant dans le fichier .env.");
      return;
    }

    try {
      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/delete/${user.token}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible de supprimer le compte.");
        return;
      }

      dispatch(logout());

      Alert.alert("Succès", "Compte supprimé avec succès.", [
        {
          text: "OK",
          onPress: () => navigation.replace("Auth", { screen: "Home" }),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <Text style={styles.headerTitle}>Mon compte Buzz</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}

          <View style={styles.plusBadge}>
            <Text style={styles.plusText}>{loadingPhoto ? "..." : "+"}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>
          {user?.prenom} {user?.nom}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DriverInformations")}
        >
          <Text style={styles.buttonText}>Mes informations</Text>
          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DriverVehicule")}
        >
          <View style={styles.buttonLeft}>
            <Text style={styles.buttonText}>Ma voiture</Text>

            {!hasCarInfo && (
              <FontAwesome
                name="exclamation-circle"
                size={16}
                color="#800020"
                style={styles.warningIcon}
              />
            )}
          </View>

          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>

        {/* DOCUMENTS */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DriverDocuments")}
        >
          <View style={styles.buttonLeft}>
            <Text style={styles.buttonText}>Mes documents</Text>

            {!hasDriverDocuments && (
              <FontAwesome
                name="exclamation-circle"
                size={16}
                color="#800020"
                style={styles.warningIcon}
              />
            )}
          </View>

          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DriverEvaluations")}
        >
          <Text style={styles.buttonText}>Mes évaluations</Text>
          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DriverPayouts")}
        >
          <Text style={styles.buttonText}>Mes versements</Text>
          <FontAwesome name="angle-right" size={20} color="#000" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>Supprimer le compte</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Confirmer la suppression du compte ?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Non</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmDeleteAccount}
              >
                <Text style={styles.modalButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Souhaites tu te déconnecter ?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Non</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmLogout}
              >
                <Text style={styles.modalButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}