import {hasDynamicIsland, hasNotch} from 'react-native-device-info';

interface getCardWidthProps {
  index: number;
  isLandscape: boolean;
  width: (num: number) => number;
}

export const getCardWidth = ({
  index,
  isLandscape,
  width,
}: getCardWidthProps): number => {
  const isExtraSpace = hasDynamicIsland() || hasNotch();
  if (index === 0) {
    return isLandscape ? (isExtraSpace ? width(8) : width(10)) : width(20);
  }
  if (index === 1) {
    return isLandscape ? (isExtraSpace ? width(18) : width(20)) : width(40);
  }
  return isLandscape ? (isExtraSpace ? width(13) : width(15)) : width(30);
};
