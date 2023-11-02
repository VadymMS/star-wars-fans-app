import 'react-native-get-random-values';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponse} from '../../types/response';
import {get} from '../../services/fetch';
import {IFan} from '../../types/appState';
import {v4 as uuidv4} from 'uuid';

export const loadFans = createAsyncThunk(
  'fans/getFans',
  async (url: string): Promise<IResponse> => {
    const fans = await get(url);

    console.log(fans);
    fans.data.results = fans.data.results.map((fan: IFan) => {
      const id = uuidv4().slice(0, 8);
      const favorite = false;
      return {...fan, favorite, id};
    });

    return fans.data;
  },
);
