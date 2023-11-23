import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';
import {IStylesOptions} from '../../types/theme';

const dynamicStyles = ({isDark, isLandscape}: IStylesOptions = {}) => {
  const themeValue = isDark ? 'dark' : 'light';

  return StyleSheet.create({
    container: {
      flex: isLandscape ? 8 : 10,
      paddingHorizontal: theme.spacing[16],
      paddingTop: isLandscape ? theme.spacing[10] : theme.spacing[16],
      paddingBottom: isLandscape ? theme.spacing[10] : theme.spacing[16],
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors[themeValue]?.borderColor,
      backgroundColor: theme.colors[themeValue]?.white,
      width: '100%',
      justifyContent: 'flex-start',
      shadowColor: theme.colors[themeValue]?.textColor,
      shadowRadius: 1,
      shadowOpacity: 0.3,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    listContainer: {
      flex: 1,
      borderWidth: theme.borderWidth[2],
      borderRadius: 4,
      borderColor: theme.colors[themeValue]?.borderColor,
    },
  });
};

export default dynamicStyles;
