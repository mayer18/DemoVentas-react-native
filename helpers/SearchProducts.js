import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window').width * .7;

const config = { urlApi: 'http://apibeta.vendty.com/api/v1' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const Slider = props => (
  props.item.map((a) => {

    <View style={styles.container}>
      <TouchableHighlight style={styles.item}>
        <Text style={styles.itemText}>{a.name}</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.item}>
        <Text style={styles.itemText}>{a.name}</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.item}>
        <Text style={styles.itemText}>{a.name}</Text>
      </TouchableHighlight>
    </View>
  })
)

const numColumns = 3;

const styles = {
  container: {
		flex: 1,
		flexDirection: 'row',
  },
  itemText: {

  },
  item: {
    flex: 1,
		width: '20%',
  }
}

class SearchProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    
    fetch(`${config.urlApi}/categories`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          categories: responseJson.data,
        });
        console.log('categories')
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
  }

  partition(array, n) {
    console.log(array)
    const x = array.length ? [array.splice(0, n)].concat(this.partition(array, n)) : [];
    console.log(x)
    return x
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
            this.partition(this.state.categories, 3).map((item, i) => <Slider
              item={item}
              key={i}
            />)
          }
        </Swiper>
      </View>
    );
  }
}

export default SearchProducts;
