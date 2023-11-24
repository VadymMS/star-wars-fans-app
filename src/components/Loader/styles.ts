import {StyleSheet} from 'react-native';
import theme from '../../theme/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    activity: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[themeValue]?.grey,
    },
  });
};

export default dynamicStyles;
