import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../themes/theme';
import {ExtraInfo} from './ExtraInfo/ExtraInfo';

interface IExtraInfoList {
  queryParam: string;
  idArr: Array<string>;
}

export const ExtraInfoList = ({queryParam, idArr}: IExtraInfoList) => (
  <View style={styles.container}>
    <Text style={styles.title}>{queryParam}</Text>
    {idArr.map((id, index) => (
      <ExtraInfo queryParam={queryParam} id={id} key={index.toString()} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black,
    marginVertical: 10,
  },
  title: {
    textTransform: 'capitalize',
    color: theme.colors.system.warning,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSize['3xl'],
  },
});
