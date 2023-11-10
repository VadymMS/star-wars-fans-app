import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

interface IExtraInfo {
  queryParam: string;
  id: string;
}

export const ExtraInfo = ({queryParam, id}: IExtraInfo) => {
  const isLandscape = useLandscape();
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

  if (error) {
    return (
      <ErrorComponent
        title="Something went wrong!"
        style={[styles.container, isLandscape && styles.containerLandscape]}
        textStyle={styles.textErrorStyle}
      />
    );
  }

  if (isLoading) {
    return (
      <Loader
        color={theme.colors.system.warning}
        style={[styles.container, isLandscape && styles.containerLandscape]}
        size={isLandscape ? 'small' : 'large'}
      />
    );
  }

  const title = queryParam === QueryParamsEnums.films ? data.title : data.name;

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={styles.textStyle}>{title || ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 30,
    minHeight: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
    marginTop: 5,
    flexDirection: 'column',
  },
  containerLandscape: {
    maxHeight: 20,
    minHeight: 20,
  },
  textStyle: {
    color: theme.colors.system.warning,
    fontFamily: theme.fonts.interLight,
  },
  textErrorStyle: {
    color: theme.colors.red,
  },
});
