import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import theme from '../themes/theme';
import {
  selectAllFans,
  selectCountPages,
  selectCounters,
  selectLoading,
  selectNextPage,
  selectPreviousPage,
} from '../redux/services/selects';
import {useAppDispatch, useAppSelector} from '../hooks/useStoreHooks';
import {CardList} from '../components/CardList/CardList';
import {CounterList} from '../components/CounterList/CounterList';
import {Header} from '../components/Header/Header';
import {Loader} from '../components/Loader/Loader';
import {filterElements} from '../helpers/filterElements';
import {QueryParamsEnums, Urls} from '../types/enums/QueryEnums';
import {loadFans} from '../redux/services/asyncThunk';
import {
  clearFans,
  toggleFavorite,
  changeСounter,
  toggleLoading,
} from '../redux/slices/fansSlice';
import {Nullable} from '../types/utility';
import {useLandscape} from '../hooks/useLandscape';
import {PaginationEnums} from '../types/enums/PaginationEnums';

export const MainScreen = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    `${Urls.baseUrl}/${QueryParamsEnums.people}`,
  );
  const [startNumberPage, setStartNumberPage] = useState<number>(1);
  const [endNumberPage, setEndNumberPage] = useState<number>(
    PaginationEnums.step,
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const allFans = useAppSelector(selectAllFans);
  const loading = useAppSelector(selectLoading);
  const counters = useAppSelector(selectCounters);
  const countPages = useAppSelector(selectCountPages);
  const previousPage = useAppSelector(selectPreviousPage);
  const nextPage = useAppSelector(selectNextPage);
  const dispatch = useAppDispatch();
  const isLandscape = useLandscape();

  useEffect(() => {
    dispatch(loadFans(currentPageUrl));
    setInputValue('');
  }, [currentPageUrl, dispatch]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const clearFansHandler = useCallback(() => {
    dispatch(clearFans());
  }, [dispatch]);

  const toggleFavoriteHandler = useCallback(
    (id: string) => {
      dispatch(toggleFavorite(id));
      dispatch(changeСounter(id));
    },
    [dispatch],
  );

  const navigationPageHandler = useCallback(
    (direction: 'previous' | 'next', page: Nullable<string>) => {
      const callback =
        direction === 'previous'
          ? (prev: number) => prev - PaginationEnums.step
          : (prev: number) => prev + PaginationEnums.step;
      if (page) {
        dispatch(toggleLoading());
        setCurrentPageUrl(page);
        setStartNumberPage(callback);
        setEndNumberPage(callback);
      }
    },
    [dispatch, setCurrentPageUrl, setStartNumberPage, setEndNumberPage],
  );

  const isHide = Platform.OS === 'ios' && isLandscape && isKeyboardShow;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <SafeAreaView style={styles.safeAreaViewTopStyle} />
          <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.container}>
              {!isHide && <Header title="Fans" onPress={clearFansHandler} />}
              {!isHide && <CounterList counters={counters} />}
              {loading ? (
                <Loader
                  style={[
                    styles.loaderStyle,
                    isLandscape && styles.loaderStyleLandscape,
                  ]}
                />
              ) : (
                <CardList
                  allFans={filterElements(allFans, inputValue)}
                  onChangeText={setInputValue}
                  onPress={toggleFavoriteHandler}
                  countPages={countPages}
                  previousPageHandler={() =>
                    navigationPageHandler('previous', previousPage)
                  }
                  nextPageHandler={() =>
                    navigationPageHandler('next', nextPage)
                  }
                  previousPage={previousPage}
                  nextPage={nextPage}
                  startNumberPage={startNumberPage}
                  endNumberPage={endNumberPage}
                />
              )}
            </View>
          </SafeAreaView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidStyle: {
    flex: 1,
  },
  safeAreaViewTopStyle: {
    flex: 0,
    backgroundColor: theme.colors.grey,
  },
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: theme.colors.grey,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    paddingVertical: theme.spacing[20],
    paddingHorizontal: theme.spacing[16],
  },
  loaderStyle: {
    flex: 10,
    justifyContent: 'flex-start',
  },
  loaderStyleLandscape: {
    marginTop: 10,
    flex: 8,
  },
});
