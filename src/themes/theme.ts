type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold'
  | undefined;

export default {
  fontSize: {
    xxs: 8,
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
  },
  fonts: {
    inter: 'Inter-Regular',
    interBlack: 'Inter-Black', // 900
    interBold: 'Inter-Bold', // 700
    interSemiBold: 'Inter-Semi-Bold', // 600
    interExtraBold: 'Inter-Extra-Bold', // 800
    interExtraLight: 'Inter-Extra-Light', // 200
    interLight: 'Inter-Light', // 300
    interMedium: 'Inter-Medium', // 500
  },
  colors: {
    transparent: 'transparent',
    white: 'rgb(255, 255, 255)',
    grey: '#f6f5f3',
    red: 'rgba(255, 42, 36, 0.78)',
    black: 'rgba(0, 0, 0, 0.87)',
    system: {
      success: '#62e685',
      info: '#1BC6DF',
      error: '#F65130',
      warning: '#F1BA4E',
      disabled: '#aaaaaa',
      successDisabled: '#b9f3c8',
    },
  },
  borderWidth: {
    default: 1,
    0: 0,
    2: 2,
    4: 4,
    8: 8,
  },
  spacing: {
    2: 2,
    4: 4,
    8: 8,
    10: 10,
    12: 12,
    16: 16,
    17: 17,
    20: 20,
    24: 24,
    28: 28,
    32: 32,
    40: 40,
    48: 48,
    56: 56,
    64: 64,
    72: 72,
    80: 80,
  },
  fontWeight: {
    hairline: '100' as FontWeight,
    thin: '200' as FontWeight,
    light: '300' as FontWeight,
    normal: '400' as FontWeight,
    medium: '500' as FontWeight,
    semibold: '600' as FontWeight,
    bold: '700' as FontWeight,
    extrabold: '800' as FontWeight,
    black: '900' as FontWeight,
  },
  opacity: {
    0: 0,
    25: 0.25,
    50: 0.5,
    70: 0.7,
    75: 0.75,
    100: 1,
  },
};
