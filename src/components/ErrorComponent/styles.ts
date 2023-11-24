import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[themeValue]?.white,
    },
    textStyle: {
      color: theme.colors[themeValue]?.commonRed,
      fontSize: theme.fontSize.base,
    },
  });
};

export default dynamicStyles;
