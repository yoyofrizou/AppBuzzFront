import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

import store from "./redux/store";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
   console.log(
    "EXPO PUBLIC STRIPE KEY =",
    process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      urlScheme="buzz">
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
    </StripeProvider>
  );
}