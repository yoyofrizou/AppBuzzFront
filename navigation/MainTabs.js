import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import PassengerHomeScreen from "../screens/PassengerHomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import PassengerTripsScreen from "../screens/PassengerTripsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
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
      <Tab.Screen name="PassengerHome" component={PassengerHomeScreen} />
      <Tab.Screen name="PassengerTrips" component={PassengerTripsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}

