import {StyleSheet} from 'react-native';
import {IStylesOptions} from '../../../types/theme';
import theme from '../../../themes/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';
  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[themeValue]?.textColor,
      maxHeight: isLandscape ? 42 : 52,
      minHeight: isLandscape ? 42 : 52,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      color: theme.colors[themeValue]?.textColor,
    },
  });
};

export default dynamicStyles;
