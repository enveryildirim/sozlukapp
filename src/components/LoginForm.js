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
  CheckBox, ListItem, Icon, Footer, FooterTab
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: 'ahsenahsen1900@gmail.com', password: '123456', rememberMe: false, loading: false };
  }
  componentWillMount() {
   AsyncStorage.getItem('email').then(value => { if (value !== null) this.setState({ email: value }); });
  }
  componentDidMount() {
    if (this.props.islem === 1) {
      alert('Login Olmanız Gerekiyor');
    }
    if(this.props.islem === 2){
      alert('Login olmanız Gerekiyor');
    }
  }
  renderButton() {
    if (!this.props.loading) {
      return (<Button block style={{ margin: 15, marginTop: 50 }} onPress={() => this.clickLogin()} > 
      <Text>Sign In</Text>
      </Button>);
    }
    return <Spinner size="large" />;
  }
  clickDogrula() {
    const { email, password, rememberMe } = this.state;
    if (email === '' || password === '') {
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
  clickLogin() {
    if (this.clickDogrula()) {
      this.setState({ loading: true });
      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user.emailVerified) {
          alert('Emaili aktive edininiz');
        } else {
          //alert(JSON.stringify(user));
          if (this.state.rememberMe) {
            AsyncStorage.setItem('email', email);
          }
          if (this.props.islem === 1) {
            Actions.sozlukPaylas({ data: this.props.data, islem: 1 });
          }else {
            Actions.sozlukPaylas();
          }
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        alert(err);
      });
    }
  }

  render() {
    return (
      <Container>
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
            <ListItem>
              <CheckBox checked={this.state.rememberMe} onPress={() => this.setState({ rememberMe: !this.state.rememberMe })} color="green" />
              <Body>
                <Text>Remember Me</Text>
              </Body>
            </ListItem>
          
          </Form>
          {this.renderButton()}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Login</Text>
            </Button>
            <Button vertical onPress={() => Actions.register()}>
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

