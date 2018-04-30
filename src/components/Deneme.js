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
  Text
} from 'native-base';

import { Actions } from 'react-native-router-flux';
import PickerLanguage from '../common/pickerLanguage';

class Deneme extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', passwordcorrect: '', rememberMe: false, lang: 'en' };
  } 
  

  render() {
    return (
      <Container>
       <Content>
        <PickerLanguage value={this.state.lang} onValueChange={(lang) => { this.setState({ lang }); }} />
        <Button onPress={() => alert(this.state.lang)}>
          <Text>goster</Text>
        </Button>
        </Content>
      </Container>
    );
  }
}

export default Deneme;

