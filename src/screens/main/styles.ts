import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    keyboardAvoidStyle: {
      flex: 1,
    },
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: theme.colors[themeValue]?.grey,
      paddingVertical: theme.spacing[20],
      paddingHorizontal: theme.spacing[16],
    },
    loaderStyle: {
      flex: 13,
      justifyContent: 'center',
    },
  });
};

export default dynamicStyles;
