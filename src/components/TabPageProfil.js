import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon, Text, Button, Footer, FooterTab } from 'native-base';
import Tab1 from './Profil';
import Tab2 from './Uyelik';
import  { Actions } from 'react-native-router-flux';
export default class TabsAdvancedExample extends Component {
  render() {
    return (
      <Container>
        <Tabs>
       
        <Tab heading={<TabHeading><Icon name="camera" /><Text>Profile</Text></TabHeading>} >
            <Tab1 />
          </Tab>
          <Tab heading={<TabHeading><Text>Register </Text></TabHeading>}>
           <Tab2 />
          </Tab>
         
        </Tabs>
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
           
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
