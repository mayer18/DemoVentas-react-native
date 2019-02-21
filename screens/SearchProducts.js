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

import {connect} from 'react-redux'
import * as actions from '../actions'

const { width } = Dimensions.get('window').width * .7;

const config = { urlApi: 'http://apibeta.vendty.com/api/v1' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const numColumns = 3;

class SearchProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currency: ''
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
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
  }

  partition(array, n) {
    const x = array.length ? [array.splice(0, n)].concat(this.partition(array, n)) : [];
    return x
  }

  selectCategorie(id) {
    fetch(`${config.urlApi}/products/category/${id}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.setProduct(responseJson.data)
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{
				height: 100,
				width
			}}>
        <Swiper
					showsButtons
					height={100}
          width={width}
          activeDot={false}
          dotColor={'transparent'}
          activeDotColor={'transparent'}
        >
          {
            this.partition(this.state.categories, 3).map((item, i) => {
              return (<View key={i} style={styles.cotainerCategories}>
                {
                  item.map((a, index) => {
                    return (<TouchableHighlight onPress={() => this.selectCategorie(a.id)} key={index} style={styles.item}>
                      <Text style={styles.itemText}>{a.name}</Text>
                    </TouchableHighlight>)
                  })
                }
              </View>)
            })
          }
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {ventas: state.ventas, products: state.products}
}

export default connect(null, actions)(SearchProducts);

const styles = {
  container: {
		flex: 1,
		flexDirection: 'row',
  },
  cotainerCategories: {
    flex: 1,
    flexDirection: 'row'
  },
  itemText: {
    textAlign: 'center'
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 15,
    borderColor: '#d6d7da',
  }
}