import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, Footer, FooterTab, CardItem, Title, Card, H3, ActionSheet } from 'native-base';

import firebase from 'firebase';
//import Modal from 'react-native-modal';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import db from '../data/sozluk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PickerLanguage from '../common/pickerLanguage';

const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;


class SozlukList extends Component {
    constructor(props) {
        super(props);
        alert(JSON.stringify(db.findAll()));
        this.state = { loading: false,
newModalVisible: false,
data: db.findAll(),
name: '',
desc: '',
lang: 'en',
lang2: 'tr',
       name_error: false };
    }
clickNewSozluk() {
 const { name, desc, lang, lang2 } = this.state;
 if (name === '') {
   this.setState({ name_error: true });
   return;
 }
 db.save({ name, desc, lang, lang2 });
 this.setState({ newModalVisible: false, name: '', desc: '', name_error: false });
 alert('başarıyla oluşturuldu');
}
  renderLang() {
  return (
    <PickerLanguage value={this.state.lang} onValueChange={(lang) => { this.setState({ lang }); }} />
  );
  }
    renderModalYeni() {
      return (
        <Modal
        isVisible={this.state.newModalVisible}
        onRequestClose={() => { this.setState({ newModalVisible: false }); }}
        avoidKeyboard
        animationType="slide"
        >
         <KeyboardAwareScrollView>
         <Form style={{ backgroundColor: 'white', borderRadius: 5 }}>
            <Item error={this.state.name_error}>
              <Input placeholder="Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
               {this.state.name_error ? <Icon name='close-circle' /> : null }
            </Item>
            <Item>
              <Input placeholder="Aciklama (optinatial)" onChangeText={desc => this.setState({ desc })} value={this.state.desc} />
            </Item>
            <Item last />
            <Text>Main Language</Text>
            <PickerLanguage value={this.state.lang} onValueChange={(lang) => { this.setState({ lang }); }} />
            <Text>Target Language</Text>
            <PickerLanguage value={this.state.lang2} onValueChange={(lang2) => { this.setState({ lang2 }); }} />
          </Form>
          <Button primary full onPress={() => this.clickNewSozluk()} style={{ borderRadius: 30 }}><Text> Save </Text></Button>
          <Button danger full onPress={() => this.setState({ newModalVisible: false })} style={{ borderRadius: 30 }}><Text> Close </Text></Button>
           
          </KeyboardAwareScrollView>
      </Modal>
      );
    }
  goToSozlukPaylas() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
     Actions.sozlukPaylas();
    } else {
      Actions.login({ islem: 2 });
    }
  }
  renderHeader() {
    return (<Header>
      <Left>
        <Button transparent onPress={() => { this.setState({ newModalVisible: true }); }}>
          <Icon name='add' />
        </Button>
      </Left>
      <Body>
        <Title>Sozlukler</Title>
      </Body>
      <Right>
      <Button transparent onPress={() => { Actions.arama(); }}>
          <Icon name='search' />
        </Button>
        <Button transparent onPress={() => { this.goToSozlukPaylas(); }}>
          <Icon name='briefcase' />
        </Button>
        <Button transparent onPress={() => Actions.login()}>
          <Icon name='person' />
        </Button>
        <Button
transparent onPress={() =>
        ActionSheet.show(
          {
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            title: 'Testing ActionSheet'
          },
          buttonIndex => {
            this.setState({ clicked: BUTTONS[buttonIndex] });
          }
        )}
        >
          <Icon name='more' />
        </Button>
      </Right>
    </Header>
       );
  }
  renderLoading() {
  return (
    <Spinner color='green' />
  );
  }
  clickSozlukPaylas(item) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      Actions.sozlukPaylas({ data: item.id, islem: 1 });
    } else {
      Actions.login({ data: item.id, islem: 1 });
    }
  }
  onRedirectTest(item) {
    if (item.kelimeler.length === 0) {
      alert('Kelime Eklememiniz Gerekli ');
      Actions.sozlukDetay({ data: item.id });
      return;
    }
    Actions.testForm({ id: item.id });
  }
  onPublishing(item){
    if(item.kelimeler.length===0){
      alert("Kelime Ekleyin");
    } 
    else{
      if(!item.publish) {
        this.clickSozlukPaylas(item);
      }
      else{
        alert("Zaten Yayında");
      }
    }
  }
  renderList() {
    console.log(this.props.loading);
    return (
      <List
      dataArray={this.state.data}
                  renderRow={(item) =>
                    <ListItem>
                      <Card>
                          <CardItem header>
                          
                          <Body>
                          <Item>
                          <Icon name='book' style={{ fontSize: 50, color: 'green', marginRight: 10 }} />
                          <H3> {item.name}</H3>
                          {item.publish ? <Icon name='checkmark' style={{ marginLeft: 10, color: 'green' }} /> : null}
                          </Item>
                          <Text note>{item.lang}--{item.lang2}</Text>
                          </Body>
                          <Right>
                          <Button transparent success onPress={() => { this.onPublishing(item)}}>
                            <Icon name='share' />
                          </Button>
                          </Right>   
                          </CardItem>
                          <CardItem >
                          <Body >
                              <Text style={{ fontSize: 20, color: 'grey', flex: 1 }}>{item.aciklama}</Text>
                              <Text style={{ fontSize: 10, color: 'grey', flex: 1 }}>Kelime Sayısı:{item.kelimeler.length}</Text>
                          </Body>
                          </CardItem>
                          <CardItem footer>
                          <Button iconLeft transparent primary onPress={() => { this.onRedirectTest(item); }}>
                            <Icon name='flag' />
                            <Text>Test</Text>
                          </Button>
                          <Button iconLeft transparent danger onPress={() => { Actions.sozlukDetay({ data: item.id }); }}>
                            <Icon name='build' />
                            <Text>Duzenle</Text>
                          </Button>
                         
                          </CardItem>
                      </Card>
                    </ListItem>
                  }
      />
    );
  }
    render() {
        return (
            <Container>
              {this.renderHeader()}
              <Content>
              {this.state.loading ? this.renderLoading() : this.renderList()}
              {this.renderModalYeni()}
              
              </Content>
              <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>MySozlukler</Text>
            </Button>
            <Button vertical onPress={() => Actions.sozlukIndirilen()}>
              <Icon name="camera" />
              <Text>İndirilenler</Text>
            </Button>
           
          </FooterTab>
        </Footer>
           </Container>
         
        );
    }
    
}

const styles = StyleSheet.create({
  yazi: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 20,
    marginLeft: 5,
    textDecorationLine: 'none'
  },
  contenta: {
    flexDirection: 'row',
   
  },
  a: {
    marginTop: 0
  },
  red: {
    color: 'red',
  },
});

export default SozlukList;
