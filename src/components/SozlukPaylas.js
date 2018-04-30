import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, Footer, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, FooterTab, CardItem, Title, Card, H3, ActionSheet } from 'native-base';

//import Modal from 'react-native-modal';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import db from '../data/sozluk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import paylas_sozluk from '../data/sozluk_paylas';
import firebase from 'firebase';


class SozlukList extends Component {
    constructor(props) {
        super(props);
        if (this.props.islem === 1) {
          const { currentUser } = firebase.auth();
          if (currentUser) {
            const sozluk = db.getSozluk(this.props.data);
            paylas_sozluk.ekle('', sozluk);
          } else {
            Actions.login({ mesaj: 'Giriş Yapmanız lazım' });
          }
        }
        const data = []; //db.findAll();
        this.state = { loading: true, data, name: '', desc: '', lang: 'en', lang2: 'tr' };
    }

    componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({ loading: true });
    firebase.database().ref('sozluks')
    .on('value', (snap) => {
      const data = [];
      snap.forEach((a) => {
        const sozluk = a.val();
       
        if (sozluk.userid === currentUser.uid) {
              data.push(sozluk);   
          }
          this.setState({ data, loading: false });
      });
    });
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
        
      </Right>
    </Header>
       );
  }
  renderLoading() {
  return (
    <Spinner color='green' />
  );
  }

  onUnPublishig(item) {
    //alert(JSON.stringify(item));
    firebase.database().ref('sozluks')
      .orderByChild('id')
      .equalTo(item.id)
      .on('value', (snap) => {
        const s = snap.val();
        const tmp = {};
        snap.forEach((value) => {
          const a = value.val();
          a.publish = false;
          tmp[value.key] = a;
        });
        firebase.database().ref('sozluks').update(tmp);
        
      });
  }
  onPublishig(item) {
    //alert(JSON.stringify(item));
    firebase.database().ref('sozluks')
      .orderByChild('id')
      .equalTo(item.id)
      .on('value', (snap) => {
        const s = snap.val();
        const tmp = {};
        snap.forEach((value) => {
          const a = value.val();
          a.publish = true;
          tmp[value.key] = a;
        });
        firebase.database().ref('sozluks').update(tmp);
       
      });
  }
  renderList() {
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
                            <Item style={{ flex: 1 }}>
                              <Text style={{ fontSize: 20, color: 'grey', flex: 1 }}>{item.aciklama}</Text>
                            </Item>
                              <Text>{item.lang}--{item.lang2}</Text>
                           
                          </Body>
                          </CardItem>
                          <CardItem footer>
                          <Button active={false} iconLeft transparent primary onPress={() => { }}>
                            <Icon name='cloud-download' />
                            <Text>{item.indirilme}</Text>
                          </Button>
                          {item.publish ?
                          <Button iconLeft transparent danger onPress={() => { this.onUnPublishig(item); }}>
                            <Icon name='close' />
                            <Text>Paylaşma Kapat</Text>
                          </Button> : 
                          <Button iconLeft transparent success onPress={() => { this.onPublishig(item); }}>
                            <Icon name='share' />
                            <Text>Paylaşma Aç</Text>
                          </Button>}
                          
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
              </Content>
              <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Paylaştıklarım</Text>
            </Button>
            <Button vertical onPress={() => Actions.profile()}>
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
