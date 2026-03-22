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
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
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

  const [showDepartureSuggestions, setShowDepartureSuggestions] =
    useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] =
    useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] =
    useState(false);

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
      console.log("Erreur suggestions Mapbox :", error);
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
        "Merci de remplir le titre, le départ, l’arrivée et de sélectionner les adresses proposées."
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
          onPress: () => navigation.navigate("DriverTabs", {
  screen: "Trajets",
  params: { initialTab: "upcoming" }, 
       })
        },
      ]);
    } catch (error) {
      console.log("Erreur création trajet :", error);
      Alert.alert("Erreur", "Impossible de créer le trajet.");
    } finally {
      setLoadingCreate(false);
    }
  };

  const renderSuggestionItem = (item, onPress) => (
    <Pressable
      key={item.id}
      style={styles.suggestionItem}
      onPress={() => onPress(item)}
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

                {loadingDepartureSuggestions && (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                )}

                {showDepartureSuggestions && departureSuggestions.length > 0 && (
                  <View style={styles.suggestionsBox}>
                    {departureSuggestions.map((item) =>
                      renderSuggestionItem(item, selectDeparture)
                    )}
                  </View>
                )}
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

                {loadingDestinationSuggestions && (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color="#8B2332"
                  />
                )}

                {showDestinationSuggestions &&
                  destinationSuggestions.length > 0 && (
                    <View style={styles.suggestionsBox}>
                      {destinationSuggestions.map((item) =>
                        renderSuggestionItem(item, selectDestination)
                      )}
                    </View>
                  )}
              </View>

              <View style={styles.fieldBlock}>
  <Text style={styles.label}>Date et heure de départ</Text>

  <View style={styles.dateTimeCard}>
    <TouchableOpacity
      style={styles.dateTimeMainButton}
      activeOpacity={0.8}
      onPress={openDateModal}
    >
      <Ionicons name="calendar-outline" size={22} color="#8B2332" />
      <View style={styles.dateTimeContent}>
        <Text style={styles.dateTimeMainLabel}>Départ prévu</Text>
        <Text style={styles.dateTimeMainValue}>
          {formatDateTimeLabel(departureDateTime)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#8C8C8C" />
    </TouchableOpacity>

    <View style={styles.dateTimeQuickActions}>
      <TouchableOpacity
        style={styles.dateChip}
        activeOpacity={0.8}
        onPress={openDateModal}
      >
        <Ionicons name="calendar-clear-outline" size={18} color="#8B2332" />
        <Text style={styles.dateChipText}>{formatDate(departureDateTime)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateChip}
        activeOpacity={0.8}
        onPress={openTimeModal}
      >
        <Ionicons name="time-outline" size={18} color="#8B2332" />
        <Text style={styles.dateChipText}>{formatTime(departureDateTime)}</Text>
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
                    <Ionicons name="people-outline" size={22} color="#8B2332" />
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

          {showDatePicker && Platform.OS === "ios" && (
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
          onChange={handleDateChange}
          minimumDate={new Date()}
          style={styles.iosPicker}
        />

        <View style={styles.pickerActions}>
          <TouchableOpacity
            style={styles.pickerSecondaryButton}
            onPress={() => setShowDatePicker(false)}
          >
            <Text style={styles.pickerSecondaryButtonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerPrimaryButton}
            onPress={confirmDateSelection}
          >
            <Text style={styles.pickerPrimaryButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)}

{showTimePicker && Platform.OS === "ios" && (
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
          onChange={handleTimeChange}
          style={styles.iosPicker}
        />

        <View style={styles.pickerActions}>
          <TouchableOpacity
            style={styles.pickerSecondaryButton}
            onPress={() => setShowTimePicker(false)}
          >
            <Text style={styles.pickerSecondaryButtonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pickerPrimaryButton}
            onPress={confirmTimeSelection}
          >
            <Text style={styles.pickerPrimaryButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)}

{showDatePicker && Platform.OS === "android" && (
  <DateTimePicker
    value={departureDateTime}
    mode="date"
    display="default"
    onChange={handleDateChange}
    minimumDate={new Date()}
  />
)}

{showTimePicker && Platform.OS === "android" && (
  <DateTimePicker
    value={departureDateTime}
    mode="time"
    display="default"
    onChange={handleTimeChange}
  />
)}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

/*import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../styles/CreateRideStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

export default function CreateRideScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");

  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [activeField, setActiveField] = useState(null);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = useMemo(() => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }, [date]);

  const formattedTime = useMemo(() => {
    if (!time) return "";
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }, [time]);

  const isFormValid =
    departure.trim().length > 0 &&
    destination.trim().length > 0 &&
    !!date &&
    !!time &&
    price.trim().length > 0 &&
    Number(price) > 0 &&
    seats > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activeField === "departure" && departure.trim().length >= 3) {
        fetchAddressSuggestions(departure, "departure");
      } else if (activeField === "destination" && destination.trim().length >= 3) {
        fetchAddressSuggestions(destination, "destination");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [departure, destination, activeField]);

  const fetchAddressSuggestions = async (query, field) => {
    if (!EXPO_PUBLIC_GEOAPIFY_API_KEY) {
      return;
    }

    try {
      const url =
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          query
        )}&limit=5&lang=fr&format=json&apiKey=${EXPO_PUBLIC_GEOAPIFY_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      const results = (data.results || []).map((item) => ({
        label:
          item.formatted ||
          [item.address_line1, item.address_line2].filter(Boolean).join(", "),
        lat: item.lat,
        lon: item.lon,
      }));

      if (field === "departure") {
        setDepartureSuggestions(results);
      } else {
        setDestinationSuggestions(results);
      }
    } catch (error) {
      console.log("Erreur autocomplétion adresse :", error);
    }
  };

  const handleSelectSuggestion = (item, field) => {
    if (field === "departure") {
      setDeparture(item.label);
      setSelectedDeparture(item);
      setDepartureSuggestions([]);
    } else {
      setDestination(item.label);
      setSelectedDestination(item);
      setDestinationSuggestions([]);
    }
    setActiveField(null);
  };

  const handleChangeDeparture = (value) => {
    setDeparture(value);
    setSelectedDeparture(null);
    setActiveField("departure");
  };

  const handleChangeDestination = (value) => {
    setDestination(value);
    setSelectedDestination(null);
    setActiveField("destination");
  };

  const handleDateChange = (_, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (_, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handlePriceChange = (value) => {
    const cleanValue = value.replace(/[^\d]/g, "");
    setPrice(cleanValue);
  };

  const decreaseSeats = () => {
    setSeats((prev) => Math.max(1, prev - 1));
  };

  const increaseSeats = () => {
    setSeats((prev) => prev + 1);
  };

  const handlePublishRide = async () => {
    if (!isFormValid) return;

    try {
      setIsLoading(true);

      const body = {
        token: user.token,
        departureAddress: departure.trim(),
        destinationAddress: destination.trim(),
        departureLatitude: selectedDeparture?.lat || null,
        departureLongitude: selectedDeparture?.lon || null,
        destinationLatitude: selectedDestination?.lat || null,
        destinationLongitude: selectedDestination?.lon || null,
        date: formattedDate,
        time: formattedTime,
        price: Number(price),
        seats,
        title: `${departure.trim()} → ${destination.trim()}`,
      };

      const response = await fetch(`${EXPO_PUBLIC_API_URL}/rides`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!data.result) {
        Alert.alert("Erreur", data.error || "Impossible de publier le trajet.");
        return;
      }

      Alert.alert("Succès", "Votre trajet a bien été publié.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("DriverTabs", { screen: "Trajets" }),
        },
      ]);
    } catch (error) {
      console.log("Erreur publication trajet :", error);
      Alert.alert("Erreur", "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuggestion = ({ item, field }) => (
    <Pressable
      style={styles.suggestionItem}
      onPress={() => handleSelectSuggestion(item, field)}
    >
      <Ionicons name="location-outline" size={18} color="#8B2332" />
      <Text style={styles.suggestionText}>{item.label}</Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Créer mon trajet</Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("Trajets")}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formWrapper}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-sharp" size={22} color="#8B2332" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Départ"
              placeholderTextColor="#555"
              value={departure}
              onChangeText={handleChangeDeparture}
              onFocus={() => setActiveField("departure")}
            />
          </View>

          {activeField === "departure" && departureSuggestions.length > 0 && (
            <View style={styles.suggestionsBox}>
              <FlatList
                data={departureSuggestions}
                keyExtractor={(item, index) => `${item.label}-${index}`}
                renderItem={({ item }) => renderSuggestion({ item, field: "departure" })}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          )}

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="arrow-down" size={22} color="#8B2332" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Arrivée"
              placeholderTextColor="#555"
              value={destination}
              onChangeText={handleChangeDestination}
              onFocus={() => setActiveField("destination")}
            />
          </View>

          {activeField === "destination" && destinationSuggestions.length > 0 && (
            <View style={styles.suggestionsBox}>
              <FlatList
                data={destinationSuggestions}
                keyExtractor={(item, index) => `${item.label}-${index}`}
                renderItem={({ item }) =>
                  renderSuggestion({ item, field: "destination" })
                }
                keyboardShouldPersistTaps="handled"
              />
            </View>
          )}

          <View style={styles.doubleCard}>
            <TouchableOpacity
              style={[styles.halfCard, styles.halfCardLeft]}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircleSmall}>
                <Ionicons name="calendar-outline" size={20} color="#8B2332" />
              </View>
              <Text style={formattedDate ? styles.valueText : styles.placeholderText}>
                {formattedDate || "Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.halfCard, styles.halfCardRight]}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircleSmall}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color="#8B2332"
                />
              </View>
              <Text style={formattedTime ? styles.valueText : styles.placeholderText}>
                {formattedTime || "Heure"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="cash-outline" size={22} color="#8B2332" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Prix"
              placeholderTextColor="#555"
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
            />

            <Text style={styles.suffixText}>€</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="people-outline" size={22} color="#8B2332" />
            </View>

            <Text style={styles.seatsLabel}>Places disponibles</Text>

            <View style={styles.seatsControls}>
              <TouchableOpacity
                style={styles.seatButton}
                onPress={decreaseSeats}
                activeOpacity={0.8}
              >
                <Ionicons name="remove" size={18} color="#8B2332" />
              </TouchableOpacity>

              <Text style={styles.seatsValue}>{seats}</Text>

              <TouchableOpacity
                style={styles.seatButton}
                onPress={increaseSeats}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={18} color="#8B2332" />
              </TouchableOpacity>

              <FontAwesome5
                name="user"
                size={18}
                color="#8B2332"
                style={styles.userIcon}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.publishButton,
              (!isFormValid || isLoading) && styles.publishButtonDisabled,
            ]}
            onPress={handlePublishRide}
            disabled={!isFormValid || isLoading}
            activeOpacity={0.85}
          >
            <Text style={styles.publishButtonText}>
              {isLoading ? "Publication..." : "Publier le trajet"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </KeyboardAvoidingView>
  );
} */