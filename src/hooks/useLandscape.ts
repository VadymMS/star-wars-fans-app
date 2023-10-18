import {useWindowDimensions} from 'react-native';

export const useLandscape = (): boolean => {
  const {height, width} = useWindowDimensions();

  return height < width;
};
