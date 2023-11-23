import {StyleSheet} from 'react-native';
import {IStylesOptions} from '../../../../types/theme';
import theme from '../../../../themes/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      width: '100%',
      maxHeight: isLandscape ? 42 : 52,
      minHeight: isLandscape ? 42 : 52,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderTopWidth: theme.borderWidth[2],
      borderColor: theme.colors[themeValue]?.borderColor,
    },
    containerButtons: {
      flexDirection: 'row',
      marginLeft: isLandscape ? 0 : 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerPages: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      lineHeight: 13,
      paddingHorizontal: theme.spacing[10],
      fontFamily: theme.fonts.interLight,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors[themeValue]?.textColor,
    },
  });
};

export default dynamicStyles;
