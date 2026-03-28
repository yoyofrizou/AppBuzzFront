import React, { useEffect, useMemo, useRef, useState } from "react";
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
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setSearchedRides, setSearchParams } from "../redux/reducers/rides";
import styles from "../styles/PassengerSearchStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

const WALKING_SPEED_METERS_PER_MINUTE = 80;
const MAX_WALK_MINUTES = 20;

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

function minutesToMeters(minutes) {
  return minutes * WALKING_SPEED_METERS_PER_MINUTE;
}

function mapboxFeatureToSuggestion(feature) {
  const props = feature?.properties || {};
  const coords = props?.coordinates || {};
  const fallbackGeometry = feature?.geometry?.coordinates || [];

  const longitude =
    typeof coords.longitude === "number"
      ? coords.longitude
      : fallbackGeometry[0];

  const latitude =
    typeof coords.latitude === "number"
      ? coords.latitude
      : fallbackGeometry[1];

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

function SliderBlock({ title, value, onChange, max = MAX_WALK_MINUTES }) {
  const [sliderWidth, setSliderWidth] = useState(0);

  const badgeLeft = useMemo(() => {
    if (!sliderWidth) return 0;

    const ratio = value / max;
    const thumbOffset = 14;
    const badgeWidth = 190;
    const rawLeft = ratio * (sliderWidth - thumbOffset * 2);
    const centered = rawLeft - badgeWidth / 2 + thumbOffset;

    return Math.max(0, Math.min(centered, sliderWidth - badgeWidth));
  }, [sliderWidth, value, max]);

  return (
    <View style={styles.sliderSection}>
      <View style={styles.sliderHeaderRow}>
        <Text style={styles.sliderTitle}>{title}</Text>
        <Text style={styles.sliderMax}>{max}</Text>
      </View>

      <View
        style={styles.sliderWrapper}
        onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      >
        <View style={[styles.sliderBadge, { left: badgeLeft }]}>
          <Text style={styles.sliderBadgeText}>
            {value} min à pied (~{Math.round(minutesToMeters(value))} m)
          </Text>
        </View>

        <Slider
          value={value}
          onValueChange={onChange}
          minimumValue={0}
          maximumValue={max}
          step={1}
          minimumTrackTintColor="#F4B63C"
          maximumTrackTintColor="#E4E4EA"
          thumbTintColor="#FFFFFF"
          style={styles.slider}
        />

        <View style={styles.sliderScaleRow}>
          {[0, 10, 20].map((item) => (
            <Text key={item} style={styles.sliderScaleText}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function PassengerSearchScreen({ navigation }) {
  const dispatch = useDispatch();

  const [departureQuery, setDepartureQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [pickupWalkMinutes, setPickupWalkMinutes] = useState(5);
  const [dropoffWalkMinutes, setDropoffWalkMinutes] = useState(10);

  const [departureDateTime, setDepartureDateTime] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] =
    useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] =
    useState(false);

  const [showDepartureSuggestions, setShowDepartureSuggestions] =
    useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

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

  const openDatePicker = () => {
    setTempDate(new Date(departureDateTime));
    setShowDatePicker(true);
  };

  const openTimePicker = () => {
    setTempTime(new Date(departureDateTime));
    setShowTimePicker(true);
  };

  const handleConfirmDate = () => {
    const updated = new Date(departureDateTime);

    updated.setFullYear(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );

    setDepartureDateTime(updated);
    setShowDatePicker(false);
  };

  const handleConfirmTime = () => {
    const updated = new Date(departureDateTime);

    updated.setHours(tempTime.getHours(), tempTime.getMinutes(), 0, 0);

    setDepartureDateTime(updated);
    setShowTimePicker(false);
  };

  const handleSearch = async () => {
    if (!EXPO_PUBLIC_API_URL) {
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_API_URL est manquant dans le fichier .env."
      );
      return;
    }

    if (!EXPO_PUBLIC_MAPBOX_TOKEN) {
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_MAPBOX_TOKEN est manquant dans le fichier .env."
      );
      return;
    }

    if (!departureQuery.trim() || !destinationQuery.trim()) {
      Alert.alert(
        "Erreur",
        "Merci de renseigner l’adresse de départ et d’arrivée."
      );
      return;
    }

    if (!selectedDeparture || !selectedDestination) {
      Alert.alert(
        "Erreur",
        "Merci de sélectionner le départ et l’arrivée dans les suggestions."
      );
      return;
    }

    try {
      setLoadingSearch(true);

      Keyboard.dismiss();
      setShowDepartureSuggestions(false);
      setShowDestinationSuggestions(false);

      const payload = {
        departure: departureQuery.trim(),
        destination: destinationQuery.trim(),
        dateTime: departureDateTime.toISOString(),
        pickupWalkMinutes,
        dropoffWalkMinutes,
        pickupWalkDistanceMeters: minutesToMeters(pickupWalkMinutes),
        dropoffWalkDistanceMeters: minutesToMeters(dropoffWalkMinutes),
        departureCoordinates: {
          latitude: selectedDeparture.latitude,
          longitude: selectedDeparture.longitude,
        },
        destinationCoordinates: {
          latitude: selectedDestination.latitude,
          longitude: selectedDestination.longitude,
        },
      };

      dispatch(setSearchParams(payload));

      const params = new URLSearchParams({
        departure: payload.departure,
        destination: payload.destination,
        dateTime: payload.dateTime,
        pickupWalkMinutes: String(payload.pickupWalkMinutes),
        dropoffWalkMinutes: String(payload.dropoffWalkMinutes),
        departureLat: String(payload.departureCoordinates.latitude),
        departureLng: String(payload.departureCoordinates.longitude),
        destinationLat: String(payload.destinationCoordinates.latitude),
        destinationLng: String(payload.destinationCoordinates.longitude),
      });

      const response = await fetch(
        `${EXPO_PUBLIC_API_URL}/rides/search?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok || !data.result) {
        dispatch(setSearchedRides([]));
        Alert.alert(
          "Aucun trajet",
          data?.error || data?.message || "Aucun trajet trouvé."
        );
        return;
      }

      dispatch(setSearchedRides(data.rides || []));
      navigation.navigate("PassengerSearchResults");
    } catch (error) {
      console.log("Erreur recherche trajets :", error);
      Alert.alert("Erreur", "Impossible d’effectuer la recherche.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const closeSuggestions = () => {
    setShowDepartureSuggestions(false);
    setShowDestinationSuggestions(false);
    Keyboard.dismiss();
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
              <View style={styles.fieldBlock}>
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

                  <TouchableOpacity
                    style={styles.inlineSearchButton}
                    activeOpacity={0.8}
                    onPress={handleSearch}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
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

              <Text style={styles.sectionTitle}>Ma marche acceptée</Text>

              <SliderBlock
                title="Prise en charge"
                value={pickupWalkMinutes}
                onChange={setPickupWalkMinutes}
              />

              <SliderBlock
                title="Dépose"
                value={dropoffWalkMinutes}
                onChange={setDropoffWalkMinutes}
              />

              <View style={styles.dateTimeButton}>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color="#8B2332"
                />
                <Text style={styles.dateTimeText}>
                  {formatDateTimeLabel(departureDateTime)}
                </Text>
              </View>

              <View style={styles.dateTimeActions}>
                <TouchableOpacity
                  style={styles.smallDateButton}
                  activeOpacity={0.8}
                  onPress={openDatePicker}
                >
                  <Text style={styles.smallDateButtonText}>
                    Changer la date
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.smallDateButton}
                  activeOpacity={0.8}
                  onPress={openTimePicker}
                >
                  <Text style={styles.smallDateButtonText}>
                    Changer l'heure
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.infoText}>
                Plus vous acceptez de marcher, plus nous trouvons de trajets
                disponibles.
              </Text>

              <TouchableOpacity
                style={[
                  styles.searchButton,
                  loadingSearch && styles.searchButtonDisabled,
                ]}
                activeOpacity={0.8}
                disabled={loadingSearch}
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>
                  {loadingSearch ? "Recherche..." : "Rechercher"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Modal
            visible={showDatePicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <Pressable
              style={styles.pickerOverlay}
              onPress={() => setShowDatePicker(false)}
            >
              <Pressable
                style={styles.pickerCard}
                onPress={() => {}}
              >
                <Text style={styles.pickerTitle}>Choisir une date</Text>

                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  locale="fr-FR"
                  onChange={(event, value) => {
                    if (value) {
                      setTempDate(value);
                    }
                  }}
                  minimumDate={new Date()}
                />

                <View style={styles.pickerButtonsRow}>
                  <TouchableOpacity
                    style={styles.pickerSecondaryButton}
                    activeOpacity={0.8}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.pickerSecondaryButtonText}>
                      Annuler
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pickerPrimaryButton}
                    activeOpacity={0.8}
                    onPress={handleConfirmDate}
                  >
                    <Text style={styles.pickerPrimaryButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>

          <Modal
            visible={showTimePicker}
            transparent
            animationType="fade"
            onRequestClose={() => setShowTimePicker(false)}
          >
            <Pressable
              style={styles.pickerOverlay}
              onPress={() => setShowTimePicker(false)}
            >
              <Pressable
                style={styles.pickerCard}
                onPress={() => {}}
              >
                <Text style={styles.pickerTitle}>Choisir une heure</Text>

                <DateTimePicker
                  value={tempTime}
                  mode="time"
                  display="spinner"
                  locale="fr-FR"
                  is24Hour={true}
                  onChange={(event, value) => {
                    if (value) {
                      setTempTime(value);
                    }
                  }}
                />

                <View style={styles.pickerButtonsRow}>
                  <TouchableOpacity
                    style={styles.pickerSecondaryButton}
                    activeOpacity={0.8}
                    onPress={() => setShowTimePicker(false)}
                  >
                    <Text style={styles.pickerSecondaryButtonText}>
                      Annuler
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pickerPrimaryButton}
                    activeOpacity={0.8}
                    onPress={handleConfirmTime}
                  >
                    <Text style={styles.pickerPrimaryButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}