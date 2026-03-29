import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import DriverHomeScreen from "../screens/DriverHomeScreen";
import DriverTripsScreen from "../screens/DriverTripsScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Tab = createBottomTabNavigator();

export default function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
          if (route.name === "PassengerHome") {
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
      <Tab.Screen name="DriverHome" component={DriverHomeScreen} />
      <Tab.Screen name="DriverTrips" component={DriverTripsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  );
}