import {StyleSheet} from 'react-native';
import {IStylesOptions} from '../../types/theme';
import theme from '../../theme/theme';

const dynamicStyles = ({isLandscape}: IStylesOptions = {}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: theme.spacing[16],
      marginBottom: isLandscape ? 0 : 15,
    },
    containerInfo: {
      width: '50%',
    },
  });
};

export default dynamicStyles;
