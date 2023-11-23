import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {useLandscape} from '../../../hooks/useLandscape';
import {useAppSelector} from '../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../redux/services/selects';
import dynamicStyles from './styles';

interface ICardInfoItem {
  value: string;
}

export const CardInfo = ({value}: ICardInfoItem) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{value}</Text>
    </View>
  );
};
