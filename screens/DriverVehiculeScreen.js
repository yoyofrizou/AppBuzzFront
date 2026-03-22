import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/DriverVehiculeStyles";
import { updateDriverProfile } from "../redux/reducers/user";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVehiuleScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.value);

  const [brand, setBrand] = useState(user?.car?.brand || "");
  const [model, setModel] = useState(user?.car?.model || "");
  const [color, setColor] = useState(user?.car?.color || "");
  const [nbSeats, setNbSeats] = useState(
    user?.car?.nbSeats ? String(user.car.nbSeats) : ""
  );
  const [licencePlate, setLicencePlate] = useState(
    user?.car?.licencePlate || ""
  );

  const saveVehicle = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "API URL manquante");
      return;
    }

    if (!user?.token) {
      Alert.alert("Erreur", "Utilisateur non identifié");
      return;
    }

    if (!brand || !model || !color || !nbSeats || !licencePlate) {
      Alert.alert("Erreur", "Merci de remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/users/updateDriverProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
            brand,
            model,
            color,
            nbSeats: Number(nbSeats) || 0,
            licencePlate,
            driverLicenseUrl: user?.driverProfile?.driverLicenseUrl || null,
            identityDocumentUrl: user?.driverProfile?.identityDocumentUrl || null,
            insuranceDocumentUrl: user?.driverProfile?.insuranceDocumentUrl || null,
          }),
        }
      );

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible d'enregistrer");
        return;
      }

      dispatch(
        updateDriverProfile({
          car: data.car,
          driverProfile: data.driverProfile,
        })
      );

      Alert.alert("Succès", "Informations du véhicule enregistrées");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>Mon véhicule</Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Marque"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />

          <TextInput
            placeholder="Modèle"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />

          <TextInput
            placeholder="Couleur"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />

          <TextInput
            placeholder="Nombre de places"
            value={nbSeats}
            onChangeText={setNbSeats}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Plaque d'immatriculation"
            value={licencePlate}
            onChangeText={setLicencePlate}
            autoCapitalize="characters"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveVehicle}>
          <Text style={styles.saveText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/*import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/DriverVehiculeStyles";
import { updateDriverProfile } from "../redux/reducers/user";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverVehicleScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.value);

  const [brand, setBrand] = useState(user?.car?.brand || "");
  const [model, setModel] = useState(user?.car?.model || "");
  const [color, setColor] = useState(user?.car?.color || "");
  const [nbSeats, setNbSeats] = useState(
    user?.car?.nbSeats ? String(user.car.nbSeats) : ""
  );
  const [licencePlate, setLicencePlate] = useState(
    user?.car?.licencePlate || ""
  );

  const saveVehicle = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "API URL manquante");
      return;
    }

    try {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/users/updateDriverProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: user.token,
          brand,
          model,
          color,
          nbSeats: Number(nbSeats) || 0,
          licencePlate,
          driverLicenseUrl: user?.driverProfile?.driverLicenseUrl || null,
          identityDocumentUrl: user?.driverProfile?.identityDocumentUrl || null,
          insuranceDocumentUrl: user?.driverProfile?.insuranceDocumentUrl || null,
        }),
      });

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible d'enregistrer");
        return;
      }

      dispatch(
        updateDriverProfile({
          car: data.car,
          driverProfile: data.driverProfile,
        })
      );

      Alert.alert("Succès", "Informations du véhicule enregistrées");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Erreur serveur");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>

        <Text style={styles.title}>Mon véhicule</Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Marque"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
          />

          <TextInput
            placeholder="Modèle"
            value={model}
            onChangeText={setModel}
            style={styles.input}
          />

          <TextInput
            placeholder="Couleur"
            value={color}
            onChangeText={setColor}
            style={styles.input}
          />

          <TextInput
            placeholder="Nombre de places"
            value={nbSeats}
            onChangeText={setNbSeats}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Plaque d'immatriculation"
            value={licencePlate}
            onChangeText={setLicencePlate}
            autoCapitalize="characters"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveVehicle}>
          <Text style={styles.saveText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}*/