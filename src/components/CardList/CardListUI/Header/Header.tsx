import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {CardListHeadersEnums} from '../../../../types/enums/CardListHeadersEnums';
import {FavouriteIcon, InputIcon} from '@gluestack-ui/themed';
import {useLandscape} from '../../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {getCardWidth} from '../../../../helpers/getCardWidth';
import {useAppSelector} from '../../../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../../../redux/services/selects';
import dynamicStyles from './styles';

interface IHeaderProps {
  titles: Array<CardListHeadersEnums>;
}

export const Header = ({titles}: IHeaderProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const {width} = useResponsiveSizes();
  const iconColor = isDark ? '$yellow500' : '$black';

  const getWidth = useCallback(
    (index: number) => getCardWidth({index, isLandscape, width}),
    [isLandscape, width],
  );

  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      {titles.map((title, index) => {
        return (
          <View
            style={[
              index !== 0 && styles.containerTitle,
              {width: getWidth(index)},
            ]}
            key={index.toString()}>
            {title === CardListHeadersEnums.favorite ? (
              <InputIcon
                as={FavouriteIcon}
                size="sm"
                marginLeft={16}
                fill={iconColor}
                color={iconColor}
              />
            ) : (
              <Text style={styles.title}>{title}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};
