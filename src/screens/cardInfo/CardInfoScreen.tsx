import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {RootStackParamList} from '../../types/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getId} from '../../helpers/getId';
import {BackButton} from '../../components/BackButton/BackButton';
import {CardInfoList} from '../../components/CardInfoList/CardInfoList';
import {QueryParamsEnums} from '../../types/enums/QueryEnums';
import {ExtraInfoList} from '../../components/ExtraInfoList/ExtraInfoList';
import {useLandscape} from '../../hooks/useLandscape';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';

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
  const isDark = useAppSelector(selectDarkTheme);
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
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <>
      <SafeAreaView style={styles.safeAreaViewTopStyle} />
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <View style={styles.container}>
          <Text style={styles.title}>{name}</Text>
          <ScrollView style={styles.scrollViewStyle}>
            <>
              <CardInfoList info={info} />
              <View style={styles.extraInfoListContainer}>
                {filmsId.length > 0 && (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.films}
                    idArr={filmsId}
                  />
                )}
                {starshipsId.length > 0 && (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.starships}
                    idArr={starshipsId}
                  />
                )}
                {vehiclesId.length > 0 && (
                  <ExtraInfoList
                    queryParam={QueryParamsEnums.vehicles}
                    idArr={vehiclesId}
                  />
                )}
              </View>
            </>
          </ScrollView>
          <BackButton title="Go Back" callback={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    </>
  );
};
