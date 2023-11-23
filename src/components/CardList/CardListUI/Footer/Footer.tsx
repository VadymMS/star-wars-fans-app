import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import theme from '../../../../themes/theme';
import {
  Button,
  ButtonIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@gluestack-ui/themed';
import {useLandscape} from '../../../../hooks/useLandscape';
import {useAppSelector} from '../../../../hooks/useStoreHooks';
import {
  selectCountPages,
  selectDarkTheme,
  selectNextPage,
  selectPreviousPage,
} from '../../../../redux/services/selects';
import {Nullable} from '../../../../types/utility';
import {NavigationType} from '../../../../types/navigation';
import dynamicStyles from './styles';

interface IFooterProps {
  startNumberPage: number;
  endNumberPage: number;
  navigationPageHandler: (
    direction: NavigationType,
    page: Nullable<string>,
  ) => void;
}

export const Footer = ({
  startNumberPage,
  endNumberPage,
  navigationPageHandler,
}: IFooterProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const previousPage = useAppSelector(selectPreviousPage);
  const nextPage = useAppSelector(selectNextPage);
  const countPages = useAppSelector(selectCountPages);
  const isLandscape = useLandscape();
  const themeValue = isDark ? 'dark' : 'light';
  const iconColor = isDark ? '$yellow500' : '$black';
  const iconColorDisable = isDark ? '$yellow800' : '$grey';
  const pagesNumberText = `${startNumberPage < 1 ? 1 : startNumberPage}–${
    endNumberPage > countPages ? countPages : endNumberPage
  } of ${countPages}`;
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerPages}>
        <Text style={styles.textStyle}>{pagesNumberText}</Text>
      </View>
      <View style={styles.containerButtons}>
        <Button
          disabled={!previousPage}
          onPress={() => navigationPageHandler('previous', previousPage)}
          marginRight={4}
          marginLeft={8}
          borderRadius="$full"
          size="sm"
          width={'5%'}
          bg={theme.colors[themeValue]?.white}>
          <ButtonIcon
            as={ChevronLeftIcon}
            size="lg"
            color={previousPage ? iconColor : iconColorDisable}
          />
        </Button>
        <Button
          disabled={!nextPage}
          onPress={() => navigationPageHandler('next', nextPage)}
          marginRight={8}
          marginLeft={4}
          borderRadius="$full"
          size="sm"
          width={'5%'}
          bg={theme.colors[themeValue]?.white}>
          <ButtonIcon
            as={ChevronRightIcon}
            size="lg"
            color={nextPage ? iconColor : iconColorDisable}
          />
        </Button>
      </View>
    </View>
  );
};
