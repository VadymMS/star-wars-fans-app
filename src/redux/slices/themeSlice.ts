import {createSlice} from '@reduxjs/toolkit';
import {IThemeState} from '../../types/appState';

const initialState: IThemeState = {
  isDarkTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const {setDarkTheme} = themeSlice.actions;

export default themeSlice.reducer;
