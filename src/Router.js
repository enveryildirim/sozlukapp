import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
//sayfalar 
import SozlukList from './components/SozlukList';
import SozlukDetay from './components/SozlukDetay';
import TestForm from './components/TestForm';
import AramaForm from './components/Arama';

class RouterComponent extends Component {
   render(){
    return (
      <Router>
           <Stack key='root'>
                <Scene key='sozlukList' component={SozlukList} initial hideNavBar />
                <Scene key='sozlukDetay' component={SozlukDetay} hideNavBar />
                <Scene key='testForm' component={TestForm} hideNavBar />
                <Scene key='arama' component={AramaForm} hideNavBar />
                <Scene key='test' component={AramaForm} hideNavBar />
          </Stack>
      </Router>
    );
}
}

export default RouterComponent;
