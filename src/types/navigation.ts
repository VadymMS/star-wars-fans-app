import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ICardInfo} from './appState';

export type RootStackParamList = {
  Main: undefined;
  CardInfo: ICardInfo;
};

export type ScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main',
  'CardInfo'
>;
