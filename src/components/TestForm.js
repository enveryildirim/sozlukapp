import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, List, Item, Button, Picker, Label, ListItem, 
    Form, Text, Icon, Input, Left, Body, Right, Spinner, Switch, FooterTab, Title, Footer, H1, Textarea } from 'native-base';

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
        this.state = { data: t, current: t.kelimeler[0], soru: '', cevap: '', value: '', tip: 0, toplam: 1 };
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
        const tip = this.getRandomInt(2); //Math.floor(Math.random() * Math.floor(4)); 
        db.updateGosterim(k[0]);
        if (tip === 0) {
           this.renderSoru = this.renderA;
           this.setState({ current: k[0], soru, cevap, tip });
           return { data: k, current: k[0], soru, cevap, tip, value: '' };
        } 
            this.renderSoru = this.renderA;
            
           /* const a = this.getRandomInt(len);
            const a2 = this.getRandomInt(len);
            const a3 = this.getRandomInt(len);
    
            const c2 = t.kelimeler[a].kelime;
            const c3 = t.kelimeler[a2].kelime;
            const c4 = t.kelimeler[a3].kelime;
            c = [cevap, c2, c3, c4];
            c = this.shuffleArray(c);*/
            
            this.setState({ current: [0], soru: cevap, cevap: soru, tip, value: '' });
            return { current: [0], soru: cevap, cevap: soru, tip };
    }

    clickCikis() {
        Alert.alert(
            'Uyarı',
            'Testten Çıkmak İstiyor musunuz',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => Actions.sozlukList() },
            ],
            { cancelable: false }
          );
    }
    clickCevap() {
      const { cevap, value, current } = this.state;
      if (cevap === value) {
        alert(`Doğru:${cevap}`);
        db.updateDogru(current);
      } else {
        alert(`Yanlış:${cevap} -- Dogru:${value}`);
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
      renderB() {
        /*const len = this.state.data.kelimeler.length;
        const soru = this.state.data.kelimeler[this.state.current].kelime;
        const a1 = this.getRandomInt(len);
        const a2 = this.getRandomInt(len);
        const a3 = this.getRandomInt(len);

        const cevap = this.state.data.kelimeler[this.state.current].kelime;
        const c2 = this.state.data.kelimeler[a1].kelime;
        const c3 = this.state.data.kelimeler[a2].kelime;
        const c4 = this.state.data.kelimeler[a3].kelime;
        let c = [cevap, c2, c3, c4];
        c = this.shuffleArray(c);*/

          return (
        <Form style={{ marginTop: 10 }}>
          <Button block style={styles.btnSoru} active={this.state.b} onPress={() => this.setState({ value: c[0], b: false, b1: true, b2: true, b3: true })}>
            <Text>{c[0]}</Text>
          </Button>
          <Button block style={styles.btnSoru} active={this.state.b1} onPress={() => this.setState({ value: c[0], b: false, b1: false, b2: true, b3: true })}>
            <Text>{c[1]}</Text>
          </Button>
          <Button block style={styles.btnSoru} active={this.state.b2} onPress={() => this.setState({ value: c[0], b: false, b1: true, b2: true, b3: true })}>
            <Text>{c[2]}</Text>
          </Button>
          <Button block style={styles.btnSoru} active={this.state.b3} onPress={() => this.setState({ value: c[0], b: false, b1: true, b2: true, b3: true })}>
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
            <Item style={{ flex: 1 }}>
                <Row style={styles.soru}>
                
                    <H1 style={styles.soruYazi}>{this.state.soru}</H1>
                    <Icon name='info' style={{ fontSize: 50, color: '#893520' }} /> 
               
                </Row>
                </Item>
                <Row style={{ flex: 1 }}>
                    {this.renderA()}
                    
                </Row>
               
            </Grid>
        </Content>
        <Footer>
          <FooterTab>
            <Button full success onPress={() => this.clickCevap()}>
              <Text>Cevapla</Text>
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
    },
    btnSoru: {
      borderRadius: 30
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
      alignItems: 'center'
    },
    a: {
      marginTop: 0
    },
    red: {
      color: 'red',
    }
  });
export default TestForm;
