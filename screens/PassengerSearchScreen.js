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
import Slider from "@react-native-community/slider"; //On importe un slider, donc une barre coulissante (pour marche acceptee)
import DateTimePicker from "@react-native-community/datetimepicker"; //Composant pour choisir une date ou une heure
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setSearchedRides, setSearchParams } from "../redux/reducers/rides"; //action Redux pour stocker les trajets trouvés, action Redux pour stocker les paramètres de recherche
import styles from "../styles/PassengerSearchStyles";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;
const EXPO_PUBLIC_MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN; //token pour appeler l’API Mapbox

const WALKING_SPEED_METERS_PER_MINUTE = 80; //considères qu’une personne marche environ 80 mètres par minute
const MAX_WALK_MINUTES = 20; //Temps de marche max autorisé par le slider

function formatDate(date) { //Transforme une date JS en texte français
  return date.toLocaleDateString("fr-FR");
}

function formatTime(date) { //Transforme l’heure en texte, ex : 14:05
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit", //affiche l heure sur deux chiffres
    minute: "2-digit", //affiche les minutes sur deux chiffres
  });
}

function formatDateTimeLabel(date) { //chaine complte date et heure
  return `${formatDate(date)} à ${formatTime(date)}`; // 08/04/2026 à 14:05
}

function minutesToMeters(minutes) { //Si tu acceptes 10 minutes à pied : 10 * 80 = 800 donc 800m ok
  return minutes * WALKING_SPEED_METERS_PER_MINUTE;
}

function mapboxFeatureToSuggestion(feature) { //prend un objet brut renvoyé par Mapbox et le transforme en format propre pour mon app
  const props = feature?.properties || {}; //feature?.properties : prend properties si feature existe sinon {}
  const coords = props?.coordinates || {}; //récupère les coordonnées si elles existent
  const fallbackGeometry = feature?.geometry?.coordinates || []; //Si props.coordinates n’existe pas, on pourra utiliser les coordonnées de geometry

  const longitude =
    typeof coords.longitude === "number" //Si coords.longitude est bien un nombre on l'utilise
      ? coords.longitude
      : fallbackGeometry[0]; //sinon on prend la première coordonnée de fallbackGeometry

  const latitude =
    typeof coords.latitude === "number"
      ? coords.latitude
      : fallbackGeometry[1];

  const label = //construit le texte lisible de l’adresse
    props.full_address || //Si props.full_address existe on l'utilise
    [props.name_preferred || props.name, props.place_formatted] //sinon tableau
      .filter(Boolean) //supp les valeurs vides / null / undefined
      .join(", "); //assemble en chaine avec virgule

  return { //objet simple
    id: feature.id || props.mapbox_id || String(Math.random()),
                                          //solution de secours pour fabriquer un id si aucun n’existe
    label,
    latitude,
    longitude,
  };
}

function SliderBlock({ title, value, onChange, max = MAX_WALK_MINUTES }) { //composant réutilisable pour afficher un slider
       //  max car on calcul le ration pour savoir ou mettre le point, max c est 20, imaginons que je mette 10 minutes donc ration 10/20 = 0,5 donc le bouton est a 50% soit au milieu
       //ici comme on a mis une valeur par defaut plus haut si jamais on a pas de max on utilise cette valeur par defaut
  const [sliderWidth, setSliderWidth] = useState(0); //On stocke la largeur du slider pour calculer la position du badge

  const badgeLeft = useMemo(() => { //calcule la position horizontale du badge qui affiche : X min à pied (~Y m)
    if (!sliderWidth) return 0; //Tant qu’on ne connaît pas la largeur, on met le badge à gauche

    const ratio = value / max; //const ratio = value / max;
    const thumbOffset = 14; //curseur
    const badgeWidth = 190; //badge
    const rawLeft = ratio * (sliderWidth - thumbOffset * 2); //On convertit le ratio en position en pixels
    const centered = rawLeft - badgeWidth / 2 + thumbOffset; //On recentre le badge au-dessus du curseur

    return Math.max(0, Math.min(centered, sliderWidth - badgeWidth)); //Ça empêche le badge de sortir à gauche ou à droite
  }, [sliderWidth, value, max]); //Le calcul sera refait seulement si une de ces valeurs change
    
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

  const [departureQuery, setDepartureQuery] = useState(""); //departureQuery = texte tapé par l'utilisateur
         //query car ce texte sert a faire une requete vers une API (mapbox)
  const [destinationQuery, setDestinationQuery] = useState("");

  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState(null); //selectedDeparture = vraie suggestion choisie avec latitude/longitude
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [pickupWalkMinutes, setPickupWalkMinutes] = useState(5);
  const [dropoffWalkMinutes, setDropoffWalkMinutes] = useState(10);

  const [departureDateTime, setDepartureDateTime] = useState(new Date()); //Par défaut : maintenant

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [tempDate, setTempDate] = useState(new Date()); //On stocke temporairement la date/heure choisie dans le picker avant validation finale.
  const [tempTime, setTempTime] = useState(new Date());

  const [loadingSearch, setLoadingSearch] = useState(false); //Recherche principale en cours ou non.
  const [loadingDepartureSuggestions, setLoadingDepartureSuggestions] =
    useState(false);
  const [loadingDestinationSuggestions, setLoadingDestinationSuggestions] =
    useState(false);

  const [showDepartureSuggestions, setShowDepartureSuggestions] = //Booléens pour afficher ou cacher les listes de suggestions
    useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);

  const departureRequestIdRef = useRef(0); //useRef pour l’ordre des requêtes, servent à ignorer les réponses obsolètes
  const destinationRequestIdRef = useRef(0);

  const fetchMapboxSuggestions = async ({ //Fonction réutilisable pour charger des suggestions Mapbox
    query,
    setSuggestions,
    setLoading,
    requestIdRef,
    currentRequestId,
  }) => {
    if (!EXPO_PUBLIC_MAPBOX_TOKEN) { //Si pas de token : pas de suggestions
      setSuggestions([]);
      return;
    }

    if (!query || query.trim().length < 3) { //si requete vide ou moins de 3 caracteres alors on ne cherche pas 
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true); //Active le spinner de suggestions

      const url =
        `https://api.mapbox.com/search/geocode/v6/forward` + //URL de recherche d’adresse.
        `?q=${encodeURIComponent(query.trim())}` + //q= : texte recherché et encodeURIComponent(...) protège le texte dans une URL.
        `&access_token=${encodeURIComponent(EXPO_PUBLIC_MAPBOX_TOKEN)}` + //token Mapbox
        `&autocomplete=true` + //suggestions pendant la saisie
        `&limit=5` +
        `&language=fr` +
        `&country=FR` +
        `&types=address,street,place,locality,neighborhood`;

      const response = await fetch(url); //Envoi vers Mapbox puis lecture JSON
      const data = await response.json();

      if (currentRequestId !== requestIdRef.current) { // Si la réponse reçue ne correspond plus à la dernière requête lancée on ignore
        return;
      }

      const mapped = (data?.features || []) //prend le tableau features ou un tableau vide.
        .map(mapboxFeatureToSuggestion) //transforme chaque feature brute en suggestion propre
        .filter( //garde seulement les suggestions valides :
          (item) =>
            item && //existe
            item.label && //a un label
            typeof item.latitude === "number" && //une lat
            typeof item.longitude === "number" //une long
        );

      setSuggestions(mapped); //enregistre les suggestions dans le bon state
    } catch (error) {
      setSuggestions([]); // si erreur on vide les suggestions
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false); //coupe le chargement uniquement si on traite toujours la bonne requête
      }
    }
  };

  useEffect(() => {
    if (!showDepartureSuggestions) return; //Si la liste n’est pas censée être visible, on ne fait rien

    const timer = setTimeout(() => { //On attend un peu avant de lancer la requête
      departureRequestIdRef.current += 1; //On incrémente l’id de requête
      const requestId = departureRequestIdRef.current;

      fetchMapboxSuggestions({ //lance la recherche des suggestions départ
        query: departureQuery,
        setSuggestions: setDepartureSuggestions,
        setLoading: setLoadingDepartureSuggestions,
        requestIdRef: departureRequestIdRef,
        currentRequestId: requestId,
      });
    }, 350); //Attente 350 ms après la frappe

    return () => clearTimeout(timer); //annule le timer précédent si l’utilisateur retape vite
  }, [departureQuery, showDepartureSuggestions]); //et se relance si l un ou l autre change

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

  const selectDeparture = (item) => { //Quand l’utilisateur clique sur une suggestion départ :
    setSelectedDeparture(item); //on garde l objet complet
    setDepartureQuery(item.label); //on met le texte de l’input avec le label
    setDepartureSuggestions([]); //on vide la liste
    setShowDepartureSuggestions(false); //on ferme la liste
  };

  const selectDestination = (item) => { //pareil
    setSelectedDestination(item);
    setDestinationQuery(item.label);
    setDestinationSuggestions([]);
    setShowDestinationSuggestions(false);
  };

  const openDatePicker = () => { //on copie la date actuelle dans tempDate
    setTempDate(new Date(departureDateTime));  //et on ouvre la modale
    setShowDatePicker(true);
  };

  const openTimePicker = () => { //pareil
    setTempTime(new Date(departureDateTime)); 
    setShowTimePicker(true);
  };

  const handleConfirmDate = () => { //On part de la date/heure actuelle sélectionnée.
    const updated = new Date(departureDateTime);

    updated.setFullYear(  //on remplace :
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );

    setDepartureDateTime(updated); //On enregistre la nouvelle date finale et on ferme la modale.
    setShowDatePicker(false);
  };

  const handleConfirmTime = () => { //On repart encore de la date actuelle
    const updated = new Date(departureDateTime);

    updated.setHours(tempTime.getHours(), tempTime.getMinutes(), 0, 0); //on remplace, heure, minute, seconde et milliseconde

    setDepartureDateTime(updated); //enregistre et ferme la modale
    setShowTimePicker(false);
  };

  const handleSearch = async () => { //LA grosse fonction de recherche.
    if (!EXPO_PUBLIC_API_URL) { //Si l’URL backend manque, on stoppe.
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_API_URL est manquant dans le fichier .env."
      );
      return;
    }

    if (!EXPO_PUBLIC_MAPBOX_TOKEN) { //pareil mapbox
      Alert.alert(
        "Erreur",
        "EXPO_PUBLIC_MAPBOX_TOKEN est manquant dans le fichier .env."
      );
      return;
    }

    if (!departureQuery.trim() || !destinationQuery.trim()) { //si champs vide on bloque
      Alert.alert(
        "Erreur",
        "Merci de renseigner l’adresse de départ et d’arrivée."
      );
      return;
    }

    if (!selectedDeparture || !selectedDestination) { //même si l’utilisateur a tapé du texte, il doit avoir cliqué une suggestion
      Alert.alert(
        "Erreur",
        "Merci de sélectionner le départ et l’arrivée dans les suggestions."
      ); //Parce qu’il faut les coordonnées réelles
      return;
    }

    try {
      setLoadingSearch(true);

      Keyboard.dismiss(); //Nettoie l’interface avant recherche
      setShowDepartureSuggestions(false);
      setShowDestinationSuggestions(false);

      const payload = { //Création du payload, objet complet de recherche
        departure: departureQuery.trim(),
        destination: destinationQuery.trim(),
        dateTime: departureDateTime.toISOString(), //convertit en format date standard API.
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

      dispatch(setSearchParams(payload)); //garder la recherche dans le store

      const params = new URLSearchParams({ //Création des query params URL, prépare les paramètres à mettre dans l’URL
        departure: payload.departure,
        destination: payload.destination,
        dateTime: payload.dateTime,
        pickupWalkMinutes: String(payload.pickupWalkMinutes), //On convertit plusieurs valeurs en chaînes avec String(...) car les paramètres URL sont du texte.
        dropoffWalkMinutes: String(payload.dropoffWalkMinutes),
        departureLat: String(payload.departureCoordinates.latitude),
        departureLng: String(payload.departureCoordinates.longitude),
        destinationLat: String(payload.destinationCoordinates.latitude),
        destinationLng: String(payload.destinationCoordinates.longitude),
      });

      const response = await fetch( //Appel GET sur l’endpoint de recherche
        `${EXPO_PUBLIC_API_URL}/rides/search?${params.toString()}` //transforme l’objet URLSearchParams en chaîne URL
      );

      const data = await response.json(); //rep back

      if (!response.ok || !data.result) { //si code HTTP pas bon alors false
        dispatch(setSearchedRides([])); //vide trajets redux
        Alert.alert(
          "Aucun trajet",
          data?.error || data?.message || "Aucun trajet trouvé."
        );
        return;
      }

      dispatch(setSearchedRides(data.rides || [])); //si good alors stock trajets dans redux
      navigation.navigate("PassengerSearchResults"); //navigue vers ecran resultat
    } catch (error) {
     
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

  const renderSuggestionItem = (item, onPress) => ( //Fonction qui retourne une suggestion d’adresse
    //quand on clique, on appelle selectDeparture(item) ou selectDestination(item)
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