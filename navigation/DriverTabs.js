import React, { useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

import DriverHomeScreen from "../screens/DriverHomeScreen";
import DriverTripsScreen from "../screens/DriverTripsScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Tab = createBottomTabNavigator();
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function DriverTabs() {
  const user = useSelector((state) => state.user.value);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = useCallback(async () => {
    try {
      if (!user?.token || !API_URL) {
        setUnreadCount(0);
        return;
      }

      const response = await fetch(
        `${API_URL}/messages/unread-count/${user.token}`
      );
      const data = await response.json();

      if (data.result) {
        setUnreadCount(data.unreadCount || 0);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      console.log("Erreur unread count driver :", error);
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
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: "#8B2332",
        tabBarInactiveTintColor: "#8A8A8A",
        tabBarStyle: {
          height: 85,
          paddingBottom: 20,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            style={[
              props.style,
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        ),
        tabBarIconStyle: {
          alignSelf: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "DriverHome") {
            return <Ionicons name="home" size={size} color={color} />;
          }

          if (route.name === "DriverTrips") {
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
        name="DriverHome"
        component={DriverHomeScreen}
        options={{ tabBarLabel: "Accueil" }}
      />
      <Tab.Screen
        name="DriverTrips"
        component={DriverTripsScreen}
        options={{ tabBarLabel: "Trajets" }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#8B2332",
            color: "#fff",
            fontSize: 11,
            minWidth: 18,
            height: 18,
          },
        }}
      />
    </Tab.Navigator>
  );
}