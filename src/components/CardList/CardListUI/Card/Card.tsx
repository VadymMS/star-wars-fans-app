import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {IFanInfo, IFan} from '../../../../types/appState';
import theme from '../../../../theme/theme';
import {Button, ButtonIcon, FavouriteIcon} from '@gluestack-ui/themed';
import {getId} from '../../../../helpers/getId';
import {Loader} from '../../../Loader/Loader';
import {ErrorComponent} from '../../../ErrorComponent/ErrorComponent';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../../../../types/navigation';
import {
  useGetPlanetsQuery,
  useGetSpeciesQuery,
} from '../../../../redux/services/fansApi';
import {useLandscape} from '../../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {getCardWidth} from '../../../../helpers/getCardWidth';
import {useAppSelector} from '../../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../../redux/services/selects';
import dynamicStyles from './styles';

interface ICardProps {
  info: IFan;
  onPress: (fanInfo: IFanInfo) => void;
}

export const Card = ({info, onPress}: ICardProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const navigation = useNavigation<ScreenNavigationProp>();
  const isLandscape = useLandscape();
  const themeValue = isDark ? 'dark' : 'light';
  const iconColor = isDark ? '$backgroundDark900' : '$white';
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

  const homeworldId = useMemo(() => getId(homeworldUrl), [homeworldUrl]);
  const specieId = useMemo(() => getId(speciesUrl), [speciesUrl]);

  const {
    data: homeworld,
    error: homeworldError,
    isLoading: isLoadingHomeworld,
  } = useGetPlanetsQuery(homeworldId);
  const {
    data: specie,
    error: specieError,
    isLoading: isLoadingSpecie,
  } = useGetSpeciesQuery(specieId);

  const cardData = [
    favorite,
    name,
    birth_year,
    gender,
    homeworld?.name || '',
    specie?.name || '',
  ];

  const getWidth = useCallback(
    (index: number) => getCardWidth({index, isLandscape, width}),
    [isLandscape, width],
  );

  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  if (homeworldError || specieError) {
    return (
      <ErrorComponent
        title="Something went wrong!"
        style={styles.container}
        textStyle={[styles.textStyle, styles.textErrorStyle]}
      />
    );
  }

  if (isLoadingHomeworld || isLoadingSpecie) {
    return (
      <Loader style={[styles.container, styles.loaderStyle]} size="small" />
    );
  }

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
        style={[styles.container, isLandscape && styles.cardWidthLandscape]}>
        {cardData.map((infoItem, index) => {
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
                  bg={theme.colors[themeValue]?.white}>
                  <ButtonIcon
                    as={FavouriteIcon}
                    size="sm"
                    color="$red500"
                    fill={infoItem ? '$red500' : iconColor}
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
