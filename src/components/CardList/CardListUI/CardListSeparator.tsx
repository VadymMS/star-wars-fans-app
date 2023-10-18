import React from 'react';
import {View} from 'react-native';
import theme from '../../../themes/theme';

interface ICardListSeparatorProps {
  color?: string;
  height?: number;
}

export const CardListSeparator = ({
  color: backgroundColor = theme.colors.black,
  height = 2,
}: ICardListSeparatorProps) => {
  return <View style={{backgroundColor, height}} />;
};
