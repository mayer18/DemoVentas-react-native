import React from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  View, 
  ListItem, 
  FlatList, 
  TouchableOpacity,
  Animated
} from 'react-native';
import ListProducts from "./screens/ListProducts";
import SearchProducts from "./screens/SearchProducts";
import GetTotal from "./screens/GetTotal";
import Header from "./screens/Header";

import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Reducers from './reducers'
import {connect} from 'react-redux'
import { RNUSBPrinter } from 'react-native-usb-printer'

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
      printerSelected: false,
      devices: [],
      response: [],
      message: '',
			total: 0
    };
  }

  componentDidMount = async () => {    
    const devices = await RNUSBPrinter.getUSBDeviceList();

    this.setState(Object.assign({}, this.state, {
      devices: devices,
      message: 'se ejecuto'
    }))
  }

  checkDevices() {
    return this.state.devices.length > 0
  }

  errorPrint() {
    console.log('No printer Connected')
    this.setState(Object.assign({}, this.state, {
      message: 'No printer connected'
    }))
  }

  printTest = async (printCut) => {//printCut is true or false 
    if (this.checkDevices()) {
      const vendorID = this.state.devices[0].vendor_id
      const productID = this.state.devices[0].product_id
      let printerSelected = await RNUSBPrinter.connectPrinter(vendorID, product_id)
      if (printerSelected) {
        console.log('try to print')
        this.setState(Object.assign({}, this.state, {
          message: 'try to print'
        }))
        if (printCut)
          RNUSBPrinter.printText("<C>This is test print</C>\n")
        else
          RNUSBPrinter.printBillTextWithCut("<C>This is test print</C>\n")
      } else {
        this.errorPrint()
      }
    } else {
      this.errorPrint()
    }
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
