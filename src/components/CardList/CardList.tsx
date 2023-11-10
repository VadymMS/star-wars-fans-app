import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Card} from './Card/Card';
import {IFanInfo, IFan} from '../../types/appState';
import theme from '../../themes/theme';
import {CardListHeader} from './CardListUI/CardListHeader';
import {SearchBar} from '../SearchBar/SearchBar';
import {CardListEmpty} from './CardListUI/CardListEmpty';
import {CardListSeparator} from './CardListUI/CardListSeparator';
import {CardListHeadersEnums} from '../../types/enums/CardListHeadersEnums';
import {CardListFooter} from './CardListUI/CardListFooter';
import {useLandscape} from '../../hooks/useLandscape';
import {Nullable} from '../../types/utility';

interface ICardListProps {
  allFans: Array<IFan>;
  onPress: (fanInfo: IFanInfo) => void;
  onChangeText: (value: string) => void;
  navigationPageHandler: (
    direction: 'previous' | 'next',
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
  const cardListHeaders = Object.values(CardListHeadersEnums);
  const isLandscape = useLandscape();

  const handleHeader = () => <CardListHeader titles={cardListHeaders} />;
  const handleEmpty = () => <CardListEmpty title="No results found." />;
  const handleRenderItem = ({item}: {item: IFan}) => (
    <Card info={item} onPress={onPress} />
  );
  const handleSeparator = () => <CardListSeparator color={theme.colors.grey} />;
  const handleFooter = () => (
    <CardListFooter
      navigationPageHandler={navigationPageHandler}
      startNumberPage={startNumberPage}
      endNumberPage={endNumberPage}
    />
  );

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: theme.spacing[16],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.white,
    width: '100%',
    justifyContent: 'flex-start',
    shadowColor: theme.colors.black,
    shadowRadius: 1,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  containerLandscape: {
    paddingVertical: theme.spacing[10],
    flex: 8,
  },
  listContainer: {
    flex: 1,
    borderWidth: theme.borderWidth[2],
    borderRadius: 4,
    borderColor: theme.colors.grey,
  },
});
