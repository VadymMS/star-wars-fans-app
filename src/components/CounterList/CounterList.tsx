import React, {memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Counter} from './Counter/Counter';
import theme from '../../themes/theme';
import {ICounter} from '../../types/appState';
import {useLandscape} from '../../hooks/useLandscape';

interface ICounterListProps {
  counters: Array<ICounter>;
}

export const CounterList = memo(({counters = []}: ICounterListProps) => {
  const isLandscape = useLandscape();
  const handleRenderItem = ({item}: {item: ICounter}) => (
    <Counter info={item} />
  );

  return (
    <FlatList
      contentContainerStyle={[
        styles.container,
        isLandscape && styles.containerLandscape,
      ]}
      data={counters}
      renderItem={handleRenderItem}
      keyExtractor={({id}) => id}
      horizontal={true}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[2],
    paddingTop: theme.spacing[2],
    backgroundColor: theme.colors.grey,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  containerLandscape: {
    alignItems: 'flex-start',
  },
});
