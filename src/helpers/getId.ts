import {Nullable} from '../types/utility';

export const getId = (url: Nullable<string>): string => {
  if (!url) {
    return '';
  }
  const urlParts = url.split('/').filter(Boolean);
  return urlParts[urlParts.length - 1];
};
