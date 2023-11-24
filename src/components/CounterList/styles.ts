import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing[2],
      paddingTop: theme.spacing[2],
      backgroundColor: theme.colors[themeValue]?.grey,
      justifyContent: 'space-between',
      alignItems: isLandscape ? 'flex-start' : 'center',
      width: '100%',
    },
  });
};

export default dynamicStyles;
