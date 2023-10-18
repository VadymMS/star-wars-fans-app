import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CardInfoListHeadersEnums} from '../../types/enums/CardInfoListHeadersEnums';
import {CardInfoItem} from './CardInfoItem/CardInfoItem';
import theme from '../../themes/theme';
import {useLandscape} from '../../hooks/useLandscape';

interface ICardInfoList {
  info: Array<string>;
}

export const CardInfoList = ({info}: ICardInfoList) => {
  const cardInfoHeaders = Object.values(CardInfoListHeadersEnums);
  const isLandscape = useLandscape();
  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <View style={styles.containerInfo}>
        {cardInfoHeaders.map((title, index) => (
          <CardInfoItem value={title} key={index.toString()} />
        ))}
      </View>
      <View style={styles.containerInfo}>
        {info.map((infoItem, index) => (
          <CardInfoItem value={infoItem} key={index.toString()} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: theme.spacing[16],
    marginBottom: 15,
  },
  containerLandscape: {
    marginBottom: 0,
  },
  containerInfo: {
    width: '50%',
  },
});
