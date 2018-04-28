import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, FooterTab, Title, Footer, H1, H3, Textarea } from 'native-base';

import db from '../data/sozluk';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

//const value = '';

const c = null;
class TestForm extends Component {
    constructor(props) {
        super(props);
        const t = db.getSozluk(this.props.id);
        
        //const { current, soru, cevap, tip } = this.rastgele();
        //alert(JSON.stringify(t));
        this.state = { data: t, current: t.kelimeler[0], soru: '', cevap: '', aciklama: '', value: '', tip: 0, toplam: 1, btn_active: -1 };
    }
componentWillMount() {
  this.rastgele();
}
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    rastgele() {
        const t = this.state.data;
        const len = t.kelimeler.length;
        const k = t.kelimeler.sorted([['toplam', false], ['yanlis', true]]);
      
        //Math.floor(Math.random() * Math.floor(max));
        //const a1 = this.getRandomInt(len);
        const current = k[0].id;
        const soru = k[0].kelime;
        const cevap = k[0].cevap;
        const aciklama = k[0].aciklama ? k[0].aciklama : 'ipucu yok';
        let tip = this.getRandomInt(4); //Math.floor(Math.random() * Math.floor(4)); 
        let c2 = '';
        let c3 = '';
        let c4 = '';
        if (len < 4) {
          tip = this.getRandomInt(2);
        }
        switch (tip) {
          case 0 : 
            this.renderSoru = this.renderA;
            this.setState({ current: k[0], soru, cevap, tip, value: '', aciklama });
          break;
          case 1 :
            this.renderSoru = this.renderA;
            this.setState({ current: k[0], soru: cevap, cevap: soru, tip, value: '', aciklama });
          break;
          case 2 : 
            this.renderSoru = this.renderB;
            c2 = k[1].cevap;
            c3 = k[2].cevap;
            c4 = k[3].cevap;
            c = [cevap, c2, c3, c4];
            c = this.shuffleArray(c);
            this.setState({ current: k[0], soru, cevap, tip, value: '', btn_active: -1, aciklama });
          break;
          case 3: 
            this.renderSoru = this.renderB;
             c2 = k[1].kelime;
             c3 = k[2].kelime;
             c4 = k[3].kelime;
            c = [soru, c2, c3, c4];
            c = this.shuffleArray(c);
            this.setState({ current: k[0], soru: cevap, cevap: soru, tip, value: '', btn_active: -1, aciklama });
          break;
          default:
            console.log('hata');
    }
  }

    clickCikis() {
        Alert.alert(
            'Uyarı',
            'Testten Çıkmak İstiyor musunuz',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => Actions.pop() },
            ],
            { cancelable: false }
          );
    }
    clickIpucu(ip) {
      Alert.alert(
          'İpucu',
         ip,
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            
          ],
          { cancelable: false }
        );
  }

  controlCevap(dogru, cevap) {
    const d = d.toLowerCase().trim();
    const ce = ce.toLowerCase().trim();
    if (d === ce) return true;
    if (d.length < ce.length + 1 || d.length > ce.length - 1 || d.length === ce.length) {

    }
  }
    clickCevap() {
      const { soru, cevap, value, current, tip } = this.state;
      if (value === '') {
        alert('Lütfen Boş Bırakmayınız');
        return;
      }
      db.updateGosterim(current);
      
      if (cevap === value) {
        alert(`Doğru:${cevap}`);
        db.updateDogru(current);
      } else {
        alert(`Yanlış:${value} -- Dogru:${cevap}`);
        db.updateYanlis(current);
      }
      
      this.rastgele();
    }
    
     shuffleArray(arr) {
       return arr
          .map(a => [Math.random(), a])
          .sort((a, b) => a[0] - b[0])
          .map(a => a[1]);
     }

    renderA() {
        return (
            <Form style={{ flex: 1 }}>
        
             <Textarea rowSpan={4} bordered placeholder="Cevabınız......" value={this.state.value} onChangeText={(value) => this.setState({ value })} style={{ borderRadius: 20, marginTop: 20, fontSize: 25 }} />
          
          </Form>
        );
      }
      btnActive(d) {
        const btn_active = this.state.btn_active;
        if (btn_active === -1) { return false; }
        if (d === btn_active) {
            return true; 
}
            return false;
      }
      renderB() {
          return (
        <Form style={{ marginTop: 10, flex: 1 }}>
          <Button info iconLeft block style={styles.btnSoru} disabled={this.btnActive(0)} onPress={() => { this.setState({ value: c[0], btn_active: 0 }); }}>
         
            <Text>{c[0]}</Text>
          </Button>
          <Button info iconLeft block style={styles.btnSoru} disabled={this.btnActive(1)} onPress={() => { this.setState({ value: c[1], btn_active: 1 }); }}>
        
            <Text>{c[1]}</Text>
          </Button>
          <Button info iconLeft block style={styles.btnSoru} disabled={this.btnActive(2)} onPress={() => { this.setState({ value: c[2], btn_active: 2 }); }}>
        
            <Text>{c[2]}</Text>
          </Button>
          <Button info iconLeft block style={styles.btnSoru} disabled={this.btnActive(3)} onPress={() => { this.setState({ value: c[3], btn_active: 3 }); }}>
        
            <Text>{c[3]}</Text>
          </Button>
    

          </Form>
          );
      }
      clickValueChange(v) {
        this.setState(v);
      }
      getKelimeler(a) {

      }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.clickCikis()}>
                        <Icon name='close' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Test</Title>
                    </Body>
                    <Right />
                    </Header>
                <Content padder>
            <Grid>
           <Item>
                <Row style={styles.soru}>
            
                    <H1 style={styles.soruYazi}>{this.state.soru}</H1>
                    <Icon name='info' style={{ fontSize: 30, color: 'blue' }} active onPress={() => this.clickIpucu(this.state.aciklama)} /> 
               
                </Row>
              </Item>
                <Row>
                    {this.renderSoru()}
                    
                </Row>
               
            </Grid>
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
     
            <Button block style={{ flex: 1, borderRadius: 10 }} iconLeft success onPress={() => this.clickCevap()}>
            <Icon name='arrow-back' />
              <Text>Cevapla</Text>
      
            </Button>
        
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
    },
    btnSoru: {
      borderRadius: 30,
      marginBottom: 10
    
    },
    contenta: {
      flexDirection: 'row',
     
    },
    soruYazi: {
      color: '#893520',
      marginRight: 20
    },
    soru: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
    },
    a: {
      marginTop: 0
    },
    red: {
      color: 'red',
    }
  });
export default TestForm;
