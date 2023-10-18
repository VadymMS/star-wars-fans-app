import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../themes/theme';
import {Button, ButtonText} from '@gluestack-ui/themed';
import {useLandscape} from '../../hooks/useLandscape';

interface IHeaderProps {
  title: string;
  onPress: () => void;
}

export const Header = memo(({title, onPress}: IHeaderProps) => {
  const isLandscape = useLandscape();
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={styles.title}>{title}</Text>
      <Button
        onPress={onPress}
        borderRadius="$sm"
        borderWidth={1}
        borderColor={theme.colors.red}
        size="sm"
        p="$0"
        width={isLandscape ? '23%' : '35%'}
        bg={theme.colors.grey}>
        <ButtonText
          textAlign="center"
          fontWeight="$medium"
          fontSize="$sm"
          color={theme.colors.red}
          p="$0"
          width={'100%'}>
          {'CLEAR FANS'}
        </ButtonText>
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.colors.grey,
  },
  containerLandscape: {
    flex: 2.5,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: theme.fonts.interExtraLight,
    fontSize: theme.fontSize['3xl'],
    color: theme.colors.black,
  },
});
