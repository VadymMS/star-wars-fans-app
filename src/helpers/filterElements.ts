import {IFan} from '../types/appState';
import {Nullable} from '../types/utility';

export const filterElements = (
  elements: Array<IFan>,
  value: Nullable<string>,
): Array<IFan> | [] => {
  if (!elements.length) {
    return [];
  }

  if (!value?.trim()) {
    return elements;
  }

  return elements.filter(element =>
    element.name?.toLowerCase().includes(value.toLowerCase().trim()),
  );
};
