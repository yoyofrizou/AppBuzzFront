import { registerRootComponent } from 'expo';

import App from './App';

// point d'entree expo, ici expo demande quel composant lancer au démarrage et ca repond que le composant racine est app
//index.js n’a pas à contenir de logique métier, il sert juste à brancher l’application au runtime Expo.
registerRootComponent(App);
