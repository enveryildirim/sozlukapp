import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, FooterTab, CardItem, Title, Card, H3, ActionSheet } from 'native-base';

//import Modal from 'react-native-modal';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import db from '../data/sozluk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class SozlukList extends Component {
    constructor(props) {
        super(props);
        //db.init();
        //console.log(db.findAll()[0].name);
        //alert(JSON.stringify(db.findAll()));
        this.state = { loading: false, newModalVisible: false, data: db.findAll(), name: '', desc: '', lang: 'en', lang2: 'tr' };
    }
clickNewSozluk() {
 const { name, desc, lang, lang2 } = this.state;
 db.save({ name, desc, lang, lang2 });
 this.setState({ newModalVisible: false, name: '', desc: '' });
 alert('başarıyla oluşturuldu');
 //this.setState({ data: db.findAll() });
}
  renderLang() {
  return (
    <Picker
              mode="dropdown"
              placeholder="Select One"
              note={false}
              selectedValue={this.state.lang}
              onValueChange={lang => { this.setState({ lang }); }}
    >
              <Item label="İngilizce" value="en" />
              <Item label="Türkçe" value="tr" />
              <Item label="Almanca" value="eu" />

            </Picker>
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
         <Form style={{ backgroundColor: 'white', borderRadius: 20 }}>
            <Item>
              <Input placeholder="Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
            </Item>
            <Item>
              <Input placeholder="Aciklama" onChangeText={desc => this.setState({ desc })} value={this.state.desc} />
            </Item>
            <Item last />
            <Picker
              mode="dropdown"
              placeholder="Select One"
              note={false}
              selectedValue={this.state.lang}
              onValueChange={lang => { this.setState({ lang }); }}
            >
              <Item label="İngilizce" value="en" />
              <Item label="Türkçe" value="tr" />
              <Item label="Almanca" value="eu" />

            </Picker>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              note={false}
              selectedValue={this.state.lang2}
              onValueChange={lang2 => { this.setState({ lang2 }); }}
            >
              <Item label="İngilizce" value="en" />
              <Item label="Türkçe" value="tr" />
              <Item label="Almanca" value="eu" />

            </Picker>
          </Form>
          <Button primary full onPress={() => this.clickNewSozluk()} style={{ borderRadius: 30 }}><Text> Save </Text></Button>
          <Button danger full onPress={() => this.setState({ newModalVisible: false })} style={{ borderRadius: 30 }}><Text> Close </Text></Button>
           
          </KeyboardAwareScrollView>
      </Modal>
      );
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
        <Button transparent>
          <Icon name='information-circle' />
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
  renderList() {
    console.log(this.props.loading);
    return (
  
      <List
      dataArray={this.state.data}
                  renderRow={(item) =>
                    <ListItem>
                      <Card>
                          <CardItem header>
                          <Left>
                            <Icon name='book' style={{ fontSize: 50, color: 'green', marginRight: 10 }} />
                            <H3> {item.name}</H3>
                          </Left>
                    
                          </CardItem>
                          <CardItem >
                          <Body >
                           
                              <Text>{item.aciklama}</Text>
                            
                              <Text>{item.lang}--{item.lang2}</Text>
                           
                          </Body>
                          </CardItem>
                          <CardItem footer>
                          <Button iconLeft transparent primary onPress={() => { Actions.testForm({ id: item.id }); }}>
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
