import { Fragment, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout } from "../redux/reducers/user";
import { resetRidesState } from "../redux/reducers/rides";

import styles from "../styles/MainMenuStyles";
import { colors } from "../styles/theme";
import BackButton from "../components/BackButton";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MainMenuScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const mode = route?.params?.mode === "driver" ? "driver" : "passenger";

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const menuItems = [
    {
      key: "profile",
      label: "Profil",
      icon: "person-outline",
      onPress: () =>
        navigation.navigate(mode === "driver" ? "DriverProfile" : "Profile"),
    },
    {
      key: "trips",
      label: "Trajets",
      iconSet: "material",
      icon: "road-variant",
      onPress: () =>
        navigation.navigate(mode === "driver" ? "DriverTrips" : "PassengerTrips"),
    },
    {
      key: "messages",
      label: "Messagerie",
      icon: "chatbubble-ellipses-outline",
      onPress: () => navigation.navigate("Messages"),
    },
    {
      key: "evaluations",
      label: "Évaluations",
      icon: "star-outline",
      onPress: () =>
        navigation.navigate(
          mode === "driver" ? "DriverEvaluations" : "PassengerEvaluations"
        ),
    },
    {
      key: "payments",
      label: "Paiements",
      icon: "card-outline",
      onPress: () =>
        navigation.navigate(
          mode === "driver" ? "DriverPayouts" : "PassengerPayments"
        ),
    },
    {
      key: "help",
      label: "Aide",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("Help"),
    },
  ];

  const handleLogout = () => setLogoutModalVisible(true);
  const handleDeleteAccount = () => setDeleteModalVisible(true);

  const confirmLogout = async () => {
    try {
      setLogoutModalVisible(false);

      await AsyncStorage.removeItem("user");
      dispatch(resetRidesState());
      dispatch(logout());
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se déconnecter correctement.");
    }
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
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible de supprimer le compte.");
        return;
      }

      await AsyncStorage.removeItem("user");
      dispatch(resetRidesState());
      dispatch(logout());
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur ou problème réseau.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <BackButton color={colors.textPrimary} />
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <Fragment key={item.key}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.menuIconBadge}>
                  {item.iconSet === "material" ? (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={18}
                      color={colors.textPrimary}
                    />
                  ) : (
                    <Ionicons name={item.icon} size={18} color={colors.textPrimary} />
                  )}
                </View>
                <Text style={styles.buttonText}>{item.label}</Text>
                <FontAwesome name="angle-right" size={18} color={colors.textSecondary} />
              </TouchableOpacity>

              {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
            </Fragment>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Compte</Text>

        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleLogout}>
            <View style={styles.menuIconBadge}>
              <Ionicons name="log-out-outline" size={18} color={colors.textPrimary} />
            </View>
            <Text style={styles.buttonText}>Se déconnecter</Text>
            <FontAwesome name="angle-right" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleDeleteAccount}>
            <View style={[styles.menuIconBadge, styles.menuIconBadgeDanger]}>
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
            </View>
            <Text style={[styles.buttonText, styles.buttonTextDanger]}>Supprimer le compte</Text>
            <FontAwesome name="angle-right" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={logoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Souhaites-tu te déconnecter ?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>Non</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
                <Text style={styles.modalButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Confirmer la suppression du compte ?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Non</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={confirmDeleteAccount}>
                <Text style={styles.modalButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
