import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedRides: [],   //resultats de recherche
  searchParams: null,  //parametres utilises pour la recherche
  selectedRide: null,  //trajet que l'utilisateur a choisi
  driverRides: [],    //trajets du conducteur
  passengerBookings: [],   //resa du passager
  unreadMessagesCount: 0,   //compteur de messages non lus
};

export const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setSearchedRides: (state, action) => {   //enregistre les trajets trouves
      state.searchedRides = action.payload || [];
    },

    clearSearchedRides: (state) => {    //vider les resultats
      state.searchedRides = [];
    },

    setSearchParams: (state, action) => {  //Garder ou vider les paramètres de recherche, revenir sur un ecran avec les criteres connus
      state.searchParams = action.payload || null;
    },

    clearSearchParams: (state) => {  
      state.searchParams = null;
    },

    setSelectedRide: (state, action) => {  //Conserver le trajet choisi pour plusieurs écrans
      state.selectedRide = action.payload || null;
    },

    clearSelectedRide: (state) => {
      state.selectedRide = null;
    },

    setDriverRides: (state, action) => {   //Stocker les trajets du conducteur
      state.driverRides = action.payload || [];
    },

    clearDriverRides: (state) => {
      state.driverRides = [];
    },

    setPassengerBookings: (state, action) => {    //Stocker les réservations du passager
      state.passengerBookings = action.payload || [];
    },

    clearPassengerBookings: (state) => {
      state.passengerBookings = [];
    },

    addPassengerBooking: (state, action) => {  //Ajouter une nouvelle réservation au début de la liste
      if (action.payload) {
        state.passengerBookings.unshift(action.payload);
      }
    },

    updatePassengerBooking: (state, action) => {  //Mettre à jour une réservation précise
      const updatedBooking = action.payload;

      if (!updatedBooking?._id) return;

      state.passengerBookings = state.passengerBookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      );
    },

    removePassengerBooking: (state, action) => {  //retirer une resa de la liste
      const bookingId = action.payload;

      state.passengerBookings = state.passengerBookings.filter(
        (booking) => booking._id !== bookingId
      );
    },

    setUnreadMessagesCount: (state, action) => {  //Gérer le badge global des messages
      state.unreadMessagesCount = action.payload || 0;
    },

    clearUnreadMessagesCount: (state) => {
      state.unreadMessagesCount = 0;
    },

    resetRidesState: (state) => { //Tout remettre à zéro pour la partie trajets par ex quand tu te deco
      state.searchedRides = [];
      state.searchParams = null;
      state.selectedRide = null;
      state.driverRides = [];
      state.passengerBookings = [];
      state.unreadMessagesCount = 0;
    },
  },
});

export const {
  setSearchedRides,
  clearSearchedRides,
  setSearchParams,
  clearSearchParams,
  setSelectedRide,
  clearSelectedRide,
  setDriverRides,
  clearDriverRides,
  setPassengerBookings,
  clearPassengerBookings,
  addPassengerBooking,
  updatePassengerBooking,
  removePassengerBooking,
  setUnreadMessagesCount,
  clearUnreadMessagesCount,
  resetRidesState,
} = ridesSlice.actions;

export default ridesSlice.reducer;

//stocker les données de navigation et de trajet qui sont utiles dans plusieurs écrans.