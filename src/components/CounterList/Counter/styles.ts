import {StyleSheet, Platform} from 'react-native';
import theme from '../../../themes/theme';
import {IStylesOptions} from '../../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';
  const counterTextLandscape =
    isLandscape &&
    Platform.select({
      android: {
        marginBottom: 1.5,
        marginLeft: 6,
      },
      ios: {
        marginBottom: 5,
        marginLeft: 5,
      },
    });

  return StyleSheet.create({
    counter: {
      flexDirection: isLandscape ? 'row' : 'column',
      justifyContent: isLandscape ? 'flex-start' : 'center',
      alignItems: isLandscape ? 'flex-end' : 'flex-start',
      paddingHorizontal: theme.spacing[16],
      paddingTop: isLandscape ? theme.spacing[10] : theme.spacing[16],
      paddingBottom: isLandscape ? theme.spacing[10] : theme.spacing[16],
      backgroundColor: theme.colors[themeValue]?.white,
      borderWidth: 1,
      borderColor: theme.colors[themeValue]?.borderColor,
      borderRadius: 4,
      shadowColor: theme.colors[themeValue]?.textColor,
      shadowRadius: 1,
      shadowOpacity: 0.3,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    counterNumber: {
      fontFamily: theme.fonts.interLight,
      fontSize: theme.fontSize['3xl'],
      color: theme.colors[themeValue]?.textColor,
    },
    counterText: {
      fontFamily: theme.fonts.interLight,
      fontSize: isLandscape ? theme.fontSize.base : theme.fontSize.sm,
      fontWeight: theme.fontWeight.normal,
      color: theme.colors[themeValue]?.textColor,
      marginTop: 3,
      ...counterTextLandscape,
    },
  });
};

export default dynamicStyles;
