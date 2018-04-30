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
  CheckBox, ListItem, Icon, Picker,Footer,FooterTab, Header, Title, Left, Right,ActionSheet
} from 'native-base';
import firebase from 'firebase';

import { Actions } from 'react-native-router-flux';


const BUTTONS = ['Logout', 'Cancel'];
const CANCEL_INDEX = 1;
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', newpassword: '', passwordcorrect: '', rememberMe: false, lang: 'go' };
  }
   componentWillMount() {
    const currentUser = firebase.auth().currentUser;
    //alert(JSON.stringify(currentUser));
    this.setState({ email: currentUser.email, lang: currentUser.displayName });
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
  dbsave() {
    alert('veritabanı kayıt yapılacak');
  }
  clickRegister() {
    const { password, email } = this.state;
    if (!this.clickDogrula()) {

    } else{
        firebase.auth().currentUser.updateEmail(email)
        .then(() => alert('email güncellendi'))
        .catch(err => alert('hata'));
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
      <Right>
        <Button iconRight transparent onPress={() => alert(firebase.auth().currentUser.email)}>
        
        <Text>{firebase.auth().currentUser.email.substring(0, 5)}..</Text>
        <Icon name='person' />
        </Button>
        <Button
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: 'Üye Çıkış'
              },
              buttonIndex => {
                if (buttonIndex === 0) {
                  firebase.auth().signOut().then(() => {
                    alert('Çıkış Yapıldı');
                    Actions.sozlukList();
                  }).catch((error) => {
                    
                  });
                }
                //this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}
        >
            <Icon name='more' />
          </Button>
      </Right>
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
              <Input placeholder='New Password' secureTextEntry value={this.state.newpassword} onChangeText={(newpassword) => { this.setState({ newpassword }); }} />
              <Icon active name='close' onPress={() => { this.setState({ newpassword: '' }); }} />            
            </Item>
            <Item >
              <Input placeholder='New Password Correct' secureTextEntry value={this.state.passwordcorrect} onChangeText={(passwordcorrect) => { this.setState({ passwordcorrect }); }} />
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
            <Item >
              <Input placeholder='Last Password' secureTextEntry value={this.state.password} onChangeText={(password) => { this.setState({ password }); }} />
              <Icon active name='close' onPress={() => { this.setState({ password: '' }); }} />            
            </Item>
          </Form>
          {this.renderButton()}
        </Content>
        <Footer>
          <FooterTab>
        <Button vertical onPress={() => Actions.sozlukPaylas()}>
              <Icon name="apps" />
              <Text>Paylaştıklarım</Text>
            </Button>
            <Button vertical onPress={() => Actions.profile()}>
              <Icon name="camera" />
              <Text>Profilim</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Uyelik</Text>
            </Button>
           </FooterTab>
           </Footer>
      </Container>
    );
  }
}

export default LoginForm;

