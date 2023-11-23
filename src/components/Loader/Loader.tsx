import React, {useMemo} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import theme from '../../themes/theme';
import dynamicStyles from './styles';

interface ILoaderProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: 'small' | 'large' | undefined;
}

export const Loader = ({style, color, size = 'large'}: ILoaderProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const themeValue = isDark ? 'dark' : 'light';
  const styles = useMemo(() => dynamicStyles({isDark}), [isDark]);

  return (
    <View style={[styles.activity, style]}>
      <ActivityIndicator
        color={color || theme.colors[themeValue]?.textColor}
        size={size}
      />
    </View>
  );
};
