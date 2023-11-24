import {useFonts} from 'expo-font';
import theme from '../theme/theme';

export const useLoadFonts = (): boolean => {
  const {fonts} = theme;
  const [loaded] = useFonts({
    [fonts.inter]: require('../assets/fonts/Inter-Regular.ttf'),
    [fonts.interBlack]: require('../assets/fonts/Inter-Black.ttf'),
    [fonts.interBold]: require('../assets/fonts/Inter-Bold.ttf'),
    [fonts.interSemiBold]: require('../assets/fonts/Inter-SemiBold.ttf'),
    [fonts.interExtraBold]: require('../assets/fonts/Inter-ExtraBold.ttf'),
    [fonts.interExtraLight]: require('../assets/fonts/Inter-ExtraLight.ttf'),
    [fonts.interLight]: require('../assets/fonts/Inter-Light.ttf'),
    [fonts.interMedium]: require('../assets/fonts/Inter-Medium.ttf'),
  });

  return loaded;
};
