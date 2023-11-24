import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
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
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors[themeValue]?.grey,
      paddingVertical: isLandscape ? theme.spacing[10] : theme.spacing[20],
      paddingHorizontal: 5,
    },
    title: {
      textAlign: 'center',
      fontFamily: theme.fonts.interExtraBold,
      fontSize: theme.fontSize['4xl'],
      color: theme.colors[themeValue]?.textColor,
      marginBottom: isLandscape ? 10 : 20,
      marginTop: isLandscape ? 0 : 20,
    },
    scrollViewStyle: {
      flex: 1,
      marginBottom: 10,
    },
    extraInfoListContainer: {
      paddingHorizontal: theme.spacing[20],
      marginTop: 10,
      flexDirection: isLandscape ? 'row' : 'column',
      justifyContent: isLandscape ? 'space-between' : 'flex-start',
    },
  });
};

export default dynamicStyles;
