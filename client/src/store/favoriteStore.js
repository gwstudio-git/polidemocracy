import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favData: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favData.push(action.payload.id);
    },
    removeFavorite: (state, action) => {
      // state.favData.splice(action.payload.id, 1);
      state.favData = state.favData.filter(
        (item) => item.title !== action.payload.id
      );
      console.log('remove index',action.payload.id);
    },
  },
});

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
export default favoriteSlice.reducer;