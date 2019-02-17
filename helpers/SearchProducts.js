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

const { width } = Dimensions.get('window').width * .8;

const imgTest = "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg"

const Slider = props => (
  <View style={styles.container}>
    <Image style={styles.image} source={props.uri} />
    <Image style={styles.image} source={props.uri} />
    <Image style={styles.image} source={props.uri} />
  </View>
)

const styles = {
  container: {
		flex: 1,
		flexDirection: 'row',
		
  },
  image: {
    flex: 1,
		width: '20%',
		
  }
}

class SearchProducts extends Component {
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
        <Swiper
					
					showsButtons
					height={150}
					width={width}
        >
        {
            this.state.imageSlider.map((item, i) => <Slider
            uri={item}
            key={i}
          />)
        }

        </Swiper>
      </View>
    );
  }
}

export default SearchProducts;
