import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
} from 'react-native';
import theme from '../../../themes/theme';
import {ICounter} from '../../../types/appState';
import {useLandscape} from '../../../hooks/useLandscape';

interface ICounterProps {
  info: ICounter;
}

export const Counter = ({info}: ICounterProps) => {
  const {height, width} = useWindowDimensions();
  const isLandscape = useLandscape();
  const counterWidth = width / (isLandscape ? 4.6 : 3.5);
  const counterHeight = height / (isLandscape ? 5.5 : 10);

  return (
    <View
      style={[
        styles.counter,
        isLandscape && styles.counterLandscape,
        {width: counterWidth, height: counterHeight},
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
        marginBottom: 6,
        marginLeft: 6,
      },
      ios: {
        marginBottom: 5,
        marginLeft: 5,
      },
    }),
  },
});
