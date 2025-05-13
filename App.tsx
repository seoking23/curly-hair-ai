/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';
import {RootProvider} from './src/providers/RootProvider';
import {theme} from './src/theme';

const App: React.FC = () => {
  return (
    <RootProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </RootProvider>
  );
};

export default App;
