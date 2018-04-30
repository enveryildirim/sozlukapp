

import React, { Component } from 'react';
import { Text, View } from 'react-native';
/*import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';*/
//components
//import Router from './src/Router';
import Sozluk from './src/components/SozlukList';
import Routera from './src/Router';
import { Root } from 'native-base';
import firebase from 'firebase';
import db from './src/data/sozluk';
import db_firebase from './src/data/sozlukFirebase';

class App extends Component {
	constructor(props) {
		super(props);
		let config = {
		apiKey: 'AIzaSyCQy3dGyCakDgx9X7v7p3b7t1tslkELg9o',
		authDomain: 'denemeauth.firebaseapp.com',
		databaseURL: 'https://denemeauth.firebaseio.com',
		projectId: 'denemeauth',
		storageBucket: 'denemeauth.appspot.com',
		messagingSenderId: '302052557007'
	  };
		firebase.initializeApp(config);
		//db.init();
		this.otomatikGuncelle();
	}
	componentDidMount(){
		//this.otomatikGuncelle();
	}
	otomatikGuncelle() {
		const sozlukler = db.findAll();
		sozlukler.forEach(e => {
			if (e.publish) {
				db_firebase.guncelle(e);
			}
		});
	}
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
