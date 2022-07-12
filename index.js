/**
 * @format
 */
import React from 'react';
import {AppRegistry, View} from 'react-native';
import App from './App';
import {paperTheme} from './Theme';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {en, registerTranslation} from 'react-native-paper-dates';
registerTranslation('en', en);

const Main = () => {
  return (
    <PaperProvider theme={paperTheme}>
      <View style={{height: '100%', width: 'auto'}}>
        <App />
      </View>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
