import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {QueryParamsEnums} from '../../../types/enums/QueryEnums';
import theme from '../../../themes/theme';
import {ErrorComponent} from '../../ErrorComponent/ErrorComponent';
import {Loader} from '../../Loader/Loader';
import {
  useGetFilmsQuery,
  useGetPeopleQuery,
  useGetStarshipsQuery,
  useGetVehiclesQuery,
} from '../../../redux/services/fansApi';
import {useLandscape} from '../../../hooks/useLandscape';
import {useAppSelector} from '../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../redux/services/selects';
import dynamicStyles from './styles';

interface IExtraInfo {
  queryParam: string;
  id: string;
}

export const ExtraInfo = ({queryParam, id}: IExtraInfo) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const themeValue = isDark ? 'dark' : 'light';

  let getQuery;

  switch (queryParam) {
    case QueryParamsEnums.films:
      getQuery = useGetFilmsQuery;
      break;
    case QueryParamsEnums.starships:
      getQuery = useGetStarshipsQuery;
      break;
    case QueryParamsEnums.vehicles:
      getQuery = useGetVehiclesQuery;
      break;
    default:
      getQuery = useGetPeopleQuery;
      break;
  }

  const {data, error, isLoading} = getQuery(id);
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  if (error) {
    return (
      <ErrorComponent
        title="Something went wrong!"
        style={styles.container}
        textStyle={styles.textErrorStyle}
      />
    );
  }

  if (isLoading) {
    return (
      <Loader
        color={theme.colors[themeValue]?.textColor}
        style={styles.container}
        size="small"
      />
    );
  }

  const title = queryParam === QueryParamsEnums.films ? data.title : data.name;

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title || ''}</Text>
    </View>
  );
};
