import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import theme from '../themes/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getId} from '../helpers/getId';
import {BackButton} from '../components/BackButton/BackButton';
import {CardInfoList} from '../components/CardInfoList/CardInfoList';
import {QueryParamsEnums} from '../types/enums/QueryEnums';
import {ExtraInfoList} from '../components/ExtraInfoList/ExtraInfoList';
import {useLandscape} from '../hooks/useLandscape';

type CardInfoProps = NativeStackScreenProps<RootStackParamList, 'CardInfo'>;

export const CardInfoScreen = ({route}: CardInfoProps) => {
  const {
    name,
    eye_color,
    hair_color,
    height,
    mass,
    skin_color,
    films,
    starships,
    vehicles,
  } = route.params;
  const navigation = useNavigation();
  const isLandscape = useLandscape();

  const filmsId = useMemo(() => films.map(filmUrl => getId(filmUrl)), [films]);
  const starshipsId = useMemo(
    () => starships.map(starshipUrl => getId(starshipUrl)),
    [starships],
  );
  const vehiclesId = useMemo(
    () => vehicles.map(vehicleUrl => getId(vehicleUrl)),
    [vehicles],
  );

  const info = [eye_color, hair_color, height, mass, skin_color];

  return (
    <>
      <SafeAreaView style={styles.safeAreaViewTopStyle} />
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <View
          style={[styles.container, isLandscape && styles.containerLandscape]}>
          <Text style={[styles.title, isLandscape && styles.titleLandscape]}>
            {name}
          </Text>
          <ScrollView style={styles.scrollViewStyle}>
            <>
              <CardInfoList info={info} />
              <View
                style={[
                  styles.extraInfoListContainer,
                  isLandscape && styles.extraInfoListContainerLandscape,
                ]}>
                {filmsId.length ? (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.films}
                    idArr={filmsId}
                  />
                ) : null}
                {starshipsId.length ? (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.starships}
                    idArr={starshipsId}
                  />
                ) : null}
                {vehiclesId.length ? (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.vehicles}
                    idArr={vehiclesId}
                  />
                ) : null}
              </View>
            </>
          </ScrollView>
          <BackButton title="Go Back" callback={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaViewTopStyle: {
    flex: 0,
    backgroundColor: theme.colors.black,
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.black,
    paddingVertical: theme.spacing[20],
    paddingHorizontal: 5,
  },
  containerLandscape: {
    paddingVertical: theme.spacing[10],
  },
  title: {
    textAlign: 'center',
    fontFamily: theme.fonts.interExtraBold,
    fontSize: theme.fontSize['4xl'],
    color: theme.colors.system.warning,
    marginVertical: 20,
  },
  titleLandscape: {
    marginVertical: 10,
    marginTop: 0,
  },
  scrollViewStyle: {
    flex: 1,
    marginBottom: 10,
  },
  extraInfoListContainer: {
    paddingHorizontal: theme.spacing[20],
    marginTop: 10,
  },
  extraInfoListContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
