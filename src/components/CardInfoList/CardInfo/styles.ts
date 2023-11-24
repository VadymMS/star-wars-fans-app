import {StyleSheet} from 'react-native';
import {IStylesOptions} from '../../../types/theme';
import theme from '../../../theme/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';
  const height = isLandscape ? 42 : 52;

  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors[themeValue]?.textColor,
      maxHeight: height,
      minHeight: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      color: theme.colors[themeValue]?.textColor,
    },
  });
};

export default dynamicStyles;
