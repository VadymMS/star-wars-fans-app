import {ICounter} from '../types/appState';
import {CounterType} from '../types/asyncStorage';

export const updateCounters = (
  counters: ICounter[],
  storageCounters: CounterType[],
): ICounter[] => {
  if (storageCounters.length === 0) {
    return counters;
  }

  return counters.map(counter => {
    const matchingCounter = storageCounters.find(
      storageCounter => storageCounter.type === counter.type,
    );
    return matchingCounter
      ? {...counter, count: matchingCounter.count}
      : counter;
  });
};
