import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token || null;
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
    },

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

    updateProfilePhoto: (state, action) => {
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

    updateUserInfos: (state, action) => {
      state.value.prenom = action.payload.prenom ?? state.value.prenom;
      state.value.nom = action.payload.nom ?? state.value.nom;
      state.value.email = action.payload.email ?? state.value.email;
      state.value.telephone =
        action.payload.telephone ?? state.value.telephone;
    },
  },
});

export const {
  login,
  logout,
  updateProfilePhoto,
  addCar,
  removeCar,
  updateDriverProfile,
  updateStripePaymentMethod,
  updateUserInfos,
} = userSlice.actions;

export default userSlice.reducer;