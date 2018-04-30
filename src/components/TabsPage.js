import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import Tab1 from './LoginForm';
import Tab2 from './RegisterForm';

export default class TabsAdvancedExample extends Component {
  render() {
    return (
      <Container>
        <Tabs initialPage={1}>

          <Tab heading={<TabHeading><Icon name="camera" /><Text>Login</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={<TabHeading><Text>Register </Text></TabHeading>}>
            <Tab2 />
          </Tab>
          
        </Tabs>
      </Container>
    );
  }
}
