import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card, CardItem,  
  Text, Button, Icon, Left, Body, Right, Title, ActionSheet,
 FooterTab, Footer, H1,
 Form, Item, Input, Label, Textarea, Picker } from 'native-base';
import SearchBar from 'react-native-searchbar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import db from '../data/sozluk';

export default class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected2: 'key0',
      key: '',
      ModalVisible: false,
      loading: false,
      loading2: false,
      data: {},
      links: []
    };
  }
  componentWillMount() {
    firebase.auth().signInWithEmailAndPassword('a@mail.com', '123456').then(aa => {
      const { currentUser } = firebase.auth();
      this.setState({ loading2: true });
      firebase.database().ref('sozluks')
      .on('value', (snap) => {
        //alert(JSON.stringify(snap.val()));
        const data = [];
        snap.forEach((a) => {
          const sozluk = a.val();
         
                   data.push(sozluk);
        });
        this.setState({ results: data, loading2: false });
      });
    });
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  onSearch(value) {
    firebase.auth().signInWithEmailAndPassword('a@mail.com', '123456').then(aa => {
      const { currentUser } = firebase.auth();
      this.setState({ loading: true });
      firebase.database().ref('sozluks')
      .orderByChild('name')
      .startAt(value)
      .on('value', (snap) => {
        //alert(JSON.stringify(snap.val()));
        const data = [];
        snap.forEach((a) => {
          const sozluk = a.val();
          if (sozluk.userid !== currentUser.uid) {
          data.push(sozluk);
          }
        });
        this.setState({ results: data, loading: false });
      });
    });
  }
indirSozluk(id) {
  const sozluk = this.state.results.filter(s => s.id === id)[0];
  db.saveIndirilen(sozluk);
}
onLoadingInfo(id) {
  this.setState({ ModalVisible: true, data: [] });
  firebase.database().ref(`profiles/${id}/`)
  .on('value', (snap) => {
    const data = snap.val();
    const links = snap.val().links;
    this.setState({ data, links });
  });
}
renderList(data) {
  alert(JSON.stringify(data));
}
renderModalYeni() {
  if (this.state.loading) {
    return (
      <Text>Yükleniyor</Text>
    );
  }
  return (
    <Modal
    isVisible={this.state.ModalVisible}
    onRequestClose={() => { this.setState({ ModalVisible: false }); }}
    animationType="slide"
    >
     <KeyboardAwareScrollView>
     <Form style={{ backgroundColor: 'white' }}>
        <Item>
          <Text>{this.state.data.info}</Text>
        </Item>
        <List
            dataArray={this.state.links}
            renderRow={(item) =>
                <Text>{item.name}</Text>
            }
        />
      </Form>

      <Button danger full onPress={() => this.setState({ ModalVisible: false })} style={{ borderRadius: 30 }}><Text> Close </Text></Button>
       
      </KeyboardAwareScrollView>
  </Modal>
  );
}
  render() {
   /* if (this.state.loading2) {
      return (<Text>Yükleniyor</Text>);
    }*/
    return (
      <Container>
        <Grid>
          <Row style={{ height: 60 }}>
          <SearchBar
            ref={(ref) => this.searchBar = ref}
            showOnLoad
            handleChangeText={(value) => { this.setState({ key: value }); this.onSearch(value); }}
            onBack={() => Actions.pop()}
          />
          </Row>
          <Row style={{ height: 50 }}>
          <Col size={1} style={{ justifyContent: 'center' }}>
          <Icon name="book" style={{ marginLeft: 10, fontSize: 40 }} />
          </Col>
            <Col size={5}>
            <Picker
              mode="dropdown"
 
             
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
            </Col>
        
          </Row>
          <Row style={{ flex: 1, backgroundColor: 'white' }}>
            {this.state.loading2 ? <Text>Yükleniyor</Text>:
            <List
            dataArray={this.state.results}
            renderRow={(item) =>
              <Card>
            <CardItem header>
              <Left>
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>{item.lang}--{item.lang2}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Text>{item.aciklama}</Text>
            </CardItem>
            <CardItem footer >
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>{item.indirilme}</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent onPress={() => this.onLoadingInfo(item.userid)}>
                  <Icon active name="chatbubbles" />
                  <Text>Paylaşan</Text>
                </Button>
              </Body>
            <Right onPress={() => { alert('İndirilme Aktif yapılacak');/*this.indirSozluk(item.id);*/ }}>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
            }
            />
          }
          </Row>
        </Grid>
       {this.renderModalYeni()}
      </Container>
    );
  }
}
