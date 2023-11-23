import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../../redux/services/selects';
import theme from '../../../../themes/theme';

interface ISeparatorProps {
  color?: string;
  height?: number;
}

export const Separator = ({color, height = 2}: ISeparatorProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const themeValue = isDark ? 'dark' : 'light';
  return (
    <View
      style={{backgroundColor: color || theme.colors[themeValue]?.grey, height}}
    />
  );
};
