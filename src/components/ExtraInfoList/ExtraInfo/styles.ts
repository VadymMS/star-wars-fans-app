import {StyleSheet} from 'react-native';
import theme from '../../../themes/theme';
import {IStylesOptions} from '../../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      width: '100%',
      maxHeight: isLandscape ? 20 : 30,
      minHeight: isLandscape ? 20 : 30,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: theme.colors[themeValue]?.grey,
      marginTop: 5,
      flexDirection: 'column',
    },
    textStyle: {
      color: theme.colors[themeValue]?.textColor,
      fontFamily: theme.fonts.interLight,
    },
    textErrorStyle: {
      color: theme.colors[themeValue]?.commonRed,
    },
  });
};

export default dynamicStyles;
