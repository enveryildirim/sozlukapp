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
  CheckBox, ListItem, Icon, Picker, Footer, FooterTab, Title, Header, Left
} from 'native-base';
import firebase from 'firebase';

import { Actions } from 'react-native-router-flux';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', passwordcorrect: '', rememberMe: false, lang: '' };
  }

  renderButton() {
    if (!this.props.loading) {
      return (<Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.clickRegister()} > 
      <Text>Sign In</Text>
      </Button>);
    }
    return <Spinner size="small" />;
  }
  clickDogrula() {
    const { email, password, passwordcorrect, lang } = this.state;
    if (email === '' || password === '' || passwordcorrect === '') {
      alert('Boş alan bırakmayın');
      return false;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      alert('Email Valid değil ');
      return false;
    }
    return true;
  }
  db_save() {
    alert('veritabanı kayıt yapılacak');
  }
  clickRegister() {
    const { email, password, passwordcorrect, lang } = this.state;
    if (this.clickDogrula()) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        this.db_save();
        user.updateProfile({ displayName: lang });
        user.sendEmailVerification().then(() => {
         alert('Email gönderildi etkinleştirilme login olmadan önce email kayıt ettitin');
        }).catch((error) => {
          alert('Gönderilirken hata oluştu');
        });
    })
    .catch((err) => {
      console.log(err);
      alert('Hata oluştu');
    });
  }
  }
    renderHeader() {
    return (<Header>
      <Left>
        <Button transparent onPress={() => { Actions.sozlukList(); }}>
          <Icon name='home' />
        </Button>
      </Left>
      <Body>
        <Title>Paylaşılan Sözlükler</Title>
      </Body>
    </Header>
       );
  }
  render() {
    return (
      <Container>
        {this.renderHeader()}
       <Content>
          <Form>
            <Item>
              <Input placeholder='Email' value={this.state.email} onChangeText={(email) => { this.setState({ email }); }} />
              <Icon active name='close' onPress={() => { this.setState({ email: '' }); }} />
            </Item>
            <Item >
              <Input placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(password) => { this.setState({ password }); }} />
              <Icon active name='close' onPress={() => { this.setState({ password: '' }); }} />            
            </Item>
            <Item >
              <Input placeholder='Password Correct' secureTextEntry value={this.state.passwordcorrect} onChangeText={(passwordcorrect) => { this.setState({ passwordcorrect }); }} />
              <Icon active name='close' onPress={() => { this.setState({ passwordcorrect: '' }); }} />            
            </Item>
            <Item style={{ flex: 1, flexDirection: 'row' }}>
              <Text>Your Language</Text>
            <Picker
              iosHeader="Select Your Language"
              mode="dropdown"
              placeholder="Select Your Language"
              selectedValue={this.state.lang}
              onValueChange={(lang) => { this.setState({ lang }); }}
             style={{ width: 150 }}
            >
              <Item label="Facebook" value="fa" />
              <Item label="Twitter" value="tw" />
              <Item label="İnstagram" value="in" />
              <Item label="Linked" value="li" />
              <Item label="Google" value="go" />
            </Picker>
            </Item>
          </Form>
          {this.renderButton()}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => Actions.login()}>
              <Icon name="apps" />
              <Text>Login</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Register</Text>
            </Button>
           
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default LoginForm;

