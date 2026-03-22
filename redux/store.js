import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import ridesReducer from "./reducers/rides";

export default configureStore({
  reducer: {
  user: userReducer,
  rides: ridesReducer,
}
});