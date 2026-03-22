import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import MainTabs from "./MainTabs";

import DriverTabs from "./DriverTabs";

import DriverProfileScreen from "../screens/DriverProfileScreen";
import DriverInformationsScreen from "../screens/DriverInformationsScreen";
import UpdateDriverInfoScreen from "../screens/UpdateDriverInfoScreen";
import DriverVehiculeScreen from "../screens/DriverVehiculeScreen";
import DriverDocumentsScreen from "../screens/DriverDocumentsScreen";
import DriverEvaluationsScreen from "../screens/DriverEvaluationsScreen";
import DriverPayoutsScreen from "../screens/DriverPayoutsScreen";

import CreateRideScreen from "../screens/CreateRideScreen";
import DriverQrScannerScreen from "../screens/DriverQrScannerScreen";
import DriverTripTrackingScreen from "../screens/DriverTripTrackingScreen";
import DriverRateScreen from "../screens/DriverRateScreen";

import ProfileScreen from "../screens/ProfileScreen";
import PassengerSearchScreen from "../screens/PassengerSearchScreen";
import PassengerSearchResultsScreen from "../screens/PassengerSearchResultsScreen";

import PassengerQRScreen from "../screens/PassengerQRScreen";
import PassengerTripTrackingScreen from "../screens/PassengerTripTrackingScreen";
import PassengerRateScreen from "../screens/PassengerRateScreen";

import PassengerInformationsScreen from "../screens/PassengerInformationsScreen";
import UpdatePassengerInfoScreen from "../screens/UpdatePassengerInfoScreen";
import PassengerEvaluationsScreen from "../screens/PassengerEvaluationsScreen";
import PassengerPaymentsScreen from "../screens/PassengerPaymentsScreen";

import PaymentScreen from "../screens/PaymentScreen";
import AddDefaultCardScreen from "../screens/AddDefaultCardScreen";
import PayWithNewCardScreen from "../screens/PayWithNewCardScreen";

import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen";



const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen name="DriverTabs" component={DriverTabs} />

      <Stack.Screen name="DriverProfile" component={DriverProfileScreen} />

<Stack.Screen 
  name="DriverInformations" 
  component={DriverInformationsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="UpdateDriverInfo"
  component={UpdateDriverInfoScreen}
/>
      
   <Stack.Screen 
  name="DriverVehicule" 
  component={DriverVehiculeScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen 
  name="DriverDocuments" 
  component={DriverDocumentsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen 
  name="DriverEvaluations" 
  component={DriverEvaluationsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen 
  name="DriverPayouts" 
  component={DriverPayoutsScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen name="CreateRide" component={CreateRideScreen} />

<Stack.Screen name="DriverQrScanner" component={DriverQrScannerScreen} />

<Stack.Screen name="DriverTripTracking" component={DriverTripTrackingScreen} />

<Stack.Screen name="DriverRate" component={DriverRateScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen
        name="PassengerInformations"
        component={PassengerInformationsScreen}
      />
      <Stack.Screen
        name="UpdatePassengerInfo"
        component={UpdatePassengerInfoScreen}
      />
      <Stack.Screen
        name="PassengerSearch"
        component={PassengerSearchScreen}
      />
      <Stack.Screen
        name="PassengerSearchResults"
        component={PassengerSearchResultsScreen}
      />
      <Stack.Screen
        name="PassengerEvaluations"
        component={PassengerEvaluationsScreen}
      />
        <Stack.Screen
        name="PassengerPayments"
        component={PassengerPaymentsScreen}
      />
      

      <Stack.Screen name="Payment" component={PaymentScreen} />
<Stack.Screen name="AddDefaultCard" component={AddDefaultCardScreen} />
<Stack.Screen name="PayWithNewCard" component={PayWithNewCardScreen} />
<Stack.Screen name="PassengerQR" component={PassengerQRScreen} />
<Stack.Screen name="PassengerTripTracking" component={PassengerTripTrackingScreen} />
 <Stack.Screen name="PassengerRate" component={PassengerRateScreen} />

 <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />

    </Stack.Navigator>
  );
}