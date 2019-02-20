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
import Header from "./helpers/Header";

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Reducers from './reducers'
import {connect} from 'react-redux'

const dataList = [
  {
    "id": 35,
    "code": "1",
    "name": "Carne de res",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 36,
    "code": "2",
    "name": "Pollo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },

  {
    "id": 38,
    "code": "4",
    "name": "Arepa",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 39,
    "code": "5",
    "name": "Lechuga",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 40,
    "code": "6",
    "name": "Queso Doble Crema",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 41,
    "code": "7",
    "name": "Queso Mozzarella",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 42,
    "code": "8",
    "name": "Queso Cheddar Fundido",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 43,
    "code": "9",
    "name": "Tocineta",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 44,
    "code": "50000",
    "name": "Chorizo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 45,
    "code": "11",
    "name": "Huevo frito",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 46,
    "code": "12",
    "name": "Guacamole",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 47,
    "code": "14",
    "name": "Rodaja de Piña",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 37,
    "code": "3",
    "name": "Pan blanco",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 43,
    "code": "9",
    "name": "Tocineta",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 44,
    "code": "50000",
    "name": "Chorizo",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 45,
    "code": "11",
    "name": "Huevo frito",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 46,
    "code": "12",
    "name": "Guacamole",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  },
  {
    "id": 47,
    "code": "14",
    "name": "Rodaja de Piña",
    "type": "ingrediente",
    "ingredients": null,
    "additions": null,
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
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
    "images": [
      "https://pos.vendty.com/uploads/vendty2_db_11423_gener2017/imagenes_productos/ba6c7b2159e9f011d6ec3016fcee443d-product.jpg",
    ],
    "price": {
      "subtotal": "100.00",
      "tax": "5.00",
      "total": "105.00"
    }
  }
]

const width = Dimensions.get('window').width;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usbs: '',
			response: [],
			total: 0
    };
  }

  componentDidMount() {    
    
  }

  render() {
    return (
      <Provider store={createStore(Reducers)}>
        <Header/>
        <View style={{ flex: 1,  width, flexDirection: 'row'}}>
          <View style={{ flex: 1,  width: width *.7}}>

            <SearchProducts />
            <ListProducts />
            
          </View>
          <View style={{width: width * .3}}>
            <GetTotal />
          </View>
        </View>
      </Provider>
    );
  }
}

export default App;

// const mapStateToProps = state => {
//   return {products: state.products}
// }

// export default connect(mapStateToProps)(App);

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
