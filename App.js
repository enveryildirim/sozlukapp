
import React, { Component } from 'react';
import { Text, View } from 'react-native';
/*import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';*/
//components
//import Router from './src/Router';
import Sozluk from './src/components/SozlukList';
import  Routera  from './src/Router';
import { Root } from 'native-base';

class App extends Component {
  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Root>
          <Routera />
      </Root>
    );
  }
}

export default App;
