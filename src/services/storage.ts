import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};
