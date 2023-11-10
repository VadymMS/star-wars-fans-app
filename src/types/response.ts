import {IFan} from './appState';
import {CounterType} from './asyncStorage';
import {Nullable} from './utility';

export interface IResponse {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: Array<IFan>;
  storageCounters: Array<CounterType>;
}
