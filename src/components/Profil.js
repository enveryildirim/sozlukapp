import React, { Component } from 'react';
import { ActivityIndicator, Spinner, AsyncStorage, View } from 'react-native';
import { Container, Content, Input, Item,
Form,
Picker,
Button,
Text,
List,
ListItem,
Right,
Body,
Icon,
Textarea,
Footer,
FooterTab
} from 'native-base';
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";
import U from '../data/Utils';

class RegisterForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected1: 'en',
      name: '',
      adress: '',
      password: '',
      passwordconfirm: '',
      lang: 'en',
      data: [],
      value: '',
      loading: true
    };
  }
  componentWillMount() {
    this.setState({ loading: true });
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`profiles/${currentUser.uid}/`)
    .once('value', (snap) => {
      const { info, links } = snap.val();
      this.setState({ data: links, value: info, loading: false }); 
    });
  }
  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }  
  
  onClickSave() {
    const { name, lang, data, adress } = this.state;
    if (name === '' || adress === '') {
      alert('Boş alan bırakmayınız');
    }
    data.push({ name, lang, adress });
    this.setState({ data, name: '', adress: '' });
  }
  onDeleteItem(item) {
    alert('Kontroll yapılacak');
    const { data } = this.state;
    const tmp = U.remove(data, item);
    this.setState({ data: tmp });
  }
  onPublish() {
    const { data, value } = this.state;
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref(`profiles/${currentUser.uid}/`)
    .set({ links: data, info: value })
    .then((result) => {
      alert('Güncellendi');
    })
    .catch((err) => {
      alert(JSON.stringify(err));
    });
  }
  render() {
    if (this.state.loading) {
      return (<View>
      
      <ActivityIndicator size="large" color="#0000ff" />
      
      
        </View>
        
    );
    }
  return (
      <Container>
        <Content>
        <Form>
          <Button block danger onPress={() => this.onPublish()}><Text>Yayınla</Text></Button>
        <Textarea rowSpan={4} bordered placeholder="Hakkınızda......" value={this.state.value} onChangeText={(value) => this.setState({ value })} style={{ borderRadius: 20, marginTop: 20, fontSize: 25 }} />
        <Picker
              iosHeader="Select Your Language"
              mode="dropdown"
              placeholder="Select Your Language"
              selectedValue={this.state.lang}
              onValueChange={(lang) => { this.setState({ lang }); }}
        >
              <Item label="Facebook" value="fa" />
              <Item label="Twitter" value="tw" />
              <Item label="İnstagram" value="in" />
              <Item label="Linked" value="li" />
              <Item label="Google" value="go" />
              <Item label="Custom" value="cu" />
            </Picker>
            <Item regular>
          <Input placeholder='Name' value={this.state.name} onChangeText={name => { this.setState({ name }); }} />
          </Item>
          <Item regular>
          <Input placeholder='Adress' value={this.state.adress} onChangeText={adress => { this.setState({ adress }); }} />
          </Item>
          
            </Form>
            <Button block style={{ margin: 15, marginTop: 10 }} onPress={() => this.onClickSave()} > 
            <Text>Kaydet </Text>
          </Button>
          <List
dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem icon>
                <Body>
                <Text>{item.name}---{item.lang}</Text>
                </Body>
                <Right>
                  <Button transparent danger onPress={() => alert(`${item.name}-${item.adress}`)}>
                    <Text>Sil</Text>
                </Button>
                <Icon name="arrow-forward" active onPress={() => this.onDeleteItem(item)} />
              </Right>
              </ListItem>
            }
          />
        </Content>
        <Footer>
          <FooterTab>
        <Button vertical onPress={() => Actions.sozlukPaylas()}>
              <Icon name="apps" />
              <Text>Paylaştıklarım</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Profilim</Text>
            </Button>
            <Button vertical onPress={() => Actions.uyelik()}>
              <Icon name="camera" />
              <Text>Uyelik</Text>
            </Button>
           </FooterTab>
           </Footer>
      </Container>
    );
  }
}

export default RegisterForm;

