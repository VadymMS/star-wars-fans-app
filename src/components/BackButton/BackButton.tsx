import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  ButtonText,
} from '@gluestack-ui/themed';
import React from 'react';
import {useLandscape} from '../../hooks/useLandscape';

interface IBackButton {
  title: string;
  callback: () => void;
}

export const BackButton = ({title, callback}: IBackButton) => {
  const isLandscape = useLandscape();
  return (
    <Button
      marginTop={isLandscape ? 0 : 20}
      onPress={callback}
      borderRadius="$2xl"
      borderWidth={1}
      borderColor="$yellow500"
      size={isLandscape ? 'lg' : 'xl'}
      p="$0"
      width={isLandscape ? '20%' : '40%'}
      bg="$yellow500">
      <ButtonIcon as={ArrowLeftIcon} size="lg" color="$black" fill="$black" />
      <ButtonText
        fontWeight="$semibold"
        fontSize="$lg"
        color="$black"
        marginLeft={3}>
        {title}
      </ButtonText>
    </Button>
  );
};
