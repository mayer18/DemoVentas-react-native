import React from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  View, 
  ListItem, 
  FlatList, 
  Animated
} from 'react-native';
import ListProducts from "./helpers/ListProducts";
import SearchProducts from "./helpers/SearchProducts";
import GetTotal from "./helpers/GetTotal";

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Reducers from './reducers'


const config = { urlApi: 'http://apibeta.vendty.com/api/v1/products' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const dataList = [
  {
    "id": 35,
    "code": "1",
    "name": "Carne de res",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100.05
  },
  {
    "id": 36,
    "code": "2",
    "name": "Pollo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },

  {
    "id": 38,
    "code": "4",
    "name": "Arepa",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 39,
    "code": "5",
    "name": "Lechuga",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 40,
    "code": "6",
    "name": "Queso Doble Crema",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 41,
    "code": "7",
    "name": "Queso Mozzarella",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 42,
    "code": "8",
    "name": "Queso Cheddar Fundido",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 43,
    "code": "9",
    "name": "Tocineta",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 44,
    "code": "50000",
    "name": "Chorizo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 45,
    "code": "11",
    "name": "Huevo frito",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 46,
    "code": "12",
    "name": "Guacamole",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 47,
    "code": "14",
    "name": "Rodaja de Piña",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 37,
    "code": "3",
    "name": "Pan blanco",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 43,
    "code": "9",
    "name": "Tocineta",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 44,
    "code": "50000",
    "name": "Chorizo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 45,
    "code": "11",
    "name": "Huevo frito",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 46,
    "code": "12",
    "name": "Guacamole",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 47,
    "code": "14",
    "name": "Rodaja de Piña",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  },
  {
    "id": 48,
    "code": "15",
    "name": "Hamburguesa Sencilla",
    "type": "compuesto",
    "ingredients": [
      {
        "id": 35,
        "code": "1",
        "name": "Carne de res"
      },
      {
        "id": 46,
        "code": "12",
        "name": "Guacamole"
      },
      {
        "id": 37,
        "code": "3",
        "name": "Pan blanco"
      },
    ],
    "additions": [
      {
        "id": 35,
        "code": "1",
        "name": "Carne de res"
      },
      {
        "id": 46,
        "code": "12",
        "name": "Guacamole"
      },
      {
        "id": 37,
        "code": "3",
        "name": "Pan blanco"
      },
    ],
    "url": "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    "price": 100
  }
]

const width = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usbs: '',
			response: dataList,
			total: 0
    };
  }

  componentDidMount() {    
    fetch(config.urlApi, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        //(console.log(responseJson.data)
        
        /*this.setState({
          response: responseJson.data,
        });*/

      })
      .catch((error) => {
        //console.error(error);
      });
  }

  render() {
    return (
      <Provider store={createStore(Reducers)}>
    
 
			<View style={{ flex: 1,  width, flexDirection: 'row'}}>
				<View style={{ flex: 1,  width: width *.8}}>

					<SearchProducts />
					<ListProducts data={this.state.response} />
        	
      	</View>
      	<View style={{width: width * .2}}>
					<GetTotal />
      	</View>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
	
	container: {
		flex: 1,
		marginVertical: 20
	},
  flatListItem: {
    
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
