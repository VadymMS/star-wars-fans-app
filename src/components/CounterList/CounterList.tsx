import React, {memo, useMemo} from 'react';
import {FlatList} from 'react-native';
import {Counter} from './Counter/Counter';
import {ICounter} from '../../types/appState';
import {useLandscape} from '../../hooks/useLandscape';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';

interface ICounterListProps {
  counters: Array<ICounter>;
}

export const CounterList = memo(({counters = []}: ICounterListProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const isLandscape = useLandscape();

  const handleRenderItem = ({item}: {item: ICounter}) => (
    <Counter info={item} />
  );

  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={counters}
      renderItem={handleRenderItem}
      keyExtractor={({id}) => id}
      horizontal={true}
    />
  );
});
