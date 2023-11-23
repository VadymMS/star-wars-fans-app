import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {ExtraInfo} from './ExtraInfo/ExtraInfo';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';

interface IExtraInfoList {
  queryParam: string;
  idArr: Array<string>;
}

export const ExtraInfoList = ({queryParam, idArr}: IExtraInfoList) => {
  const isDark = useAppSelector(selectDarkTheme);
  const styles = useMemo(() => dynamicStyles({isDark}), [isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{queryParam}</Text>
      {idArr.map((id, index) => (
        <ExtraInfo queryParam={queryParam} id={id} key={index.toString()} />
      ))}
    </View>
  );
};
