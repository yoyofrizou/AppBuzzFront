import { configureStore } from "@reduxjs/toolkit";  //importe la fonction qui permet de créer ton store Redux
import userReducer from "./reducers/user";   //importe les deux “morceaux” de ta mémoire
import ridesReducer from "./reducers/rides";

export default configureStore({  //cree le store global
  reducer: {   //2 grandes parties, donc dans toute mon app, je peux lire state.user et state.rides 
  user: userReducer,    //le reducer c est le gardien d'un tiroir de la grande boite, je peux lui dire par ex : connecte l'utilisateur
  rides: ridesReducer,  //
}
});

//boite centrale principale qui dit dans mon Redux je vais avoir plusieurs parties de memoire, ici : user et rides
//le reducer definti l'etat de depart et les actions possibles pour le modifier