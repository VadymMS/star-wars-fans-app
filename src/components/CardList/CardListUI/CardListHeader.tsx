import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../../themes/theme';
import {CardListHeadersEnums} from '../../../types/enums/CardListHeadersEnums';
import {FavouriteIcon, InputIcon} from '@gluestack-ui/themed';
import {useLandscape} from '../../../hooks/useLandscape';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import {getCardWidth} from '../../../helpers/getCardWidth';
import {hasDynamicIsland, hasNotch} from 'react-native-device-info';

interface ICardListHeaderProps {
  titles: Array<CardListHeadersEnums>;
}

export const CardListHeader = ({titles}: ICardListHeaderProps) => {
  const isLandscape = useLandscape();
  const responsive = useResponsiveSizes();
  const isExtraSpace = hasDynamicIsland() || hasNotch();

  const getWidth = useCallback(
    (index: number) =>
      getCardWidth({index, isLandscape, responsive, isExtraSpace}),
    [isLandscape, responsive, isExtraSpace],
  );

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      {titles.map((title, index) => {
        const width = getWidth(index);
        return (
          <View
            style={[index !== 0 && styles.containerTitle, {width}]}
            key={index.toString()}>
            {title === CardListHeadersEnums.favorite ? (
              <InputIcon
                as={FavouriteIcon}
                size="sm"
                marginLeft={16}
                fill="$black"
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 52,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: theme.borderWidth[2],
    borderColor: theme.colors.grey,
  },
  containerLandscape: {
    maxHeight: 42,
    minHeight: 42,
  },
  containerTitle: {
    borderLeftWidth: theme.borderWidth[2],
    borderLeftColor: theme.colors.grey,
  },
  title: {
    lineHeight: 13,
    paddingHorizontal: theme.spacing[10],
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.black,
  },
});
