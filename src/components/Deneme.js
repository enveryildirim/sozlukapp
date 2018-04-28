import React, { Component } from 'react';
import { Spinner, AsyncStorage } from 'react-native';
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Form,
  Text,
  CheckBox, ListItem, Icon, Picker
} from 'native-base';
import firebase from 'firebase';

import { Actions } from 'react-native-router-flux';


class Deneme extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', passwordcorrect: '', rememberMe: false, lang: '' };
    //this.clickDeneme=this.clickDeneme.bind(this);
    //this.clickDeneme();
  } 
  
  clickDeneme() {
  
    firebase.auth().signInWithEmailAndPassword('ahsenahsen1900@gmail.com', '123456')
    .then(user => {
      user.updateProfile({
        displayName: "en"
      }).then(function() {
        alert(JSON.stringify(user));
      }).catch(function(error) {
        // An error happened.
      });
    });
    alert('sad');
  }

  clickEmailSent(){
   
      firebase.auth().createUserWithEmailAndPassword('ahsenahsen1900@gmail.com' , '123456')
      .then(user=>{
        alert("azs");
        
        
      })
      .catch(err=>{

      });
  }

  render() {
    return (
      <Container>
       <Content>
       <Button block onPress={() =>this.clickDeneme()} > 
      <Text>Sign In</Text>
      </Button>
        </Content>
      </Container>
    );
  }
}

export default Deneme;

