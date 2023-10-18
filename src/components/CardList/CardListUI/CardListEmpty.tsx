import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../../themes/theme';
import {useLandscape} from '../../../hooks/useLandscape';

interface ICardListEmptyProps {
  title: string;
}

export const CardListEmpty = ({title}: ICardListEmptyProps) => {
  const isLandScape = useLandscape();
  return (
    <View style={[styles.container, isLandScape && styles.containerLandscape]}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 52,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
  },
  containerLandscape: {
    maxHeight: 42,
    minHeight: 42,
  },
  textStyle: {
    lineHeight: 13,
    paddingHorizontal: theme.spacing[10],
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.black,
  },
});
