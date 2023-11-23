import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {useLandscape} from '../../../../hooks/useLandscape';
import {useAppSelector} from '../../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../../redux/services/selects';
import dynamicStyles from './styles';

interface IEmptyProps {
  title: string;
}

export const Empty = ({title}: IEmptyProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};
