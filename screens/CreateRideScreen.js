import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Keyboard,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../styles/CreateRideStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

function formatDate(date) {
  return date.toLocaleDateString("fr-FR");
}

function formatTime(date) {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTimeLabel(date) {
  return `${formatDate(date)} à ${formatTime(date)}`;
}

function mapboxFeatureToSuggestion(feature) {
  const props = feature?.properties || {};
  const coords = props?.coordinates || {};
  const fallbackGeometry = feature?.geometry?.coordinates || [];

  const longitude =
    typeof coords.longitude === "number" ? coords.longitude : fallbackGeometry[0];

  const latitude =
    typeof coords.latitude === "number" ? coords.latitude : fallbackGeometry[1];

  const label =
    props.full_address ||
    [props.name_preferred || props.name, props.place_formatted]
      .filter(Boolean)
      .join(", ");

  return {
    id: feature.id || props.mapbox_id || String(Math.random()),
    label,
    latitude,
    longitude,
  };
}

export default function CreateRideScreen({ navigation }) {
  const user = useSelector((state) => state.user?.value);
  const token = user?.token;

  const [departureQuery, setDepartureQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] = useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] = useState(false);

  const [departureDateTime, setDepartureDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempPickerDate, setTempPickerDate] = useState(new Date());

  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("1");

  const [loadingCreate, setLoadingCreate] = useState(false);

  const departureRequestIdRef = useRef(0);
  const destinationRequestIdRef = useRef(0);

  const fetchMapboxSuggestions = async ({
    query,
    setSuggestions,
    setLoading,
    requestIdRef,
    currentRequestId,
  }) => {
    if (!EXPO_PUBLIC_MAPBOX_TOKEN) {
      setSuggestions([]);
      return;
    }

    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);

      const url =
        `https://api.mapbox.com/search/geocode/v6/forward` +
        `?q=${encodeURIComponent(query.trim())}` +
        `&access_token=${encodeURIComponent(EXPO_PUBLIC_MAPBOX_TOKEN)}` +
        `&autocomplete=true` +
        `&limit=5` +
        `&language=fr` +
        `&country=FR` +
        `&types=address,street,place,locality,neighborhood`;

      const response = await fetch(url);
      const data = await response.json();

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const mapped = (data?.features || [])
        .map(mapboxFeatureToSuggestion)
        .filter(
          (item) =>
            item &&
            item.label &&
            typeof item.latitude === "number" &&
            typeof item.longitude === "number"
        );

      setSuggestions(mapped);
    } catch (error) {
      setSuggestions([]);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!showDepartureSuggestions) return;

    const timer = setTimeout(() => {
      departureRequestIdRef.current += 1;
      const requestId = departureRequestIdRef.current;

      fetchMapboxSuggestions({
        query: departureQuery,
        setSuggestions: setDepartureSuggestions,
        setLoading: setLoadingDepartureSuggestions,
        requestIdRef: departureRequestIdRef,
        currentRequestId: requestId,
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [departureQuery, showDepartureSuggestions]);

  useEffect(() => {
    if (!showDestinationSuggestions) return;

    const timer = setTimeout(() => {
      destinationRequestIdRef.current += 1;
      const requestId = destinationRequestIdRef.current;

      fetchMapboxSuggestions({
        query: destinationQuery,
        setSuggestions: setDestinationSuggestions,
        setLoading: setLoadingDestinationSuggestions,
        requestIdRef: destinationRequestIdRef,
        currentRequestId: requestId,
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [destinationQuery, showDestinationSuggestions]);

  const selectDeparture = (item) => {
    setSelectedDeparture(item);
    setDepartureQuery(item.label);
    setDepartureSuggestions([]);
    setShowDepartureSuggestions(false);
  };

  const selectDestination = (item) => {
    setSelectedDestination(item);
    setDestinationQuery(item.label);
    setDestinationSuggestions([]);
    setShowDestinationSuggestions(false);
  };

  const handleDateChange = (_, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);

      if (!selectedDate) return;

      const updated = new Date(departureDateTime);
      updated.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setDepartureDateTime(updated);
      return;
    }

    if (selectedDate) {
      setTempPickerDate(selectedDate);
    }
  };

  const handleTimeChange = (_, selectedTime) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);

      if (!selectedTime) return;

      const updated = new Date(departureDateTime);
      updated.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
      setDepartureDateTime(updated);
      return;
    }

    if (selectedTime) {
      setTempPickerDate(selectedTime);
    }
  };

  const openDateModal = () => {
    setTempPickerDate(new Date(departureDateTime));
    setShowDatePicker(true);
  };

  const openTimeModal = () => {
    setTempPickerDate(new Date(departureDateTime));
    setShowTimePicker(true);
  };

  const confirmDateSelection = () => {
    const updated = new Date(departureDateTime);
    updated.setFullYear(
      tempPickerDate.getFullYear(),
      tempPickerDate.getMonth(),
      tempPickerDate.getDate()
    );
    setDepartureDateTime(updated);
    setShowDatePicker(false);
  };

  const confirmTimeSelection = () => {
    const updated = new Date(departureDateTime);
    updated.setHours(
      tempPickerDate.getHours(),
      tempPickerDate.getMinutes(),
      0,
      0
    );
    setDepartureDateTime(updated);
    setShowTimePicker(false);
  };

  const closeSuggestions = () => {
    setShowDepartureSuggestions(false);
    setShowDestinationSuggestions(false);
    Keyboard.dismiss();
  };

  const handleCreateRide = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant dans le fichier .env.");
      return;
    }

    if (!EXPO_PUBLIC_MAPBOX_TOKEN) {
      Alert.alert("Erreur", "EXPO_PUBLIC_MAPBOX_TOKEN est manquant dans le fichier .env.");
      return;
    }

    if (!token) {
      Alert.alert("Erreur", "Utilisateur non identifié.");
      return;
    }

    if (
      !departureQuery.trim() ||
      !destinationQuery.trim() ||
      !selectedDeparture ||
      !selectedDestination
    ) {
      Alert.alert(
        "Erreur",
        "Merci de remplir le départ, l’arrivée et de sélectionner les adresses proposées."
      );
      return;
    }

    if (!price.trim()) {
      Alert.alert("Erreur", "Merci d’indiquer un prix.");
      return;
    }

    const seatsNumber = Number(availableSeats);
    const priceNumber = Number(price);

    if (Number.isNaN(seatsNumber) || seatsNumber <= 0) {
      Alert.alert("Erreur", "Le nombre de places doit être supérieur à 0.");
      return;
    }

    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      Alert.alert("Erreur", "Le prix est invalide.");
      return;
    }

    try {
      setLoadingCreate(true);
      closeSuggestions();

      const payload = {
        token,
        departureAddress: departureQuery.trim(),
        destinationAddress: destinationQuery.trim(),
        departureLatitude: selectedDeparture.latitude,
        departureLongitude: selectedDeparture.longitude,
        destinationLatitude: selectedDestination.latitude,
        destinationLongitude: selectedDestination.longitude,
        departureDateTime: departureDateTime.toISOString(),
        pickupWalkMinutes: 0,
        dropoffWalkMinutes: 0,
        price: priceNumber,
        availableSeats: seatsNumber,
      };

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/rides/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.result) {
        Alert.alert(
          "Erreur",
          data?.error || data?.message || "Impossible de créer le trajet."
        );
        return;
      }

      Alert.alert("Succès", "Votre trajet a bien été créé.", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("DriverTabs", {
              screen: "DriverTrips",
              params: { initialTab: "upcoming" },
            }),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer le trajet.");
    } finally {
      setLoadingCreate(false);
    }
  };

  const renderSuggestionItem = (item, onSelect) => (
    <Pressable
      key={item.id}
      style={styles.suggestionItem}
      onPress={() => onSelect(item)}
    >
      <Ionicons name="location-outline" size={18} color="#8B2332" />
      <Text style={styles.suggestionText} numberOfLines={2}>
        {item.label || ""}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={closeSuggestions}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={28} color="#8B2332" />
              </TouchableOpacity>

              <Text style={styles.logo}>BUZZ</Text>

              <View style={styles.headerRightSpacer} />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Créer un trajet</Text>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Adresse de départ</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="location" size={24} color="#8B2332" />
                  <TextInput
                    value={departureQuery}
                    onChangeText={(text) => {
                      setDepartureQuery(text);
                      setSelectedDeparture(null);
                      setShowDepartureSuggestions(true);
                    }}
                    onFocus={() => setShowDepartureSuggestions(true)}
                    placeholder="Adresse de départ"
                    placeholderTextColor="#8C8C8C"
                    style={styles.input}
                  />
                </View>

                {loadingDepartureSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                ) : null}

                {showDepartureSuggestions && departureSuggestions.length > 0 ? (
                  <View style={styles.suggestionsBox}>
                    {departureSuggestions.map((item) =>
                      renderSuggestionItem(item, selectDeparture)
                    )}
                  </View>
                ) : null}
              </View>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Adresse d’arrivée</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="location" size={24} color="#8B2332" />
                  <TextInput
                    value={destinationQuery}
                    onChangeText={(text) => {
                      setDestinationQuery(text);
                      setSelectedDestination(null);
                      setShowDestinationSuggestions(true);
                    }}
                    onFocus={() => setShowDestinationSuggestions(true)}
                    placeholder="Adresse d'arrivée"
                    placeholderTextColor="#8C8C8C"
                    style={styles.input}
                  />
                </View>

                {loadingDestinationSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                ) : null}

                {showDestinationSuggestions &&
                destinationSuggestions.length > 0 ? (
                  <View style={styles.suggestionsBox}>
                    {destinationSuggestions.map((item) =>
                      renderSuggestionItem(item, selectDestination)
                    )}
                  </View>
                ) : null}
              </View>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Date et heure de départ</Text>

                <View style={styles.dateTimeCard}>
                  <TouchableOpacity
                    style={styles.dateTimeMainButton}
                    activeOpacity={0.8}
                    onPress={openDateModal}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color="#8B2332"
                    />
                    <View style={styles.dateTimeContent}>
                      <Text style={styles.dateTimeMainLabel}>Départ prévu</Text>
                      <Text style={styles.dateTimeMainValue}>
                        {formatDateTimeLabel(departureDateTime)}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#8C8C8C"
                    />
                  </TouchableOpacity>

                  <View style={styles.dateTimeQuickActions}>
                    <TouchableOpacity
                      style={styles.dateChip}
                      activeOpacity={0.8}
                      onPress={openDateModal}
                    >
                      <Ionicons
                        name="calendar-clear-outline"
                        size={18}
                        color="#8B2332"
                      />
                      <Text style={styles.dateChipText}>
                        {formatDate(departureDateTime)}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dateChip}
                      activeOpacity={0.8}
                      onPress={openTimeModal}
                    >
                      <Ionicons
                        name="time-outline"
                        size={18}
                        color="#8B2332"
                      />
                      <Text style={styles.dateChipText}>
                        {formatTime(departureDateTime)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.twoColumnsRow}>
                <View style={[styles.fieldBlock, styles.halfField]}>
                  <Text style={styles.label}>Prix (€)</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="cash-outline" size={22} color="#8B2332" />
                    <TextInput
                      value={price}
                      onChangeText={setPrice}
                      placeholder="Ex : 6"
                      placeholderTextColor="#8C8C8C"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={[styles.fieldBlock, styles.halfField]}>
                  <Text style={styles.label}>Places</Text>
                  <View style={styles.inputRow}>
                    <Ionicons
                      name="people-outline"
                      size={22}
                      color="#8B2332"
                    />
                    <TextInput
                      value={availableSeats}
                      onChangeText={setAvailableSeats}
                      placeholder="Ex : 3"
                      placeholderTextColor="#8C8C8C"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.createButton,
                  loadingCreate && styles.createButtonDisabled,
                ]}
                activeOpacity={0.8}
                disabled={loadingCreate}
                onPress={handleCreateRide}
              >
                <Text style={styles.createButtonText}>
                  {loadingCreate ? "Création..." : "Créer le trajet"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {showDatePicker && Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="fade"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerModalCard}>
                  <Text style={styles.pickerTitle}>Choisir une date</Text>

                  <DateTimePicker
                    value={tempPickerDate}
                    mode="date"
                    display="spinner"
                    locale="fr-FR"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    style={styles.iosPicker}
                  />

                  <View style={styles.pickerActions}>
                    <TouchableOpacity
                      style={styles.pickerSecondaryButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.pickerSecondaryButtonText}>
                        Annuler
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.pickerPrimaryButton}
                      onPress={confirmDateSelection}
                    >
                      <Text style={styles.pickerPrimaryButtonText}>
                        Confirmer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}

          {showTimePicker && Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="fade"
              visible={showTimePicker}
              onRequestClose={() => setShowTimePicker(false)}
            >
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerModalCard}>
                  <Text style={styles.pickerTitle}>Choisir une heure</Text>

                  <DateTimePicker
                    value={tempPickerDate}
                    mode="time"
                    display="spinner"
                    locale="fr-FR"
                    is24Hour={true}
                    onChange={handleTimeChange}
                    style={styles.iosPicker}
                  />

                  <View style={styles.pickerActions}>
                    <TouchableOpacity
                      style={styles.pickerSecondaryButton}
                      onPress={() => setShowTimePicker(false)}
                    >
                      <Text style={styles.pickerSecondaryButtonText}>
                        Annuler
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.pickerPrimaryButton}
                      onPress={confirmTimeSelection}
                    >
                      <Text style={styles.pickerPrimaryButtonText}>
                        Confirmer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}

          {showDatePicker && Platform.OS === "android" ? (
            <DateTimePicker
              value={departureDateTime}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          ) : null}

          {showTimePicker && Platform.OS === "android" ? (
            <DateTimePicker
              value={departureDateTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          ) : null}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

/*import React, { useEffect, useRef, useState } from "react"; //executer du code quand des valeurs changent, conserver une valeur persistante sans rerender pour suivre les requetes de suggestions
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable, //élément cliquable plus flexible
  Keyboard, //pour fermer le clavier
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker"; //Composant natif pour sélectionner une date ou une heure
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import styles from "../styles/CreateRideStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

function formatDate(date) {    //Transforme un objet Date en date lisible française
  return date.toLocaleDateString("fr-FR");
}

function formatTime(date) {   //Transforme la date en heure lisible
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTimeLabel(date) {  //Combine les deux fonctions précédentes
  return `${formatDate(date)} à ${formatTime(date)}`;
}

function mapboxFeatureToSuggestion(feature) {  //fonction transforme une réponse brute de Mapbox en objet plus simple
  const props = feature?.properties || {};  //récupère properties de la feature
  const coords = props?.coordinates || {};  //récupère les coordonnées dans properties.coordinates
  const fallbackGeometry = feature?.geometry?.coordinates || []; //Si les coordonnées ne sont pas dans properties, tu vas chercher dans geometry.coordinates

  const longitude = //Si coords.longitude est un nombre, tu l’utilises sinon tu prends le premier élément de geometry.coordinates
    typeof coords.longitude === "number" ? coords.longitude : fallbackGeometry[0];

  const latitude =
    typeof coords.latitude === "number" ? coords.latitude : fallbackGeometry[1];

  const label = //construit un libellé lisible
    props.full_address || //ca
    [props.name_preferred || props.name, props.place_formatted] //sinon ca
      .filter(Boolean) //enleve les valeurs vides avant le join
      .join(", ");

  return { //renvoie un objet simplifié pour mon interface
    id: feature.id || props.mapbox_id || String(Math.random()),
    label,
    latitude,
    longitude,
  };
}

export default function CreateRideScreen({ navigation }) {  //composant principal de l'ecran
  const user = useSelector((state) => state.user?.value); //lis l utilisateur dans redux
  const token = user?.token; //extrais le token qui sera renvoye au back pour authentifier le conducteur

  const [departureQuery, setDepartureQuery] = useState("");  //ce que l’utilisateur a écrit
  const [destinationQuery, setDestinationQuery] = useState("");

  const [departureSuggestions, setDepartureSuggestions] = useState([]); //tableaux des suggestions Mapbox pour chaque champ
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState(null); //la suggestion vraiemnt choisie
  const [selectedDestination, setSelectedDestination] = useState(null);
//Ça évite de créer un trajet avec une simple saisie libre non validée

  const [showDepartureSuggestions, setShowDepartureSuggestions] = //contrôlent l’ouverture/fermeture des listes de suggestions
    useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] = //affichent un loader pendant la recherche d’adresses
    useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] =
    useState(false);

  const [departureDateTime, setDepartureDateTime] = useState(new Date()); //initialisée à maintenant
  const [showDatePicker, setShowDatePicker] = useState(false); //contrôlent l’ouverture du picker date et heure
  const [showTimePicker, setShowTimePicker] = useState(false); 
  const [tempPickerDate, setTempPickerDate] = useState(new Date()); //date temporaire utilisée dans les modals iOS pour modifier une date sans valider immediatement

  const [price, setPrice] = useState("");
  const [availableSeats, setAvailableSeats] = useState("1");

  const [loadingCreate, setLoadingCreate] = useState(false); //indique si la requête de création du trajet est en cours

  const departureRequestIdRef = useRef(0); //servent à numéroter les requêtes envoyées à Mapbox
  const destinationRequestIdRef = useRef(0); //ça permet d’ignorer une ancienne réponse arrivée après une nouvelle

  const fetchMapboxSuggestions = async ({ //fonction générique réutilisable pour départ et destination
    query, //recoit : la requete texte
    setSuggestions, //la fonction pour remplir les suggestions
    setLoading, //la fonction pour gere le loader
    requestIdRef, //la ref de suivi des requetes
    currentRequestId, //l'Id de la requete en cours
  }) => {
    if (!EXPO_PUBLIC_MAPBOX_TOKEN) {
      setSuggestions([]);
      return;
    }  //verif du token mapbox

    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      return;   //si la recherche fait moins de 3 caractères : tu ne lances pas l’API, tu vides la liste
    }

    try {
      setLoading(true); //le loader des suggestions s’active

      const url = //construis une URL complète pour l’API de géocodage
        `https://api.mapbox.com/search/geocode/v6/forward` +
        `?q=${encodeURIComponent(query.trim())}` +   //texte recherché
        `&access_token=${encodeURIComponent(EXPO_PUBLIC_MAPBOX_TOKEN)}` + //token mapbox
        `&autocomplete=true` + //sugestions automatiques
        `&limit=5` + //max 5 resultats
        `&language=fr` + //en francais
        `&country=FR` + //resultats limites a la France
        `&types=address,street,place,locality,neighborhood`; //types de lieux autorises

      const response = await fetch(url); //envoi de la requete a mapbox
      const data = await response.json(); //parsing de la rep Json

      if (currentRequestId !== requestIdRef.current) { //si la réponse reçue ne correspond plus à la requête la plus récente on l'ignore
        return;
      }

      const mapped = (data?.features || []) //prend les features renvoyées par Mapbox
        .map(mapboxFeatureToSuggestion)  //les transforme en objets simplifies
        .filter( //filtre les elements invalides
          (item) => //je garde les suggestions qui ont un label, une lat valide et une long valide
            item &&
            item.label &&
            typeof item.latitude === "number" &&
            typeof item.longitude === "number"
        );

      setSuggestions(mapped); //met les suggestions dans le state correspondant
    } catch (error) { //si Mapbox plante ou si le réseau échoue je vide les suggestions pour pas bloquer l'app
     
      setSuggestions([]);
    } finally {
      if (currentRequestId === requestIdRef.current) { //arrête le loader seulement si la requête correspond encore à la plus récente
        setLoading(false);         //sinon tu évites de casser l’état d’une nouvelle requête déjà lancée
      }
    }
  };

  useEffect(() => {
    if (!showDepartureSuggestions) return; //si la liste n’est pas censée être visible, on ne fait rien

    const timer = setTimeout(() => { //crée un délai avant d’appeler Mapbox
      departureRequestIdRef.current += 1; //incrémentes l’id de la requête
      const requestId = departureRequestIdRef.current; //et la memorise

      fetchMapboxSuggestions({ //appelle la fonction générique avec les paramètres du départ
        query: departureQuery,
        setSuggestions: setDepartureSuggestions,
        setLoading: setLoadingDepartureSuggestions,
        requestIdRef: departureRequestIdRef,
        currentRequestId: requestId,
      });
    }, 350); //évite d’appeler l’API à chaque touche instantanément, 350 ms

    return () => clearTimeout(timer); //si l’utilisateur retape avant 350 ms, l’ancien timer est annulé
  }, [departureQuery, showDepartureSuggestions]); //du coup texte et suggestions changent

  useEffect(() => { //on ne fait rien si les suggestions sont cachées
    if (!showDestinationSuggestions) return;

    const timer = setTimeout(() => {
      destinationRequestIdRef.current += 1;
      const requestId = destinationRequestIdRef.current;

      fetchMapboxSuggestions({
        query: destinationQuery,
        setSuggestions: setDestinationSuggestions,
        setLoading: setLoadingDestinationSuggestions,
        requestIdRef: destinationRequestIdRef,
        currentRequestId: requestId,
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [destinationQuery, showDestinationSuggestions]);

  const selectDeparture = (item) => { //Quand l’utilisateur choisit une suggestion
    setSelectedDeparture(item);   //alors je stocke stockes la suggestion complète, mets son laabel dans le champ, vide la liste, cache le dropdown
    setDepartureQuery(item.label);
    setDepartureSuggestions([]);
    setShowDepartureSuggestions(false);
  };

  const selectDestination = (item) => {
    setSelectedDestination(item);
    setDestinationQuery(item.label);
    setDestinationSuggestions([]);
    setShowDestinationSuggestions(false);
  };

  const handleDateChange = (_, selectedDate) => { //fonction appelée par le DateTimePicker, selectedDate contient la date choisie
  if (Platform.OS === "android") {               //android le premier paramètre est l’événement, ici ignoré avec _
    setShowDatePicker(false); //sur Android, le picker natif s’ouvre en dehors d’une modal custom

    if (!selectedDate) return; //IOS si l’utilisateur annule, on ne fait rien

    const updated = new Date(departureDateTime); //tu pars de la date/heure actuelle stockée
    updated.setFullYear( //remplaces seulement la partie date
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    setDepartureDateTime(updated); //mise à jour de la date finale
    return;
  }

  if (selectedDate) { //sur iOS, tu n’enregistres pas directement la date finale, tu mets a jour une date temporaire et la vraie validation se fait au clic confirmer 
    setTempPickerDate(selectedDate);
  }
};

const handleTimeChange = (_, selectedTime) => { //pareil pour l heure
  if (Platform.OS === "android") {
    setShowTimePicker(false);

    if (!selectedTime) return;

    const updated = new Date(departureDateTime);
    updated.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
    setDepartureDateTime(updated);
    return;
  }

  if (selectedTime) {
    setTempPickerDate(selectedTime);
  }
};

const openDateModal = () => { //tu copies la date actuelle dans tempPickerDate puis tu ouvres la modal date
  setTempPickerDate(new Date(departureDateTime));
  setShowDatePicker(true);
};

const openTimeModal = () => { //pareil pour l'heure
  setTempPickerDate(new Date(departureDateTime));
  setShowTimePicker(true);
};

const confirmDateSelection = () => { //confirmation de la date IOS, pars de la date complète actuelle
  const updated = new Date(departureDateTime); //remplaces seulement la partie date avec celle choisie dans la modal
  updated.setFullYear(
    tempPickerDate.getFullYear(),
    tempPickerDate.getMonth(),
    tempPickerDate.getDate()
  );
  setDepartureDateTime(updated); //valide la date finale et ferme la modal
  setShowDatePicker(false);
};

const confirmTimeSelection = () => { //confirmation de l'heure IOS, on repart de la date et heure courante
  const updated = new Date(departureDateTime);
  updated.setHours(             //on remplace seulement l’heure et les minutes
    tempPickerDate.getHours(),
    tempPickerDate.getMinutes(),
    0,
    0
  );
  setDepartureDateTime(updated); //validation finale + fermeture modal
  setShowTimePicker(false);
};

  const closeSuggestions = () => { //ferme les deux listes de suggestions et le clavier
    setShowDepartureSuggestions(false);
    setShowDestinationSuggestions(false);
    Keyboard.dismiss(); //Très utile quand on tape ailleurs sur l’écran
  };

  const handleCreateRide = async () => { //fonction appelée au clic sur “Créer le trajet”
    if (!EXPO_PUBLIC_API_URL) { //vérifie que le backend est configuré
      Alert.alert("Erreur", "EXPO_PUBLIC_API_URL est manquant dans le fichier .env.");
      return;
    }

    if (!EXPO_PUBLIC_MAPBOX_TOKEN) { //vérifie que le backend est configuré
      Alert.alert("Erreur", "EXPO_PUBLIC_MAPBOX_TOKEN est manquant dans le fichier .env.");
      return;
    }

    if (!token) { //sans token, impossible de créer le trajet
      Alert.alert("Erreur", "Utilisateur non identifié.");
      return;
    }

    if (  //vérifie deux choses : les champs texte ne sont pas vides et surtout, une vraie suggestion a été sélectionnée
      !departureQuery.trim() ||
      !destinationQuery.trim() ||
      !selectedDeparture ||
      !selectedDestination
    ) {
      Alert.alert(
        "Erreur",
        "Merci de remplir le départ, l’arrivée et de sélectionner les adresses proposées."
      );
      return;
    }

    if (!price.trim()) {
      Alert.alert("Erreur", "Merci d’indiquer un prix.");
      return;
    }

    const seatsNumber = Number(availableSeats); //transformation des strings venant des TextInput en nombres
    const priceNumber = Number(price); //pareil

    if (Number.isNaN(seatsNumber) || seatsNumber <= 0) { //doit etre un vrai nombre, strictement positif
      Alert.alert("Erreur", "Le nombre de places doit être supérieur à 0.");
      return;
    }

    if (Number.isNaN(priceNumber) || priceNumber < 0) { //doit etre un nombre, pas negatif
      Alert.alert("Erreur", "Le prix est invalide.");
      return;
    }

    try {
      setLoadingCreate(true); //démarrage du chargement
      closeSuggestions(); //fermeture des suggestions avant requête

      const payload = { //construction du payload
        token, //auth
        departureAddress: departureQuery.trim(), //texte affichable
        destinationAddress: destinationQuery.trim(),
        departureLatitude: selectedDeparture.latitude, //coordonnees GPS
        departureLongitude: selectedDeparture.longitude,
        destinationLatitude: selectedDestination.latitude, //idem
        destinationLongitude: selectedDestination.longitude,
        departureDateTime: departureDateTime.toISOString(), //date ISO standard pour backend
        pickupWalkMinutes: 0, //ici fixés à 0
        dropoffWalkMinutes: 0,
        price: priceNumber,
        availableSeats: seatsNumber,
      };

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/rides/create`, { //requete
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); //lecture reponse backend

      if (!response.ok || !data.result) { //verif le statut HTTP et le succes metier renvoye par le back
        Alert.alert(
          "Erreur",
          data?.error || data?.message || "Impossible de créer le trajet."
        );
        return;
      }

      Alert.alert("Succès", "Votre trajet a bien été créé.", [ //affiche un message de confirmation 
        {
          text: "OK",
          onPress: () => navigation.navigate("DriverTabs", { //je pars vers DriverTabs
  screen: "DriverTrips", //sur l'ecran DriverTrips
  params: { initialTab: "upcoming" }, //dans l'onglet a venir
       })
        },
      ]);
    } catch (error) {
     
      Alert.alert("Erreur", "Impossible de créer le trajet."); //si problème réseau ou erreur imprévue j'affiche erreur
    } finally {
      setLoadingCreate(false); //puis je remets loadingCreate a false
    }
  };

 const renderSuggestionItem = ({ item }) => (
  <Pressable
    key={item.id}
    style={styles.suggestionItem}
    onPress={() => handleSelectSuggestion(item)}
  >
    <Ionicons name="location-outline" size={18} color="#8B2332" />
    <Text style={styles.suggestionText} numberOfLines={2}>
      {item.label}
    </Text>
  </Pressable>
);

   return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={closeSuggestions}>
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={28} color="#8B2332" />
              </TouchableOpacity>

              <Text style={styles.logo}>BUZZ</Text>

              <View style={styles.headerRightSpacer} />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Créer un trajet</Text>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Adresse de départ</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="location" size={24} color="#8B2332" />
                  <TextInput
                    value={departureQuery}
                    onChangeText={(text) => {
                      setDepartureQuery(text);
                      setSelectedDeparture(null);
                      setShowDepartureSuggestions(true);
                    }}
                    onFocus={() => setShowDepartureSuggestions(true)}
                    placeholder="Adresse de départ"
                    placeholderTextColor="#8C8C8C"
                    style={styles.input}
                  />
                </View>

                {loadingDepartureSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                ) : null}

                {showDepartureSuggestions && departureSuggestions.length > 0 ? (
                  <View style={styles.suggestionsBox}>
                    {departureSuggestions.map((item) =>
                      renderSuggestionItem(item, selectDeparture)
                    )}
                  </View>
                ) : null}
              </View>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Adresse d’arrivée</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="location" size={24} color="#8B2332" />
                  <TextInput
                    value={destinationQuery}
                    onChangeText={(text) => {
                      setDestinationQuery(text);
                      setSelectedDestination(null);
                      setShowDestinationSuggestions(true);
                    }}
                    onFocus={() => setShowDestinationSuggestions(true)}
                    placeholder="Adresse d'arrivée"
                    placeholderTextColor="#8C8C8C"
                    style={styles.input}
                  />
                </View>

                {loadingDestinationSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                ) : null}

                {showDestinationSuggestions &&
                destinationSuggestions.length > 0 ? (
                  <View style={styles.suggestionsBox}>
                    {destinationSuggestions.map((item) =>
                      renderSuggestionItem(item, selectDestination)
                    )}
                  </View>
                ) : null}
              </View>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Date et heure de départ</Text>

                <View style={styles.dateTimeCard}>
                  <TouchableOpacity
                    style={styles.dateTimeMainButton}
                    activeOpacity={0.8}
                    onPress={openDateModal}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color="#8B2332"
                    />
                    <View style={styles.dateTimeContent}>
                      <Text style={styles.dateTimeMainLabel}>Départ prévu</Text>
                      <Text style={styles.dateTimeMainValue}>
                        {formatDateTimeLabel(departureDateTime)}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#8C8C8C"
                    />
                  </TouchableOpacity>

                  <View style={styles.dateTimeQuickActions}>
                    <TouchableOpacity
                      style={styles.dateChip}
                      activeOpacity={0.8}
                      onPress={openDateModal}
                    >
                      <Ionicons
                        name="calendar-clear-outline"
                        size={18}
                        color="#8B2332"
                      />
                      <Text style={styles.dateChipText}>
                        {formatDate(departureDateTime)}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dateChip}
                      activeOpacity={0.8}
                      onPress={openTimeModal}
                    >
                      <Ionicons
                        name="time-outline"
                        size={18}
                        color="#8B2332"
                      />
                      <Text style={styles.dateChipText}>
                        {formatTime(departureDateTime)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.twoColumnsRow}>
                <View style={[styles.fieldBlock, styles.halfField]}>
                  <Text style={styles.label}>Prix (€)</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="cash-outline" size={22} color="#8B2332" />
                    <TextInput
                      value={price}
                      onChangeText={setPrice}
                      placeholder="Ex : 6"
                      placeholderTextColor="#8C8C8C"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </View>
                </View>

                <View style={[styles.fieldBlock, styles.halfField]}>
                  <Text style={styles.label}>Places</Text>
                  <View style={styles.inputRow}>
                    <Ionicons
                      name="people-outline"
                      size={22}
                      color="#8B2332"
                    />
                    <TextInput
                      value={availableSeats}
                      onChangeText={setAvailableSeats}
                      placeholder="Ex : 3"
                      placeholderTextColor="#8C8C8C"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.createButton,
                  loadingCreate && styles.createButtonDisabled,
                ]}
                activeOpacity={0.8}
                disabled={loadingCreate}
                onPress={handleCreateRide}
              >
                <Text style={styles.createButtonText}>
                  {loadingCreate ? "Création..." : "Créer le trajet"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {showDatePicker && Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="fade"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerModalCard}>
                  <Text style={styles.pickerTitle}>Choisir une date</Text>

                  <DateTimePicker
                    value={tempPickerDate}
                    mode="date"
                    display="spinner"
                    locale="fr-FR"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    style={styles.iosPicker}
                  />

                  <View style={styles.pickerActions}>
                    <TouchableOpacity
                      style={styles.pickerSecondaryButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.pickerSecondaryButtonText}>
                        Annuler
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.pickerPrimaryButton}
                      onPress={confirmDateSelection}
                    >
                      <Text style={styles.pickerPrimaryButtonText}>
                        Confirmer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}

          {showTimePicker && Platform.OS === "ios" ? (
            <Modal
              transparent
              animationType="fade"
              visible={showTimePicker}
              onRequestClose={() => setShowTimePicker(false)}
            >
              <View style={styles.pickerOverlay}>
                <View style={styles.pickerModalCard}>
                  <Text style={styles.pickerTitle}>Choisir une heure</Text>

                  <DateTimePicker
                    value={tempPickerDate}
                    mode="time"
                    display="spinner"
                    locale="fr-FR"
                    is24Hour={true}
                    onChange={handleTimeChange}
                    style={styles.iosPicker}
                  />

                  <View style={styles.pickerActions}>
                    <TouchableOpacity
                      style={styles.pickerSecondaryButton}
                      onPress={() => setShowTimePicker(false)}
                    >
                      <Text style={styles.pickerSecondaryButtonText}>
                        Annuler
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.pickerPrimaryButton}
                      onPress={confirmTimeSelection}
                    >
                      <Text style={styles.pickerPrimaryButtonText}>
                        Confirmer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}

          {showDatePicker && Platform.OS === "android" ? (
            <DateTimePicker
              value={departureDateTime}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          ) : null}

          {showTimePicker && Platform.OS === "android" ? (
            <DateTimePicker
              value={departureDateTime}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          ) : null}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
} */