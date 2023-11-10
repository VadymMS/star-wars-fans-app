import {CountersTypeEnums} from './enums/CountresTypeEnums';
import {Nullable} from './utility';

export interface IFanInfo {
  name: string;
  favorite: boolean;
  type: string;
}
export interface ICardInfo {
  name: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  films: Array<Nullable<string>>;
  starships: Array<Nullable<string>>;
  vehicles: Array<Nullable<string>>;
}

export interface IFan extends ICardInfo {
  birth_year: string;
  created: string;
  edited: string;
  gender: string;
  height: string;
  homeworld: string;
  species: Array<Nullable<string>>;
  url: string;
  favorite: boolean;
  id: string;
}

export interface ICounter {
  name: string;
  type: CountersTypeEnums;
  count: number;
  id: string;
}

export interface IFansState {
  allFans: Array<IFan> | [];
  loading: boolean;
  countPages: number;
  previousPage: Nullable<string>;
  nextPage: Nullable<string>;
  counters: Array<ICounter>;
}

export interface IStore {
  fans: IFansState;
}
