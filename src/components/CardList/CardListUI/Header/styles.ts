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
      justifyContent: 'space-between',
      borderBottomWidth: theme.borderWidth[2],
      borderColor: theme.colors[themeValue]?.borderColor,
    },
    containerTitle: {
      borderLeftWidth: theme.borderWidth[2],
      borderLeftColor: theme.colors[themeValue]?.borderColor,
    },
    title: {
      lineHeight: 13,
      paddingHorizontal: theme.spacing[10],
      fontFamily: theme.fonts.interLight,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.semibold,
      color: theme.colors[themeValue]?.textColor,
    },
  });
};

export default dynamicStyles;
