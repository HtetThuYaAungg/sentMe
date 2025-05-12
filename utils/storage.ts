import AsyncStorage from '@react-native-async-storage/async-storage';

 const saveString = async (key : string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const saveToAsyncStorage = async (key : string, value: any) =>
  saveString(key, JSON.stringify(value));

export const getFromAsyncStorage = async (key:string) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default {
  saveToAsyncStorage,
  getFromAsyncStorage,
};
