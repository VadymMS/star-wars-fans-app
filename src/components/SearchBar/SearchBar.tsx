import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from '@gluestack-ui/themed';
import React, {memo} from 'react';
import theme from '../../themes/theme';
import {Platform} from 'react-native';
import {useLandscape} from '../../hooks/useLandscape';

interface ISearchBarProps {
  onChangeText: (value: string) => void;
}

export const SearchBar = memo(({onChangeText}: ISearchBarProps) => {
  const isLandscape = useLandscape();
  const paddingBottom = Platform.OS === 'ios' ? '$2' : '$2.5';
  return (
    <Input
      marginBottom={isLandscape ? 0 : 5}
      backgroundColor={theme.colors.white}
      size="sm"
      borderBlockEndColor={theme.colors.white}
      borderBottomColor={theme.colors.white}
      variant="underlined">
      <InputSlot pr="$1.5">
        <InputIcon
          as={SearchIcon}
          color={theme.colors.black}
          size={isLandscape ? 'md' : 'lg'}
          marginBottom="$1"
        />
      </InputSlot>
      <InputField
        onChangeText={onChangeText}
        paddingHorizontal="$0"
        placeholder="Search"
        paddingBottom={paddingBottom}
      />
    </Input>
  );
});
