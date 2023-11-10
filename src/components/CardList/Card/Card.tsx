import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IFanInfo, IFan} from '../../../types/appState';
import theme from '../../../themes/theme';
import {Button, ButtonIcon, FavouriteIcon} from '@gluestack-ui/themed';
import {getId} from '../../../helpers/getId';
import {Loader} from '../../Loader/Loader';
import {ErrorComponent} from '../../ErrorComponent/ErrorComponent';
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

interface ICardProps {
  info: IFan;
  onPress: (fanInfo: IFanInfo) => void;
}

export const Card = ({info, onPress}: ICardProps) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const isLandscape = useLandscape();
  const {width} = useResponsiveSizes();

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
    (index: number) => getCardWidth({index, isLandscape, width}),
    [isLandscape, width],
  );

  if (homeworldError || speciesError) {
    return (
      <ErrorComponent
        title="Something went wrong!"
        style={[styles.container, isLandscape && styles.containerLandscape]}
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
          isLandscape && styles.containerLandscape,
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
        style={[
          styles.container,
          isLandscape && {
            ...styles.containerLandscape,
            ...styles.cardWidthLandscape,
          },
        ]}>
        {infoArr.map((infoItem, index) => {
          return (
            <View style={{width: getWidth(index)}} key={index.toString()}>
              {typeof infoItem === 'boolean' ? (
                <Button
                  onPress={() => onPress({name, type: gender, favorite})}
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
    maxHeight: 42,
    minHeight: 42,
  },
  cardWidthLandscape: {
    width: '50%',
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
  textErrorStyle: {
    color: theme.colors.red,
  },
});
