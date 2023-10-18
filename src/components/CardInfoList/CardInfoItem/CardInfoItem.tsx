import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../../themes/theme';
import {useLandscape} from '../../../hooks/useLandscape';

interface ICardInfoItem {
  value: string;
}

export const CardInfoItem = ({value}: ICardInfoItem) => {
  const isLandscape = useLandscape();
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={styles.textStyle}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.system.warning,
    maxHeight: 52,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLandscape: {
    maxHeight: 42,
    minHeight: 42,
  },
  textStyle: {
    color: theme.colors.system.warning,
  },
});
