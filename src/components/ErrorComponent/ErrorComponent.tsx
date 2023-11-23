import React, {useMemo} from 'react';
import {StyleProp, Text, TextStyle, View, ViewStyle} from 'react-native';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';

interface IErrorProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
}

export const ErrorComponent = ({style, textStyle, title}: IErrorProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const styles = useMemo(() => dynamicStyles({isDark}), [isDark]);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, textStyle]}>Error: {title}</Text>
    </View>
  );
};
