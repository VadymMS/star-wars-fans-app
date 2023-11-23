import React, {useCallback, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import theme from '../../themes/theme';
import {Switch} from '@gluestack-ui/themed';
import {StorageKeys} from '../../types/enums/AsyncStorageEnums';
import storage from '../../Services/storage';
import Logo from '../../assets/logo.svg';
import {useNavigation} from '@react-navigation/native';
import {useLandscape} from '../../hooks/useLandscape';
import {ScreenNavigationProp} from '../../types/navigation';
import {selectDarkTheme} from '../../redux/services/selects';
import {useAppDispatch, useAppSelector} from '../../hooks/useStoreHooks';
import {setDarkTheme} from '../../redux/slices/themeSlice';
import {useResponsiveSizes} from 'react-native-responsive-sizes';
import dynamicStyles from './styles';

export const ThemeScreen = () => {
  const isDark = useAppSelector(selectDarkTheme);
  const lightSideIcon = require('../../assets/icon-btn-light.png');
  const DarkSideIcon = require('../../assets/icon-btn-dark.png');
  const navigation = useNavigation<ScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const isLandscape = useLandscape();
  const {width} = useResponsiveSizes();
  const themeValue = isDark ? 'dark' : 'light';
  const styles = useMemo(
    () => dynamicStyles({isDark, isLandscape}),
    [isDark, isLandscape],
  );

  useEffect(() => {
    (async () => {
      const isDarkTheme = await storage.getItem(StorageKeys.isDark);
      isDarkTheme && dispatch(setDarkTheme(isDarkTheme));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleHandler = useCallback(() => {
    dispatch(setDarkTheme(!isDark));
    storage.setItem(StorageKeys.isDark, !isDark);
  }, [dispatch, isDark]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaViewTopStyle} />
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo
              width={isLandscape ? width(25) : width(70)}
              fill={theme.colors[themeValue]?.textColor}
            />
          </View>
          <Pressable
            style={styles.imageContainer}
            onPress={() => navigation.navigate('Main')}>
            <View style={styles.imageWrapper}>
              {isDark ? (
                <Image source={DarkSideIcon} style={styles.image} />
              ) : (
                <Image source={lightSideIcon} style={styles.image} />
              )}
            </View>
            <Text style={styles.imageLabel}>Push on me!</Text>
          </Pressable>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Which side will you choose?</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.textStyle}>Light side</Text>
              <Switch
                onToggle={onToggleHandler}
                value={isDark}
                size={Platform.OS === 'ios' ? 'md' : 'lg'}
                ml="$5"
                mr="$5"
                trackColor={{
                  false: theme.colors[themeValue]?.commonGrey,
                  true: theme.colors[themeValue]?.commonYellow,
                }}
              />
              <Text style={styles.textStyle}>Dark side</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
