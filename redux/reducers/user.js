import { createSlice } from "@reduxjs/toolkit"; //createSlice, facon de creer un etat, des actions, un reducer

const initialState = { //l’état de départ du user, quand l'app demarre l'utilisateur est vide mais j'ai la structure de ce que j'attends de Redux
  value: {
    token: null,
    _id: null,
    prenom: null,
    nom: null,
    email: null,
    telephone: null,
    profilePhoto: null,
    isConnected: false,

    car: null,

    driverProfile: {
      driverLicenseUrl: null,
      identityDocumentUrl: null,
      insuranceDocumentUrl: null,
      isProfileComplete: false,
      isVerified: false,
    },

    stripeCustomerId: null,
    defaultPaymentMethodId: null,
  },
};

export const userSlice = createSlice({  //crée la slice Redux appelée user, tranche de mon store global
  name: "user",
  initialState,
  reducers: {  
    //reducer login
    login: (state, action) => {
      state.value.token = action.payload.token || null; //Si une donnée n’existe pas, je mets null au lieu de laisser une valeur bizarre
      state.value._id = action.payload._id || null;
      state.value.prenom = action.payload.prenom || null;
      state.value.nom = action.payload.nom || null;
      state.value.email = action.payload.email || null;
      state.value.telephone = action.payload.telephone || null;
      state.value.profilePhoto = action.payload.profilePhoto || null;
      state.value.isConnected = true;

      state.value.car = action.payload.car || null;

      state.value.driverProfile = action.payload.driverProfile || {
        driverLicenseUrl: null,
        identityDocumentUrl: null,
        insuranceDocumentUrl: null,
        isProfileComplete: false,
        isVerified: false,
      };

      state.value.stripeCustomerId = action.payload.stripeCustomerId || null;
      state.value.defaultPaymentMethodId =
        action.payload.defaultPaymentMethodId || null;
    },    //Quand l’utilisateur se connecte, je remplis Redux avec toutes ses données

    //reducer logout, remet tout a zero, reinitialise l'etat
    logout: (state) => {
      state.value.token = null;
      state.value._id = null;
      state.value.prenom = null;
      state.value.nom = null;
      state.value.email = null;
      state.value.telephone = null;
      state.value.profilePhoto = null;
      state.value.isConnected = false;

      state.value.car = null;

      state.value.driverProfile = {
        driverLicenseUrl: null,
        identityDocumentUrl: null,
        insuranceDocumentUrl: null,
        isProfileComplete: false,
        isVerified: false,
      };

      state.value.stripeCustomerId = null;
      state.value.defaultPaymentMethodId = null;
    },

    //reducer updateProfilePhoto
    updateProfilePhoto: (state, action) => {   //Mets à jour uniquement la photo de profil dans Redux
      state.value.profilePhoto = action.payload;
    },

    addCar: (state, action) => {
      state.value.car = action.payload;
    },

    removeCar: (state) => {
      state.value.car = null;
    },

    updateDriverProfile: (state, action) => {
      state.value.car = action.payload.car;
      state.value.driverProfile = action.payload.driverProfile;
    },

    updateStripePaymentMethod: (state, action) => {
      state.value.stripeCustomerId = action.payload.stripeCustomerId;
      state.value.defaultPaymentMethodId =
        action.payload.defaultPaymentMethodId;
    },

    updateUserInfos: (state, action) => {   //Mettre à jour certaines infos utilisateur sans écraser celles qui ne changent pas
      state.value.prenom = action.payload.prenom ?? state.value.prenom;
      state.value.nom = action.payload.nom ?? state.value.nom;
      state.value.email = action.payload.email ?? state.value.email;
      state.value.telephone =
        action.payload.telephone ?? state.value.telephone;
    },    //prends la nouvelle valeur si y en a une sinon garder l'ancienne
  },
});

export const {   //export de toutes les actions pour pouvoir les utiliser dans les ecrans avec par ex : dispatch(login(userData))
  login,
  logout,
  updateProfilePhoto,
  addCar,
  removeCar,
  updateDriverProfile,
  updateStripePaymentMethod,
  updateUserInfos,
} = userSlice.actions;

export default userSlice.reducer;   //exporte le reducer pour le brancher dans store.js