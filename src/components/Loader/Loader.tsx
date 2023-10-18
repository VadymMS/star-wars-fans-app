import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import theme from '../../themes/theme';
import {ActivityIndicator} from 'react-native';

interface ILoaderProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: 'small' | 'large' | undefined;
}

export const Loader = ({
  style,
  color = theme.colors.black,
  size = 'large',
}: ILoaderProps) => {
  return (
    <View style={[styles.activity, style]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
  },
});
