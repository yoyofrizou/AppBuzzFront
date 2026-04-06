import React, { useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import PassengerHomeScreen from "../screens/PassengerHomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import PassengerTripsScreen from "../screens/PassengerTripsScreen";

const Tab = createBottomTabNavigator();
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MainTabs() {
  const user = useSelector((state) => state.user.value);  //recup l utilisateur connecte depuis redux (token pour charger les messages non lus)
  const [unreadCount, setUnreadCount] = useState(0);  //stocke le badge de messages non lus

  const loadUnreadCount = useCallback(async () => {  //appelle le backend pour récupérer le compteur de non-lus
    try {                 //useCallback pour eviter le recreations inutiles
      if (!user?.token || !API_URL) {
        setUnreadCount(0);
        return;   //protege le code si pas d utilisateur et pas d url backend
      }

      const response = await fetch(`${API_URL}/messages/unread-count/${user.token}`);
      const data = await response.json();   //recup le nombre de conversations non lues 

      if (data.result) {   //mise a jour du badge, garde toujours un état cohérent
        setUnreadCount(data.unreadCount || 0);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
     
      setUnreadCount(0);
    }
  }, [user?.token]);

  useFocusEffect(    //recharge le compteur quand cette navigation reprend le focus
    useCallback(() => {   //car le badge de messages doit être mis à jour quand on revient sur l’espace principal
      loadUnreadCount();
    }, [loadUnreadCount])
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({  //définir les options globales de tes onglets
        lazy: true,   //écran montés qu’au moment où on les ouvre
        headerShown: false,   //je ne veux pas les headers automatiques sur tes tabs
        tabBarActiveTintColor: "#8B2332",   //différencie visuellement l’onglet actif de l’inactif
        tabBarInactiveTintColor: "#8A8A8A",
        tabBarStyle: {
          height: 85,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          alignSelf: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
        },
        tabBarIcon: ({ color, size }) => {   //associes une icône à chaque onglet selon son nom
          if (route.name === "PassengerHome") {
            return <Ionicons name="home" size={size} color={color} />;
          }

          if (route.name === "PassengerTrips") {
            return (
              <MaterialCommunityIcons
                name="road-variant"
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "Messages") {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={size}
                color={color}
              />
            );
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name="PassengerHome"
        component={PassengerHomeScreen}
        options={{ tabBarLabel: "Accueil" }}
      />
      <Tab.Screen
        name="PassengerTrips"
        component={PassengerTripsScreen}
        options={{ tabBarLabel: "Trajets" }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,  //undefined pour ne pas afficher de badge quand il n y a rien de non lu
        }}
      />
    </Tab.Navigator>
  );
}

//espace principal du passager, accueil trajets et messages
//navigateur mais aussi petit composant intelligent (gere message non lus)
//des tabs ici car un onglet c est parfait pour les zones principales d une app