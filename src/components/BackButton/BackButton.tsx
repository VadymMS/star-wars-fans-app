import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import React from 'react';
import {useLandscape} from '../../hooks/useLandscape';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';

interface IBackButton {
  title: string;
  colorTitle?: string;
  color?: string;
  callback: () => void;
}

export const BackButton = ({
  title = '',
  color,
  colorTitle,
  callback = () => {},
}: IBackButton) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const colorDefault = isDark ? '$yellow500' : '$black';
  const colorTitleDefault = isDark ? '$black' : '$white';

  return (
    <Button
      marginTop={isLandscape ? 0 : 20}
      onPress={callback}
      borderRadius="$2xl"
      borderWidth={1}
      borderColor={color || colorDefault}
      size={isLandscape ? 'lg' : 'xl'}
      p="$0"
      width={isLandscape ? '20%' : '40%'}
      bg={color || colorDefault}>
      <ButtonIcon
        as={ArrowLeftIcon}
        size="lg"
        color={colorTitle || colorTitleDefault}
      />
      <ButtonText
        fontWeight="$semibold"
        fontSize="$lg"
        color={colorTitle || colorTitleDefault}
        marginLeft={3}>
        {title}
      </ButtonText>
    </Button>
  );
};
