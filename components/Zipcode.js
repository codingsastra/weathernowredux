import React, { Component } from 'react'
import { store, getWeatherInfo} from '../redux_weather'

import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Keyboard
} from 'react-native';

class Zipcode extends Component{
    constructor(){
        super();
        this.state={
            zipCode:'',
            longitude:'',
            latitude:''
        }
    }

    onZipcodeChange=(text)=>{
        this.setState({
            zipCode:text
        })
    }

    onFind=()=>{
        store.dispatch(getWeatherInfo(this.state.zipCode));
        this.setState({
            zipCode:''
        })
        Keyboard.dismiss(); //Dismiss Keyboard after submit
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
                longitude:position.coords.longitude,
                latitude:position.coords.latitude
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput keyboardType="number-pad" value={this.state.zipCode} placeholder="Enter US Zipcode" style={styles.input} onChangeText={this.onZipcodeChange}></TextInput>
                <TouchableHighlight style={styles.button} onPress={this.onFind}>
                    <Text>Add Place</Text>
                </TouchableHighlight>
                <Text>Current Location: {this.state.longitude + "/" + this.state.latitude}</Text>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        marginTop:10
    },
    input:{
        height:40,
        borderColor:"white",
        borderWidth:1,
        width:"60%",
        color:"white",
        fontSize:25
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width:100,
        marginTop:16
    }
})

export default Zipcode;