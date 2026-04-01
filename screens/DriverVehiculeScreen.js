import { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/DriverVehiculeStyles";
import { updateDriverProfile } from "../redux/reducers/user";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const CAR_DATA = {
  Renault: ["Clio", "Captur", "Mégane", "Scénic", "Austral", "Twingo"],
  Peugeot: ["108", "208", "2008", "308", "3008", "5008"],
  Citroen: ["C1", "C3", "C4", "C5 Aircross"],
  Volkswagen: ["Polo", "Golf", "T-Roc", "Tiguan", "Passat"],
  BMW: ["Série 1", "Série 3", "X1", "X3", "X5"],
  Mercedes: ["Classe A", "Classe C", "GLA", "GLC"],
  Audi: ["A1", "A3", "A4", "Q2", "Q3", "Q5"],
  Toyota: ["Yaris", "Corolla", "C-HR", "RAV4"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail"],
  Ford: ["Fiesta", "Focus", "Puma", "Kuga"],
  Opel: ["Corsa", "Astra", "Mokka", "Grandland"],
  Fiat: ["500", "Panda", "Tipo", "500X"],
  Hyundai: ["i10", "i20", "i30", "Tucson"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage"],
  Seat: ["Ibiza", "Leon", "Arona", "Ateca"],
};

const CAR_COLORS = [
  "Noir",
  "Blanc",
  "Gris",
  "Gris foncé",
  "Bleu",
  "Rouge",
  "Vert",
  "Jaune",
  "Beige",
  "Marron",
  "Orange",
  "Violet",
];

const FRENCH_PLATE_REGEX = /^[A-Z]{2}-?[0-9]{3}-?[A-Z]{2}$/;

function normalizePlate(value) {
  return value
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[^A-Z0-9-]/g, "");
}

function formatPlate(value) {
  const cleaned = value
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 7);

  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  }
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
}

function isValidFrenchPlate(value) {
  return FRENCH_PLATE_REGEX.test(normalizePlate(value));
}

function CustomDropdown({
  label,
  value,
  placeholder,
  onPress,
  disabled = false,
}) {
  return (
    <View style={styles.dropdownBlock}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        style={[styles.dropdownButton, disabled && styles.dropdownButtonDisabled]}
        activeOpacity={disabled ? 1 : 0.8}
        onPress={disabled ? undefined : onPress}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !value && styles.dropdownPlaceholder,
            disabled && styles.dropdownDisabledText,
          ]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={20}
          color={disabled ? "#B0B0B0" : "#666666"}
        />
      </TouchableOpacity>
    </View>
  );
}

function SelectionModal({
  visible,
  title,
  data,
  onClose,
  onSelect,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalTitle}>{title}</Text>

          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                activeOpacity={0.8}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.modalCloseButton}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Text style={styles.modalCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function DriverVehiculeScreen({ navigation }) {
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

  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const availableModels = useMemo(() => {
    if (!brand) return [];
    return CAR_DATA[brand] || [];
  }, [brand]);

  const handlePlateChange = (value) => {
    setLicencePlate(formatPlate(value));
  };

  const validateForm = () => {
    if (!brand) return "Veuillez sélectionner une marque.";
    if (!model) return "Veuillez sélectionner un modèle.";
    if (!color) return "Veuillez sélectionner une couleur.";
    if (!nbSeats.trim()) return "Veuillez renseigner le nombre de places.";
    if (!licencePlate.trim()) {
      return "La plaque d'immatriculation est obligatoire.";
    }

    const seatsNumber = Number(nbSeats);

    if (!Number.isInteger(seatsNumber) || seatsNumber < 1 || seatsNumber > 9) {
      return "Le nombre de places doit être compris entre 1 et 9.";
    }

    if (!isValidFrenchPlate(licencePlate)) {
      return "Veuillez entrer une plaque valide au format AB-123-CD.";
    }

    return null;
  };

  const saveVehicle = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "API URL manquante");
      return;
    }

    if (!user?.token) {
      Alert.alert("Erreur", "Utilisateur non identifié");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      Alert.alert("Erreur", validationError);
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
            nbSeats: Number(nbSeats),
            licencePlate: formatPlate(licencePlate),
            driverLicenseUrl: user?.driverProfile?.driverLicenseUrl || null,
            identityDocumentUrl:
              user?.driverProfile?.identityDocumentUrl || null,
            insuranceDocumentUrl:
              user?.driverProfile?.insuranceDocumentUrl || null,
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
          <Ionicons name="arrow-back" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.title}>Mon véhicule</Text>

        <View style={styles.card}>
          <CustomDropdown
            label="Marque"
            value={brand}
            placeholder="Sélectionner une marque"
            onPress={() => setBrandModalVisible(true)}
          />

          <CustomDropdown
            label="Modèle"
            value={model}
            placeholder={
              brand
                ? "Sélectionner un modèle"
                : "Choisissez d'abord une marque"
            }
            onPress={() => setModelModalVisible(true)}
            disabled={!brand}
          />

          <CustomDropdown
            label="Couleur"
            value={color}
            placeholder="Sélectionner une couleur"
            onPress={() => setColorModalVisible(true)}
          />

          <Text style={styles.inputLabel}>Nombre de places</Text>
          <TextInput
            placeholder="Ex : 4"
            value={nbSeats}
            onChangeText={setNbSeats}
            keyboardType="numeric"
            style={styles.input}
            maxLength={1}
          />

          <Text style={styles.inputLabel}>Plaque d'immatriculation</Text>
          <TextInput
            placeholder="AB-123-CD"
            value={licencePlate}
            onChangeText={handlePlateChange}
            autoCapitalize="characters"
            style={styles.input}
            maxLength={9}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveVehicle}>
          <Text style={styles.saveText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>

      <SelectionModal
        visible={brandModalVisible}
        title="Choisir une marque"
        data={Object.keys(CAR_DATA)}
        onClose={() => setBrandModalVisible(false)}
        onSelect={(selectedBrand) => {
          setBrand(selectedBrand);
          setModel("");
        }}
      />

      <SelectionModal
        visible={modelModalVisible}
        title="Choisir un modèle"
        data={availableModels}
        onClose={() => setModelModalVisible(false)}
        onSelect={(selectedModel) => setModel(selectedModel)}
      />

      <SelectionModal
        visible={colorModalVisible}
        title="Choisir une couleur"
        data={CAR_COLORS}
        onClose={() => setColorModalVisible(false)}
        onSelect={(selectedColor) => setColor(selectedColor)}
      />
    </SafeAreaView>
  );
}