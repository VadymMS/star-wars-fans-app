import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFansState} from '../../types/appState';
import {loadFans} from '../services/asyncThunk';
import {IResponse} from '../../types/response';
import {CountersTypeEnums} from '../../types/enums/CountresTypeEnums';
import {updateCounters} from '../../helpers/updateCounters';

const initialState: IFansState = {
  allFans: [],
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
      const {name, type, favorite} = action.payload;

      const AllFans = state.allFans.map(fan => {
        if (fan.name === name) {
          fan.favorite = !fan.favorite;
        }
        return fan;
      });

      const counters = state.counters.map(counter => {
        const shouldUpdateCounter =
          counter.type === type ||
          (type !== CountersTypeEnums.male &&
            type !== CountersTypeEnums.female &&
            counter.type === CountersTypeEnums.other);

        if (shouldUpdateCounter) {
          counter.count += favorite ? -1 : 1;
        }
        return counter;
      });

      state.allFans = AllFans;
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
    },
    toggleLoading: state => {
      state.loading = !state.loading;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      loadFans.fulfilled,
      (state, action: PayloadAction<IResponse>) => {
        const {count, next, previous, results, storageCounters} =
          action.payload;
        const counters = updateCounters(state.counters, storageCounters);

        state.allFans = results;
        state.countPages = count;
        state.nextPage = next;
        state.previousPage = previous;
        state.loading = false;
        state.counters = counters;
      },
    );
  },
});

export const {toggleFavorite, clearFans, toggleLoading} = fansSlice.actions;

export default fansSlice.reducer;
