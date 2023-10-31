import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IFan} from '../../../types/appState';
import theme from '../../../themes/theme';
import {Button, ButtonIcon, FavouriteIcon} from '@gluestack-ui/themed';
import {getId} from '../../../helpers/getId';
import {Loader} from '../../Loader/Loader';
import {ErrorComponent} from '../../Error/Error';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../../types/navigation';
import {
  useGetPlanetsQuery,
  useGetSpeciesQuery,
} from '../../../redux/services/fansApi';
import {useLandscape} from '../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {getCardWidth} from '../../../helpers/getCardWidth';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';

interface ICardProps {
  info: IFan;
  onPress: (name: string) => void;
}

export const Card = ({info, onPress}: ICardProps) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const isLandscape = useLandscape();
  const responsive = useResponsiveSizes();
  const isExtraSpace = hasDynamicIsland() || hasNotch();

  const {
    birth_year,
    name,
    gender,
    homeworld: homeworldUrl,
    species: [speciesUrl],
    favorite,
    eye_color,
    hair_color,
    height,
    mass,
    id,
    skin_color,
    films,
    starships,
    vehicles,
  } = info;

  const homewoldId = useMemo(() => getId(homeworldUrl), [homeworldUrl]);
  const speciesdId = useMemo(() => getId(speciesUrl), [speciesUrl]);

  const {
    data: homeworld,
    error: homeworldError,
    isLoading: isLoadingHomeworld,
  } = useGetPlanetsQuery(homewoldId);

  const {
    data: species,
    error: speciesError,
    isLoading: isLoadingSpecies,
  } = useGetSpeciesQuery(speciesdId);

  const getWidth = useCallback(
    (index: number) =>
      getCardWidth({index, isLandscape, responsive, isExtraSpace}),
    [isLandscape, responsive, isExtraSpace],
  );

  if (homeworldError || speciesError) {
    return (
      <ErrorComponent
        title="Something went wrong!"
        style={[styles.container, isLandscape && styles.heightLandscape]}
        textStyle={[styles.textStyle, styles.textErrorStyle]}
      />
    );
  }

  if (isLoadingHomeworld || isLoadingSpecies) {
    return (
      <Loader
        style={[
          styles.container,
          styles.loaderStyle,
          isLandscape && styles.heightLandscape,
        ]}
        size={isLandscape ? 'small' : 'large'}
      />
    );
  }

  const infoArr = [
    favorite,
    name,
    birth_year,
    gender,
    homeworld?.name || '',
    species?.name || '',
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CardInfo', {
          name,
          eye_color,
          hair_color,
          height,
          mass,
          skin_color,
          films,
          starships,
          vehicles,
        })
      }>
      <View
        style={[styles.container, isLandscape && styles.containerLandscape]}>
        {infoArr.map((infoItem, index) => {
          const width = getWidth(index);
          return (
            <View style={{width}} key={index.toString()}>
              {typeof infoItem === 'boolean' ? (
                <Button
                  onPress={() => onPress(id)}
                  marginLeft={8}
                  borderRadius="$full"
                  size="sm"
                  p="$0"
                  width={1}
                  bg={theme.colors.white}>
                  <ButtonIcon
                    as={FavouriteIcon}
                    size="sm"
                    color="$red500"
                    fill={infoItem ? '$red500' : '$white'}
                  />
                </Button>
              ) : (
                <Text style={styles.textStyle}>{infoItem}</Text>
              )}
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 52,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
  },
  containerLandscape: {
    width: '50%',
    maxHeight: 42,
    minHeight: 42,
  },
  textStyle: {
    lineHeight: 13,
    paddingHorizontal: theme.spacing[10],
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.black,
  },
  loaderStyle: {
    justifyContent: 'center',
  },
  heightLandscape: {
    maxHeight: 42,
    minHeight: 42,
  },
  textErrorStyle: {
    color: theme.colors.red,
  },
});
