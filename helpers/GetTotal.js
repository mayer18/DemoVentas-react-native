import React, { Component } from 'react'
import { 
  ImageBackground,
  Image, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Dimensions, 
  TouchableHighlight,
  Animated
} from 'react-native'
import {connect} from 'react-redux'

const height = Dimensions.get('window').height;
class GetTotal extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
		}
	}
	
	componentDidMount() {
		//console.log(this.state.data)
  }
  
  getTotal() {
    return this.props.ventas.total.toFixed(2)
  }

  render() {
    console.log('this.props')
    console.log(this.props.ventas)
    console.log(this.state)
    return (
      <View style={styles.vertical}>
        <View style={styles.total}>
          <Text style={{ textAlign: 'center' }}>Subtotal</Text>
          <Text style={{ textAlign: 'center' }}>$ 0.00</Text>
        </View>
        <View style={styles.total}>
          <Text style={{ textAlign: 'center' }}>IVA</Text>
          <Text style={{ textAlign: 'center' }}>$ 0.00</Text>
        </View>
        <View style={styles.total}>
          <Text style={{ textAlign: 'center' }}>Total</Text>
          <Text style={{ textAlign: 'center' }}>$ {this.getTotal()}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {ventas: state.ventas}
}

export default connect(mapStateToProps)(GetTotal);

const styles = StyleSheet.create({
  vertical: {
		height,
		justifyContent: 'flex-end'
	},
	total: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 10
	},
});