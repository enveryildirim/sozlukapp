import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
//sayfalar 
import SozlukList from './components/SozlukList';
import SozlukDetay from './components/SozlukDetay';
import TestForm from './components/TestForm';
import AramaForm from './components/Arama';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TabPage from './components/TabsPage';
import SozlukPaylas from './components/SozlukPaylas';
import Deneme from './components/Deneme';
import TabPage2 from './components/TabPageProfil';
import sozlukListIndirilen  from './components/SozlukIndirilen';
import Profile  from './components/Profil';
import Uyelik from './components/Uyelik';

class RouterComponent extends Component {
   render() {
    return (
      <Router>
           <Stack key='root'>
                <Scene key='deneme' component={Deneme} hideNavBar />
                <Scene key='profile' component={Profile} hideNavBar />
                <Scene key='uyelik' component={Uyelik} hideNavBar />                
                <Scene key='sozlukIndirilen' component={sozlukListIndirilen} hideNavBar />            
                <Scene key='sozlukPaylas' component={SozlukPaylas} hideNavBar />
                <Scene key='login' component={LoginForm} hideNavBar />
                <Scene key='register' component={RegisterForm} hideNavBar />                
                <Scene key='sozlukList' component={SozlukList} initial hideNavBar />
                <Scene key='sozlukDetay' component={SozlukDetay} hideNavBar />
                <Scene key='testForm' component={TestForm} hideNavBar />
                <Scene key='arama' component={AramaForm} hideNavBar />
          </Stack>
      </Router>
    );
}
}

export default RouterComponent;
