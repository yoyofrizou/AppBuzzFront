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
import { colors } from "../styles/theme";
import TogoLogo from "../components/TogoLogo";

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

      navigation.navigate("DriverTrips", { initialTab: "upcoming" });
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
      <Ionicons name="location-outline" size={18} color={colors.textPrimary} />
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
                <Ionicons name="arrow-back" size={28} color={colors.textPrimary} />
              </TouchableOpacity>

              <TogoLogo size={34} />

              <View style={styles.headerRightSpacer} />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Créer un trajet</Text>

              <View style={styles.fieldBlock}>
                <Text style={styles.label}>Adresse de départ</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="location" size={24} color={colors.textPrimary} />
                  <TextInput
                    value={departureQuery}
                    onChangeText={(text) => {
                      setDepartureQuery(text);
                      setSelectedDeparture(null);
                      setShowDepartureSuggestions(true);
                    }}
                    onFocus={() => setShowDepartureSuggestions(true)}
                    placeholder="Adresse de départ"
                    placeholderTextColor={colors.textSecondary}
                    style={styles.input}
                  />
                </View>

                {loadingDepartureSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color={colors.textPrimary}
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
                  <Ionicons name="location" size={24} color={colors.textPrimary} />
                  <TextInput
                    value={destinationQuery}
                    onChangeText={(text) => {
                      setDestinationQuery(text);
                      setSelectedDestination(null);
                      setShowDestinationSuggestions(true);
                    }}
                    onFocus={() => setShowDestinationSuggestions(true)}
                    placeholder="Adresse d'arrivée"
                    placeholderTextColor={colors.textSecondary}
                    style={styles.input}
                  />
                </View>

                {loadingDestinationSuggestions ? (
                  <ActivityIndicator
                    style={styles.suggestionsLoader}
                    color={colors.textPrimary}
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
                      color={colors.textPrimary}
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
                      color={colors.textSecondary}
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
                        color={colors.textPrimary}
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
                        color={colors.textPrimary}
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
                    <Ionicons name="cash-outline" size={22} color={colors.textPrimary} />
                    <TextInput
                      value={price}
                      onChangeText={setPrice}
                      placeholder="Ex : 6"
                      placeholderTextColor={colors.textSecondary}
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
                      color={colors.textPrimary}
                    />
                    <TextInput
                      value={availableSeats}
                      onChangeText={setAvailableSeats}
                      placeholder="Ex : 3"
                      placeholderTextColor={colors.textSecondary}
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

