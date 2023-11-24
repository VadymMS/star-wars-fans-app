import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  selectAllFans,
  selectCounters,
  selectDarkTheme,
  selectLoading,
} from '../../redux/services/selects';
import {useAppDispatch, useAppSelector} from '../../hooks/useStoreHooks';
import {CardList} from '../../components/CardList/CardList';
import {CounterList} from '../../components/CounterList/CounterList';
import {Header} from '../../components/Header/Header';
import {Loader} from '../../components/Loader/Loader';
import {filterElements} from '../../helpers/filterElements';
import {QueryParamsEnums} from '../../types/enums/QueryEnums';
import {loadFans} from '../../redux/services/asyncThunk';
import {
  clearFans,
  toggleFavorite,
  toggleLoading,
} from '../../redux/slices/fansSlice';
import {Nullable} from '../../types/utility';
import {useLandscape} from '../../hooks/useLandscape';
import {PaginationEnums} from '../../types/enums/PaginationEnums';
import storageFansService from '../../Services/storageFansService';
import {IFanInfo} from '../../types/appState';
import {API_URL} from '@env';
import dynamicStyles from './styles';
import {NavigationType} from '../../types/navigation';

export const MainScreen = memo(() => {
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    `${API_URL}/${QueryParamsEnums.people}`,
  );
  const [startNumberPage, setStartNumberPage] = useState<number>(1);
  const [endNumberPage, setEndNumberPage] = useState<number>(
    PaginationEnums.step,
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);

  const allFans = useAppSelector(selectAllFans);
  const loading = useAppSelector(selectLoading);
  const counters = useAppSelector(selectCounters);
  const isDark = useAppSelector(selectDarkTheme);
  const dispatch = useAppDispatch();
  const isLandscape = useLandscape();
  const isHide = Platform.OS === 'ios' && isLandscape && isKeyboardShow;
  const styles = useMemo(() => dynamicStyles({isDark}), [isDark]);

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
    storageFansService.clearStorage();
  }, [dispatch]);

  const toggleFavoriteHandler = useCallback(
    (fanInfo: IFanInfo) => {
      dispatch(toggleFavorite(fanInfo));
      storageFansService.updateStorage(fanInfo);
    },
    [dispatch],
  );

  const navigationPageHandler = useCallback(
    (direction: NavigationType, page: Nullable<string>) => {
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
              {loading ? (
                <Loader style={styles.loaderStyle} />
              ) : (
                <>
                  {!isHide && <CounterList counters={counters} />}
                  <CardList
                    allFans={filterElements(allFans, inputValue)}
                    onChangeText={setInputValue}
                    onPress={toggleFavoriteHandler}
                    navigationPageHandler={navigationPageHandler}
                    startNumberPage={startNumberPage}
                    endNumberPage={endNumberPage}
                  />
                </>
              )}
            </View>
          </SafeAreaView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});
