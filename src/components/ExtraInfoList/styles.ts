import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors[themeValue]?.grey,
      marginVertical: 10,
    },
    title: {
      textTransform: 'capitalize',
      color: theme.colors[themeValue]?.textColor,
      fontFamily: theme.fonts.interBold,
      fontSize: theme.fontSize['3xl'],
    },
  });
};

export default dynamicStyles;
