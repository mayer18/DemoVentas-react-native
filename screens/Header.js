import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
  Image,
  TouchableOpacity,
	ScrollView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window');
height = height *.1
console.log(height)

const styles = {
	container: {
	},
	image: {
	}
}

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
      name: 'Nombre de la empresa'
		};
  }
  
  Refresh() {
    console.log('click')
  }

	render() {
		return (
			<View style={{
        flex: 1,
        flexDirection: 'row',
        height: height,
        maxHeight: height,
        width,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: 'black'
			}}>
        <Image  style={{width: 150, height: 40}} source={require('../assets/logo.png')}/>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{
            color: '#fff'
          }}>{this.state.name}</Text>
        </View>
          <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
          }} onPress={() => { this.Refresh() }} >
            <Ionicons name="md-refresh" size={32} color="green" />
            
          </TouchableOpacity>
			</View>
		);
	}
}

export default Header;
