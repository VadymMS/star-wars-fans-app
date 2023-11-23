import React, {useMemo} from 'react';
import {Text, View, Platform} from 'react-native';
import {ICounter} from '../../../types/appState';
import {useLandscape} from '../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';
import {useAppSelector} from '../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../redux/services/selects';
import dynamicStyles from './styles';

interface ICounterProps {
  info: ICounter;
}

export const Counter = ({info}: ICounterProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const {width, height} = useResponsiveSizes();
  const isLandscape = useLandscape();
  const isExtraSpace = hasDynamicIsland() || hasNotch();
  const isIos = Platform.OS === 'ios';
  const counterWidth = useMemo(
    () => (isLandscape ? (isExtraSpace && width(26)) || width(30) : width(28)),
    [isLandscape, isExtraSpace, width],
  );
  const counterHeight = useMemo(
    () =>
      isLandscape
        ? height(16)
        : (!isExtraSpace && isIos && height(13)) || height(10),
    [isLandscape, isExtraSpace, isIos, height],
  );
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View
      style={[styles.counter, {width: counterWidth, height: counterHeight}]}>
      <Text style={styles.counterNumber}>{info.count}</Text>
      <Text style={styles.counterText}>{info.name}</Text>
    </View>
  );
};
