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
  const user = useSelector((state) => state.user.value);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = useCallback(async () => {
    try {
      if (!user?.token || !API_URL) {
        setUnreadCount(0);
        return;
      }

      const response = await fetch(`${API_URL}/messages/unread-count/${user.token}`);
      const data = await response.json();

      if (data.result) {
        setUnreadCount(data.unreadCount || 0);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      console.log("Erreur unread count :", error);
      setUnreadCount(0);
    }
  }, [user?.token]);

  useFocusEffect(
    useCallback(() => {
      loadUnreadCount();
    }, [loadUnreadCount])
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#8B2332",
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
        tabBarIcon: ({ color, size }) => {
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
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}