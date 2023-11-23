import {StyleSheet, Platform} from 'react-native';
import theme from '../../themes/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';
  return StyleSheet.create({
    safeAreaViewTopStyle: {
      flex: 0,
      backgroundColor: theme.colors[themeValue]?.commonBlack,
    },
    safeAreaViewStyle: {
      flex: 1,
      backgroundColor: theme.colors[themeValue]?.commonBlack,
    },
    container: {
      backgroundColor: theme.colors[themeValue]?.grey,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      flex: 2,
      justifyContent: 'center',
      marginTop: 5,
    },
    imageContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      ...Platform.select({
        android: {
          flex: 2.5,
        },
        ios: {
          flex: 2,
        },
      }),
    },
    imageWrapper: {
      backgroundColor: theme.colors[themeValue]?.sideColor,
      borderWidth: 4,
      borderColor: theme.colors[themeValue]?.commonBlack,
      maxWidth: isLandscape ? 90 : 130,
      maxHeight: isLandscape ? 90 : 130,
      borderRadius: 100,
      padding: theme.spacing[16],
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: isLandscape ? 5 : 10,
    },
    image: {
      maxWidth: isLandscape ? 70 : 100,
      resizeMode: 'contain',
    },
    imageLabel: {
      textAlign: 'center',
      color: theme.colors[themeValue]?.textColor,
      fontFamily: theme.fonts.interMedium,
      fontSize: isLandscape ? theme.fontSize.sm : theme.fontSize.base,
    },
    contentContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    title: {
      textAlign: 'center',
      fontFamily: theme.fonts.interBlack,
      fontSize: isLandscape ? theme.fontSize['2xl'] : theme.fontSize['3xl'],
      marginVertical: isLandscape ? 0 : 20,
      color: theme.colors[themeValue]?.textColor,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: isLandscape ? 5 : 20,
    },
    textStyle: {
      color: theme.colors[themeValue]?.textColor,
      fontFamily: theme.fonts.interMedium,
      fontSize: isLandscape ? theme.fontSize.base : theme.fontSize.lg,
    },
  });
};

export default dynamicStyles;
