import 'react-native-get-random-values';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponse} from '../../types/response';
import {IFan} from '../../types/appState';
import {v4 as uuidv4} from 'uuid';
import storageFansService from '../../Services/storageFansService';
import {get} from '../../Services/fetch';

export const loadFans = createAsyncThunk(
  'fans/getFans',
  async (url: string): Promise<IResponse> => {
    const fans = await get(url);
    const favoriteFanNames = await storageFansService.getFavoriteFans();
    const storageCounters = await storageFansService.getCounters();

    fans.data.results = fans.data.results.map((fan: IFan) => {
      const id = uuidv4().slice(0, 8);
      const favorite = favoriteFanNames.includes(fan.name);
      return {...fan, favorite, id};
    });

    fans.data.storageCounters = storageCounters;

    return fans.data;
  },
);
