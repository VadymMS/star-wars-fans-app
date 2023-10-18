import {IStore} from '../../types/appState';

export const selectAllFans = (state: IStore) => state.fans.allFans;
export const selectCounters = (state: IStore) => state.fans.counters;
export const selectCountPages = (state: IStore) => state.fans.countPages;
export const selectPreviousPage = (state: IStore) => state.fans.previousPage;
export const selectNextPage = (state: IStore) => state.fans.nextPage;
export const selectLoading = (state: IStore) => state.fans.loading;
