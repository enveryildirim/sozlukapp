import React, { Component } from 'react';
import { Picker, Item } from 'native-base';

class PickerLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = { lang: 'en' };
    }

    render() {
        return (
        <Picker
        mode="dropdown"
        placeholder="Select One"
        note={false}
        selectedValue={this.props.value}
        onValueChange={this.props.onValueChange}
        >
        <Item label="İngilizce" value="en" />
        <Item label="Türkçe" value="tr" />
        <Item label="Almanca" value="eu" />

            </Picker>
            );
    }
}

export default PickerLanguage;
