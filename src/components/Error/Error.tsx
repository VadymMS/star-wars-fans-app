import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../../themes/theme';

interface IErrorProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
}

export const ErrorComponent = ({style, textStyle, title}: IErrorProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textStyle, textStyle]}>Error: {title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
  },
  textStyle: {
    color: theme.colors.red,
    fontSize: theme.fontSize.base,
  },
});
