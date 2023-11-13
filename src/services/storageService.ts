import {IFanInfo} from '../types/appState';
import {CounterType, FavoriteFansType} from '../types/asyncStorage';
import {StorageKeys} from '../types/enums/AsyncStorageEnums';
import {CountersTypeEnums} from '../types/enums/CountresTypeEnums';
import storage from './storage';

const getFavoriteFans = async (): Promise<FavoriteFansType[]> => {
  const favoriteFansString = await storage.getItem(StorageKeys.favoriteFans);
  return favoriteFansString || [];
};

const getCounters = async (): Promise<CounterType[]> => {
  const countersString = await storage.getItem(StorageKeys.counters);
  return countersString || [];
};

const clearStorage = async () => {
  storage.removeItem(StorageKeys.favoriteFans);
  storage.removeItem(StorageKeys.counters);
};

const updateStorage = async ({name, type, favorite}: IFanInfo) => {
  const counterType =
    type !== CountersTypeEnums.male && type !== CountersTypeEnums.female
      ? CountersTypeEnums.other
      : type;

  const favoriteFanNames = await getFavoriteFans();
  const counters = await getCounters();

  const isFavoriteFan = favoriteFanNames.includes(name);
  const isStorageCounter = counters.some(
    counter => counter.type === counterType,
  );

  const updateFans = isFavoriteFan
    ? favoriteFanNames.filter(fanName => fanName !== name)
    : [...favoriteFanNames, name];

  const updateCounters = isStorageCounter
    ? counters.map(counter => {
        const shouldUpdateCounter =
          counter.type === type ||
          (type !== CountersTypeEnums.male &&
            type !== CountersTypeEnums.female &&
            counter.type === CountersTypeEnums.other);

        if (shouldUpdateCounter) {
          counter.count += favorite ? -1 : 1;
        }
        return counter;
      })
    : [...counters, {type: counterType, count: 1}];

  storage.setItem(StorageKeys.favoriteFans, updateFans);
  storage.setItem(StorageKeys.counters, updateCounters);
};

const storageService = {
  getFavoriteFans,
  getCounters,
  clearStorage,
  updateStorage,
};

export default storageService;
