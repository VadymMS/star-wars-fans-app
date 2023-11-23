import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ICardInfo} from './appState';

export type RootStackParamList = {
  Theme: undefined;
  Main: undefined;
  CardInfo: ICardInfo;
};

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
  'CardInfo'
>;

export type NavigationType = 'previous' | 'next';
