import {responsiveType} from 'react-native-responsive-sizes';

interface getCardWidthProps {
  index: number;
  isLandscape: boolean;
  isExtraSpace: boolean;
  responsive: responsiveType;
}

export const getCardWidth = ({
  index,
  isLandscape,
  responsive,
  isExtraSpace,
}: getCardWidthProps): number => {
  return index === 0
    ? isLandscape
      ? (isExtraSpace && responsive.width(8)) || responsive.width(10)
      : responsive.width(20)
    : index === 1
    ? isLandscape
      ? (isExtraSpace && responsive.width(18)) || responsive.width(20)
      : responsive.width(40)
    : isLandscape
    ? (isExtraSpace && responsive.width(13)) || responsive.width(15)
    : responsive.width(30);
};
