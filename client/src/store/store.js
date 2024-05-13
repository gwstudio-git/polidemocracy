import { configureStore } from "@reduxjs/toolkit"; 
import favoritesReducer from "./favoriteStore";
import userReducer from "./userstore";
export default configureStore({
  reducer: {
    favoriteItems: favoritesReducer,
    userData:userReducer
  },
});