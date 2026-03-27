import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedRides: [],
  searchParams: null,
  selectedRide: null,
  driverRides: [],
  passengerBookings: [],
};

export const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setSearchedRides: (state, action) => {
      state.searchedRides = action.payload || [];
    },

    clearSearchedRides: (state) => {
      state.searchedRides = [];
    },

    setSearchParams: (state, action) => {
      state.searchParams = action.payload || null;
    },

    clearSearchParams: (state) => {
      state.searchParams = null;
    },

    setSelectedRide: (state, action) => {
      state.selectedRide = action.payload || null;
    },

    clearSelectedRide: (state) => {
      state.selectedRide = null;
    },

    setDriverRides: (state, action) => {
      state.driverRides = action.payload || [];
    },

    clearDriverRides: (state) => {
      state.driverRides = [];
    },

    setPassengerBookings: (state, action) => {
      state.passengerBookings = action.payload || [];
    },

    clearPassengerBookings: (state) => {
      state.passengerBookings = [];
    },

    addPassengerBooking: (state, action) => {
      if (action.payload) {
        state.passengerBookings.unshift(action.payload);
      }
    },

    updatePassengerBooking: (state, action) => {
      const updatedBooking = action.payload;

      if (!updatedBooking?._id) return;

      state.passengerBookings = state.passengerBookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      );
    },

    removePassengerBooking: (state, action) => {
      const bookingId = action.payload;

      state.passengerBookings = state.passengerBookings.filter(
        (booking) => booking._id !== bookingId
      );
    },

    resetRidesState: () => initialState,
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
  resetRidesState,
} = ridesSlice.actions;

export default ridesSlice.reducer;