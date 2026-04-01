import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./redux/store";
import RootNavigator from "./navigation/RootNavigator";
import { login } from "./redux/reducers/user";

function AppContent() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(login(parsedUser));
        }
      } catch (error) {
      } finally {
        setIsReady(true);
      }
    };

    hydrateUser();
  }, [dispatch]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" color="#8B2332" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      urlScheme="buzz"
    >
      <Provider store={store}>
        <AppContent />
      </Provider>
    </StripeProvider>
  );
}