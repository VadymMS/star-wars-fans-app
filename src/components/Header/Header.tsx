import React, {memo, useMemo} from 'react';
import {Text, View} from 'react-native';
import theme from '../../themes/theme';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {useLandscape} from '../../hooks/useLandscape';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';

interface IHeaderProps {
  title: string;
  onPress: () => void;
}

export const Header = memo(({title, onPress}: IHeaderProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const themeValue = isDark ? 'dark' : 'light';
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button
        onPress={onPress}
        borderRadius="$sm"
        borderWidth={1}
        borderColor={theme.colors[themeValue]?.commonRed}
        size="sm"
        p="$0"
        width={isLandscape ? '23%' : '35%'}
        bg={theme.colors[themeValue]?.grey}>
        <ButtonText
          textAlign="center"
          fontWeight="$medium"
          fontSize="$sm"
          color={theme.colors[themeValue]?.commonRed}
          p="$0"
          width={'100%'}>
          {'CLEAR FANS'}
        </ButtonText>
      </Button>
    </View>
  );
});
