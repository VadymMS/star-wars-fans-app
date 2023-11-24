import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from '@gluestack-ui/themed';
import React, {memo} from 'react';
import {Platform} from 'react-native';
import {useLandscape} from '../../hooks/useLandscape';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import theme from '../../theme/theme';

interface ISearchBarProps {
  onChangeText: (value: string) => void;
}

export const SearchBar = memo(({onChangeText}: ISearchBarProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();
  const paddingBottom = Platform.OS === 'ios' ? '$2' : '$2.5';
  const themeValue = isDark ? 'dark' : 'light';

  return (
    <Input
      marginBottom={isLandscape ? 0 : 5}
      backgroundColor={theme.colors[themeValue]?.white}
      size="sm"
      borderBlockEndColor={theme.colors[themeValue]?.white}
      borderBottomColor={theme.colors[themeValue]?.white}
      variant="underlined">
      <InputSlot pr="$1.5">
        <InputIcon
          as={SearchIcon}
          color={theme.colors[themeValue]?.textColor}
          size={isLandscape ? 'md' : 'lg'}
          marginBottom="$1"
        />
      </InputSlot>
      <InputField
        onChangeText={onChangeText}
        paddingHorizontal="$0"
        placeholder="Search"
        paddingBottom={paddingBottom}
        color={theme.colors[themeValue]?.textColor}
      />
    </Input>
  );
});
