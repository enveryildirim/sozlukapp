import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card, CardItem,  
  Text, Button, Icon, Left, Body, Right, Title, ActionSheet,
 FooterTab, Footer, H1,
 Form, Item, Input, Label, Textarea, Picker } from 'native-base';
import SearchBar from 'react-native-searchbar';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

export default class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected2: 'key0',
      key: ''
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
/*
  <SearchBar
            ref={(ref) => this.searchBar = ref}
            showOnLoad
            hideBack
          />
*/
  render() {
    return (
      <Container>
        <Grid>
          <Row style={{ height: 60 }}>
          <SearchBar
            ref={(ref) => this.searchBar = ref}
            showOnLoad
            handleChangeText={(value) => { this.setState({ key: value }); }}
            onBack={()=>Actions.sozlukList()}
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
          <Row style={{ flex: 1, backgroundColor: 'red' }}>
            <Button onPress={() => { alert(this.state.key); }}>
              <Text>deneasdasd</Text>
            </Button>
          </Row>
        </Grid>
       
      </Container>
    );
  }
}
