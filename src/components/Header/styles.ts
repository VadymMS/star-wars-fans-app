import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      flex: isLandscape ? 2.5 : 2,
      flexDirection: 'row',
      alignItems: isLandscape ? 'flex-start' : 'flex-end',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme.colors[themeValue]?.grey,
    },
    title: {
      textTransform: 'capitalize',
      fontFamily: theme.fonts.interExtraLight,
      fontSize: theme.fontSize['3xl'],
      color: theme.colors[themeValue]?.textColor,
    },
  });
};

export default dynamicStyles;
