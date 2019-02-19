import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView
} from "react-native";
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window').width * .7;

const styles = {
	container: {
	},
	image: {
	}
}

class SearchProductsSnap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageSlider: [
				require("../assets/bici.jpg"),
				require("../assets/bici.jpg"),
				require("../assets/bici.jpg")
			]
		};
	}

	render() {
		return (
			<View style={{
				height: 150,
				width
			}}>
			</View>
		);
	}
}

export default SearchProductsSnap;
