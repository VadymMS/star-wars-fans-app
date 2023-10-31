import React, {useMemo} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import theme from '../../../themes/theme';
import {ICounter} from '../../../types/appState';
import {useLandscape} from '../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';

interface ICounterProps {
  info: ICounter;
}

export const Counter = ({info}: ICounterProps) => {
  const responsive = useResponsiveSizes();
  const isLandscape = useLandscape();
  const isExtraSpace = hasDynamicIsland() || hasNotch();
  const isIos = Platform.OS === 'ios';

  const counterWidth = useMemo(
    () =>
      isLandscape
        ? (isExtraSpace && responsive.width(26)) || responsive.width(30)
        : responsive.width(28),
    [isLandscape, isExtraSpace, responsive],
  );
  const counterHeight = useMemo(
    () =>
      isLandscape
        ? responsive.height(16)
        : (!isExtraSpace && isIos && responsive.height(13)) ||
          responsive.height(10),
    [isLandscape, isExtraSpace, responsive, isIos],
  );

  return (
    <View
      style={[
        {...styles.counter, width: counterWidth, height: counterHeight},
        isLandscape && styles.counterLandscape,
      ]}>
      <Text style={styles.counterNumber}>{info.count}</Text>
      <Text
        style={[
          styles.counterText,
          isLandscape && styles.counterTextLandscape,
        ]}>
        {info.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: theme.spacing[16],
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 4,
    shadowColor: theme.colors.black,
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  counterLandscape: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: theme.spacing[10],
  },
  counterNumber: {
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize['3xl'],
    color: theme.colors.black,
  },
  counterText: {
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.black,
    marginTop: 3,
  },
  counterTextLandscape: {
    fontSize: theme.fontSize.base,
    ...Platform.select({
      android: {
        marginBottom: 1.5,
        marginLeft: 6,
      },
      ios: {
        marginBottom: 5,
        marginLeft: 5,
      },
    }),
  },
});
