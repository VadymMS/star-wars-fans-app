import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../../themes/theme';
import {
  Button,
  ButtonIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@gluestack-ui/themed';
import {Nullable} from '../../../types/utility';
import {useLandscape} from '../../../hooks/useLandscape';

interface ICardListFooterProps {
  countPages: number;
  previousPageHandler: () => void;
  nextPageHandler: () => void;
  previousPage: Nullable<string>;
  nextPage: Nullable<string>;
  startNumberPage: number;
  endNumberPage: number;
}

export const CardListFooter = ({
  countPages,
  previousPageHandler,
  nextPageHandler,
  previousPage,
  nextPage,
  startNumberPage,
  endNumberPage,
}: ICardListFooterProps) => {
  const isLandscape = useLandscape();
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <View style={styles.containerPages}>
        <Text style={styles.textStyle}>{`${
          startNumberPage < 1 ? 1 : startNumberPage
        }–${
          endNumberPage > countPages ? countPages : endNumberPage
        } of ${countPages}`}</Text>
      </View>
      <View
        style={[
          styles.containerButtons,
          isLandscape && styles.containerButtonsLandscape,
        ]}>
        <Button
          onPress={previousPageHandler}
          marginRight={4}
          marginLeft={8}
          borderRadius="$full"
          size="sm"
          width={'5%'}
          bg="$white">
          <ButtonIcon
            as={ChevronLeftIcon}
            size="lg"
            color={previousPage ? '$black' : '$grey'}
          />
        </Button>
        <Button
          onPress={nextPageHandler}
          marginRight={8}
          marginLeft={4}
          borderRadius="$full"
          size="sm"
          width={'5%'}
          bg="$white">
          <ButtonIcon
            as={ChevronRightIcon}
            size="lg"
            color={nextPage ? '$black' : '$grey'}
          />
        </Button>
      </View>
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
    justifyContent: 'flex-end',
    borderTopWidth: theme.borderWidth[2],
    borderColor: theme.colors.grey,
  },
  containerLandscape: {
    maxHeight: 42,
    minHeight: 42,
  },
  containerButtons: {
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButtonsLandscape: {
    marginLeft: 0,
  },
  containerPages: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    lineHeight: 13,
    paddingHorizontal: theme.spacing[10],
    fontFamily: theme.fonts.interLight,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.black,
  },
});
