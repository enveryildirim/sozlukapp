import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Modal, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, ActionSheet, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, FooterTab, Title, Card, CardItem, Footer } from 'native-base';

import { Actions } from 'react-native-router-flux';
//import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import db from '../data/sozluk';
import Utils from '../data/Utils';
import realm from '../data/realm';
const BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

class SozlukDetay extends Component {
    constructor(props) {
        super(props);
        const id = this.props.data;
        //const k = t.kelimeler.sorted([['toplam', false], ['yanlis', true]]);
        const data = db.getSozluk(id);
        const filter = data.kelimeler.sorted([['yanlis', true]]);

        //alert(JSON.stringify(filter));
        this.state = { loading: false,
selectItem: '',
updateKelimeModal: false,
newKelimeModal: false,
updateModalVisible: false,
sozluk: data,
data: filter,
name: data.name,
desc: data.aciklama,
lang: data.lang, 
lang2: data.lang2,
kelime: '',
cevap: '',
kaciklama: '',
      gkelime: '',
gcevap: '',
gaciklama: '',
name_error: false, 
kelime_error: false,
cevap_error: false };
    }
clickKelimeEkle() {
    const { kelime, cevap, kaciklama } = this.state;
    const sozluk = this.state.sozluk;
    if (kelime === '') {
      this.setState({ kelime_error: true });
      return;
    }
    if (cevap === '') {
      this.setState({ cevap_error: true });
      return;
    }
    //db.newKelime(sozluk, { kelime, cevap, aciklama: kaciklama });
    this.setState({ sozluk, data: sozluk.kelimeler, newKelimeModal: false, kelime_error: false, cevap_error: false });
}
clickUpdateSozluk() {
 const { name, desc, lang, lang2 } = this.state;
 if (name === '') {
   this.setState({ name_error: true });
   return;
 }
 const sozluk = { ...this.state.sozluk, name, aciklama: desc, lang, lang2 };
 db.update(sozluk);
 this.setState({ updateModalVisible: false, sozluk, name, desc, lang, lang2, name_error: false });
 alert('başarıyla güncellendi');
}
clickKelimeUpdate() {
  const { gkelime, gcevap, gaciklama, selectItem } = this.state;
  if (gkelime === '') {
    this.setState({ kelime_error: true });
    return;
  }
  if (gcevap === '') {
    this.setState({ cevap_error: true });
    return;
  }
  //db.updateKelime({ id: selectItem, kelime: gkelime, cevap: gcevap, aciklama: gaciklama });
  alert('Kelime Güncellendi');
  this.setState({ updateKelimeModal: false, kelime_error: false, cevap_error: false });
}
clickUpdateKelimeModalOpen(id) {
 const s = this.state.sozluk;
 this.setState({ updateKelimeModal: true, selectItem: id.id, gkelime: id.kelime, gcevap: id.cevap, gaciklama: id.aciklama });
 /*const r = realm.objectForPrimaryKey('Kelime', id.id);
 alert(JSON.stringify(r));*/
}
clickKelimeDetay(item) {
const detay = `Doğru: ${item.dogru} Yanlış: ${item.yanlis}  Toplam: ${item.toplam} \nİpucu: ${item.aciklama}`;
  Alert.alert(
    'Kelime Bilgilendirme',
    detay,
    [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ],
    { cancelable: false }
  );
}
renderKelimeDetay() {
  return (
    <Text />
  );
}
renderUpdateKelimeModal() {
  return (
    <Modal
    animationType="slide"
    visible={this.state.updateKelimeModal}
    onRequestClose={() => { this.setState({ updateKelimeModal: false }); }}
    >
    <KeyboardAwareScrollView>
          <Form style={{ backgroundColor: 'white', borderRadius: 20 }}>
        <Item error={this.state.kelime_error} >
          <Input placeholder="Kelime" onChangeText={gkelime => this.setState({ gkelime })} value={this.state.gkelime} />
          {this.state.kelime_error ? <Icon name='close-circle' /> : null }
        </Item>
        <Item error={this.state.cevap_error} >
          <Input placeholder="Cevap" onChangeText={gcevap => this.setState({ gcevap })} value={this.state.gcevap} />
          {this.state.cevap_error ? <Icon name='close-circle' /> : null }
        </Item>
        <Item last>
          <Input placeholder="Aciklama" onChangeText={gaciklama => this.setState({ gaciklama })} value={this.state.gaciklama} />
        </Item>
        <Button primary full onPress={() => this.clickKelimeUpdate()}><Text> Güncelle </Text></Button>
      <Button danger full onPress={() => this.setState({ updateKelimeModal: false, kelime_error: false, cevap_error: false })}><Text> Close </Text></Button>
      <Button danger onPress={() => this.setState({ updateKelimeModal: false })}><Text> Delete </Text></Button>
      </Form>
      
      </KeyboardAwareScrollView>
    
  </Modal>
  );
}
renderEkleModal() {
    return (
      <Modal
      animationType="slide"
      visible={this.state.newKelimeModal}
      onRequestClose={() => { this.setState({ newKelimeModal: false }); }}
      >
       <KeyboardAwareScrollView>
          <Form style={{ backgroundColor: 'white', borderRadius: 20 }}>
          <Item error={this.state.kelime_error}>
            <Input placeholder="Kelime" onChangeText={kelime => this.setState({ kelime })} value={this.state.kelime} />
            {this.state.kelime_error ? <Icon name='close-circle' /> : null }
          </Item>
          <Item error={this.state.cevap_error}>
            <Input placeholder="Cevap" onChangeText={cevap => this.setState({ cevap })} value={this.state.cevap} />
            {this.state.cevap_error ? <Icon name='close-circle' /> : null }
          </Item>
          <Item last>
            <Input placeholder="Aciklama" onChangeText={kaciklama => this.setState({ kaciklama })} value={this.state.kaciklama} />
          </Item>
          
        </Form>
        <Button primary full onPress={() => this.clickKelimeEkle()}><Text> Ekle </Text></Button>
        <Button danger full onPress={() => this.setState({ newKelimeModal: false, kelime_error: false, cevap_error: false })}><Text> Close </Text></Button>
         
        </KeyboardAwareScrollView>
    
    </Modal>
    );
  }
  renderModalUpdate() {
      return (
        <Modal
        animationType="slide"
        visible={this.state.updateModalVisible}
        onRequestClose={() => { this.setState({ updateModalVisible: false }); }}
        avoidKeyboard
        >
        <KeyboardAwareScrollView>
          <Form style={{ backgroundColor: 'white', borderRadius: 20 }}>
            <Item error={this.state.name_error}>
              <Input placeholder="Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
              {this.state.name_error ? <Icon name='close-circle' /> : null }
            </Item>
            <Item>
              <Input placeholder="Aciklama" onChangeText={desc => this.setState({ desc })} value={this.state.desc} />
            </Item>
            <Item last />
            <Text>Main Language</Text>
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
            <Text>Target Language</Text>
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
          <Button primary full onPress={() => this.clickUpdateSozluk()}><Text> Update </Text></Button>
          <Button danger full onPress={() => this.setState({ updateModalVisible: false })}><Text> Close </Text></Button>
          <Button danger onPress={() => this.setState({ updateModalVisible: false })}><Text> Delete </Text></Button>
          </KeyboardAwareScrollView>
      </Modal>
      );
    }
  renderHeader() {
    return (<Header>
      <Left>
        <Button transparent onPress={() => Actions.sozlukList()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>Sözlük İsmi</Title>
      </Body>
      <Right>
      <Button transparent onPress={() => Actions.testForm({ id: this.props.data })}>
          <Icon name='flag' />
        </Button>
        <Button transparent onPress={() => { this.setState({ updateModalVisible: true }); }}>
          <Icon name='build' />
        </Button>
        <Button
      transparent 
      onPress={() =>
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
  renderStyle(a) {
    return styles.danger;
  }
  renderList() {
    return (
  
      <List
      dataArray={this.state.data}
                  renderRow={(item) =>
                    <ListItem>
                      <CardItem style={this.renderStyle(0)}>
                          <Body style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                          <Icon
                              active
                              name="create"
                              style={{ color: '#DD5044' }}
                              onPress={() => this.clickUpdateKelimeModalOpen(item)}
                          />
                            <Text style={{ marginLeft: 15, color: 'green' }}>{item.kelime}</Text>
                            <Icon name='arrow-round-forward' style={{ marginLeft: 10, color: 'red' }} /> 
                            <Text style={{ marginLeft: 10, color: 'blue' }}>{item.cevap}</Text>
                          </Body>
                        <Right>
                          <Icon name='danger' active onPress={() => this.clickKelimeDetay(item)} />
                        </Right>
                        </CardItem>
                    </ListItem>
                  }
      />
  
    );
  }
  render() {
        return (
            <Container style={styles.container}>
              {this.renderHeader()}
              <Content padder>
              <Card style={styles.mb}>
              {this.state.loading ? this.renderLoading() : this.renderList()}
              </Card>
              {this.renderModalUpdate()}
              {this.renderEkleModal()}
              {this.renderUpdateKelimeModal()}
              </Content>
              <Footer style={{ backgroundColor: 'white' }}>
              
                <Button block style={{ flex: 1, borderRadius: 10 }} iconLeft success onPress={() => this.setState({ newKelimeModal: true })}>
            <Icon name='add' />
              <Text>Ekle</Text>
      
            </Button>
        
              
         </Footer>
           </Container>
         
        );
    }
    
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  text: {
    alignSelf: 'center',
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  danger: {
    backgroundColor: 'white'
  }
});
export default SozlukDetay;
