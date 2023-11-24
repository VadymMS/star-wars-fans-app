import {StyleSheet} from 'react-native';
import {IStylesOptions} from '../../../../types/theme';
import theme from '../../../../theme/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';
  const height = isLandscape ? 42 : 52;

  return StyleSheet.create({
    container: {
      width: '100%',
      maxHeight: height,
      minHeight: height,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors[themeValue]?.white,
    },
    cardWidthLandscape: {
      width: '50%',
    },
    textStyle: {
      lineHeight: 13,
      paddingHorizontal: theme.spacing[10],
      fontFamily: theme.fonts.interLight,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors[themeValue]?.textColor,
    },
    loaderStyle: {
      justifyContent: 'center',
    },
    textErrorStyle: {
      color: theme.colors[themeValue]?.commonRed,
    },
  });
};

export default dynamicStyles;
