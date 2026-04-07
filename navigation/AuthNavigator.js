import { createNativeStackNavigator } from "@react-navigation/native-stack";
//cree une navigation en pile native

import HomeScreen from "../screens/HomeScreen";
import ConnexionScreen from "../screens/ConnexionScreen";
import InscriptionScreen from "../screens/InscriptionScreen";

const Stack = createNativeStackNavigator();  //cree le navigateur stack

export default function AuthNavigator() {   //cree le composant qui gere le flow Auth
  {/*masque le header natif par défaut
  déclares les écrans accessibles dans ce flow*/}
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>  
      <Stack.Screen name="Home" component={HomeScreen} />   
      <Stack.Screen name="Connexion" component={ConnexionScreen} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
    </Stack.Navigator>
  );
}

//parcours quand l’utilisateur n’est pas connecté, 3 grands etats : accueil, connexion, inscription