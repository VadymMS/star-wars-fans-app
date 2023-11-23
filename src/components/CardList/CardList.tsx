import React, {useMemo} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {IFanInfo, IFan} from '../../types/appState';
import {SearchBar} from '../SearchBar/SearchBar';
import {CardListHeadersEnums} from '../../types/enums/CardListHeadersEnums';
import {useLandscape} from '../../hooks/useLandscape';
import {Nullable} from '../../types/utility';
import {useAppSelector} from '../../hooks/useStoreHooks';
import {selectDarkTheme} from '../../redux/services/selects';
import dynamicStyles from './styles';
import {NavigationType} from '../../types/navigation';
import {Card, Empty, Footer, Header, Separator} from './CardListUI';

interface ICardListProps {
  allFans: Array<IFan>;
  onPress: (fanInfo: IFanInfo) => void;
  onChangeText: (value: string) => void;
  navigationPageHandler: (
    direction: NavigationType,
    page: Nullable<string>,
  ) => void;
  startNumberPage: number;
  endNumberPage: number;
}

export const CardList = ({
  allFans,
  onPress,
  onChangeText,
  navigationPageHandler,
  startNumberPage,
  endNumberPage,
}: ICardListProps) => {
  const isDark = useAppSelector(selectDarkTheme);
  const cardListHeaders = Object.values(CardListHeadersEnums);
  const isLandscape = useLandscape();

  const handleHeader = () => <Header titles={cardListHeaders} />;
  const handleRenderItem = ({item}: {item: IFan}) => (
    <Card info={item} onPress={onPress} />
  );
  const handleFooter = () => (
    <Footer
      navigationPageHandler={navigationPageHandler}
      startNumberPage={startNumberPage}
      endNumberPage={endNumberPage}
    />
  );
  const handleEmpty = () => <Empty title="No results found." />;
  const handleSeparator = () => <Separator />;

  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={onChangeText} />
      <View style={styles.listContainer}>
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
          <FlatList
            data={allFans}
            ItemSeparatorComponent={handleSeparator}
            renderItem={handleRenderItem}
            keyExtractor={({id}) => id}
            ListHeaderComponent={handleHeader}
            ListEmptyComponent={handleEmpty}
            ListFooterComponent={handleFooter}
          />
        </ScrollView>
      </View>
    </View>
  );
};
