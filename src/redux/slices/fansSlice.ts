import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFansState} from '../../types/appState';
import {loadFans} from '../services/asyncThunk';
import {IResponse} from '../../types/response';
import {CountersTypeEnums} from '../../types/enums/CountresTypeEnums';

const initialState: IFansState = {
  allFans: [],
  favoriteNameFans: [],
  loading: true,
  countPages: 0,
  previousPage: null,
  nextPage: null,
  counters: [
    {name: 'Female Fans', type: CountersTypeEnums.female, count: 0, id: '1'},
    {name: 'Male Fans', type: CountersTypeEnums.male, count: 0, id: '2'},
    {name: 'Others', type: CountersTypeEnums.other, count: 0, id: '3'},
  ],
};

export const fansSlice = createSlice({
  name: 'fans',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const currentFan = state.allFans.find(fan => fan.id === action.payload);
      const isFavoriteName = state.favoriteNameFans.find(
        name => name === currentFan?.name,
      );
      const indexFavoriteName = state.favoriteNameFans.findIndex(
        name => name === isFavoriteName,
      );

      const allFans = state.allFans.map(fan => {
        if (fan === currentFan) {
          fan.favorite = !fan.favorite;
        }
        return fan;
      });
      const favoriteNameFans: Array<string> = state.favoriteNameFans;

      isFavoriteName
        ? indexFavoriteName && favoriteNameFans.splice(indexFavoriteName, 1)
        : currentFan && favoriteNameFans.push(currentFan.name);

      state.allFans = allFans;
      state.favoriteNameFans = favoriteNameFans;
    },
    changeСounter: (state, action) => {
      const currentFan = state.allFans.find(fan => fan.id === action.payload);
      const isIncrement = currentFan?.favorite;

      const counters = state.counters.map(counter => {
        if (counter.type === currentFan?.gender) {
          counter.count = isIncrement ? counter.count + 1 : counter.count - 1;
        }
        if (
          currentFan?.gender !== CountersTypeEnums.male &&
          currentFan?.gender !== CountersTypeEnums.female
        ) {
          if (counter.type === CountersTypeEnums.other) {
            counter.count = isIncrement ? counter.count + 1 : counter.count - 1;
          }
        }
        return counter;
      });

      state.counters = counters;
    },
    clearFans: state => {
      const allFans = state.allFans.map(fan => {
        fan.favorite = false;
        return fan;
      });
      const counters = state.counters.map(counter => {
        counter.count = 0;
        return counter;
      });

      state.allFans = allFans;
      state.counters = counters;
      state.favoriteNameFans = [];
    },
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadFans.fulfilled,
      (state, action: PayloadAction<IResponse>) => {
        const {count, next, previous, results} = action.payload;
        const favoriteNamesFans: Array<string> = state.favoriteNameFans;

        state.allFans = favoriteNamesFans.length
          ? results.map(fan =>
              favoriteNamesFans.includes(fan.name)
                ? {...fan, favorite: true}
                : fan,
            )
          : results;
        state.countPages = count;
        state.nextPage = next;
        state.previousPage = previous;
        state.loading = false;
      },
    );
  },
});

export const {toggleFavorite, changeСounter, clearFans, toggleLoading} =
  fansSlice.actions;

export default fansSlice.reducer;
