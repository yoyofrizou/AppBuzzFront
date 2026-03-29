import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PassengerHomeScreen from "./PassengerHomeScreen";
import PassengerTripsScreen from "./PassengerTripsScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: "none" },
  }}
    >
      <Tab.Screen name="PassengerHome" component={PassengerHomeScreen} />
      <Tab.Screen name="PassengerTrips" component={PassengerTripsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}