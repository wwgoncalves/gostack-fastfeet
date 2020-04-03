import Reactotron from 'reactotron-react-native';
import { reactotronRedux as ReactotronRedux } from 'reactotron-redux';
import ReactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    .useReactNative()
    .use(ReactotronRedux())
    .use(ReactotronSaga())
    .connect();

  console.tron = tron;

  tron.clear();
}
