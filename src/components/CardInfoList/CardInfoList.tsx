import React, {useMemo} from 'react';
import {View} from 'react-native';
import {CardInfoListHeadersEnums} from '../../types/enums/CardInfoListHeadersEnums';
import {CardInfo} from './CardInfo/CardInfo';
import {useLandscape} from '../../hooks/useLandscape';
import dynamicStyles from './styles';

interface ICardInfoList {
  info: Array<string>;
}

export const CardInfoList = ({info}: ICardInfoList) => {
  const cardInfoHeaders = Object.values(CardInfoListHeadersEnums);
  const isLandscape = useLandscape();
  const styles = useMemo(() => dynamicStyles({isLandscape}), [isLandscape]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        {cardInfoHeaders.map((title, index) => (
          <CardInfo value={title} key={index.toString()} />
        ))}
      </View>
      <View style={styles.containerInfo}>
        {info.map((infoItem, index) => (
          <CardInfo value={infoItem} key={index.toString()} />
        ))}
      </View>
    </View>
  );
};
