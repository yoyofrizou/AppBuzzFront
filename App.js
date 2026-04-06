import "react-native-gesture-handler";  //la navigation et certains gestes en dépendent
import { useEffect, useState } from "react";   //import de deux hooks React : pour stocker un etat local et pour executer une logique au montage du composant
import { View, ActivityIndicator } from "react-native";   //import des composants natifs : conteneur visuel et spinner de chargement
import { SafeAreaProvider } from "react-native-safe-area-context";   //Sur mobile, on ne veut pas que le contenu soit caché sous l’encoche ou la barre du haut
import { NavigationContainer } from "@react-navigation/native";   //conteneur principal de React Navigation, sans alors la navigation ne fonctionnerait pas
import { Provider, useDispatch } from "react-redux";  //povide rend Redux disponible dans toute l’application et useDispatch permet d'envoyer une action Redux
import { StripeProvider } from "@stripe/stripe-react-native";  //parce que stripe doit etre dispo
import AsyncStorage from "@react-native-async-storage/async-storage";  //tockge local persistant sur le tel

import store from "./redux/store"; //store redux global
import RootNavigator from "./navigation/RootNavigator"; //point central de navigation
import { login } from "./redux/reducers/user"; //action Redux qui remet l’utilisateur dans l’état global

function AppContent() {   
  const dispatch = useDispatch();   //récupère la fonction Redux pour envoyer des actions, pour pouvoir faire dispatch(login(parsedUser))
  const [isReady, setIsReady] = useState(false); //crée un état local isReady, devient true quand la restauration utilisateur est terminée 
                          //empêche l’application d’afficher la navigation trop tôt

  useEffect(() => {   //s’exécute au montage du composant
    const hydrateUser = async () => {  //fonction asynchrone pour restaurer l’utilisateur
      try {                           //Parce que useEffect lui-même ne peut pas être directement async donc je cree une fonction
        const storedUser = await AsyncStorage.getItem("user");  //cherche si il y a un utilisateur sauvegarde dans le tel

        if (storedUser) {  //si un user est trouve alors :
          const parsedUser = JSON.parse(storedUser);  //on le transforme depuis le json text en objet js
          dispatch(login(parsedUser)); //je le remets dans redux avec login
        }   //je restaure la session sans refaire un login
      } catch (error) {   //vide donc je pourrai logger l erreur mais la je ne l ai pas fait 
      } finally {  //pour garantir que l’application démarre même si la restauration locale échoue
        setIsReady(true);  //meme si il y a une erreur comme ca l appli ne reste pas bloquee 
      }
    };

    hydrateUser(); //lances la fonction une seule fois au démarrage
  }, [dispatch]); //dépendance React

  if (!isReady) {   //Tant que l’application n’est pas prête, tu affiches un loader centré
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

  return (   //Rendu principal d’AppContent
    <SafeAreaProvider>  {/*active la gestion safe area*/}
      <NavigationContainer>  {/*monte la navigation, entoure la navigation*/}
        <RootNavigator /> {/*affiche le navigateur racine, la navigation entour les ecrans*/}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {   //le composant racine exporte
  return (
    <StripeProvider   //initialise stripe pour toute l'app
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      urlScheme="buzz"
    >
      <Provider store={store}> 
        <AppContent /> 
      </Provider>
    </StripeProvider>
  );
}


//app installe les grands providers : stripe redux et la navigation/ initialisation globale
//AppContent AppContent utilise useDispatch, donc il doit être enfant du Provider gere la restauration utilisatuer, l'ecran de chargement, la navigation et la safe area / logique de demarrage applicatif 