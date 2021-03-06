import React, { Component } from 'react'

import {
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { store,removePlace } from '../redux_weather'

class WeatherCard extends Component{
    constructor(props){
        super(props);
        this.state={
            place:props.place,
        }
    }

    displaySuperscript = (base, exponent) => {
        return <View style={{flexDirection: 'row'}}>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 45,color:"white"}}>{base}</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20,color:"white"}}>{exponent}</Text>
            </View>
        </View>
    }

    onRemove=()=>{
        store.dispatch(removePlace(this.state.place));
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Button onPress={this.onRemove} title="x" color="white" style={styles.closeButton}/>
                    <Text style={styles.areaText}>{this.state.place.weather.area}</Text>
                </View>
                <View style={styles.tempText}>{this.displaySuperscript(this.state.place.weather.temparature,"0")}</View>
                <Text style={styles.descriptionText}>{this.state.place.weather.description}</Text>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    container:{
        alignItems:"center",
        borderColor:"white",
        borderWidth:1,
        height:170,
        borderRadius:20,
        margin:10
    },
    closeButton:{
        color:"white",
        fontSize:30,
        marginLeft:10,
        width:'10%'
    },
    titleView:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-around"
    },
    areaText:{
        color:"white",
        fontSize:60,
        fontWeight:"bold",
        paddingLeft:10,
        marginLeft:0,
        width:'80%'
    },

    tempText:{
        color:"white",
        fontSize:30,
        paddingLeft:10
    },

    descriptionText:{
        color:"white",
        fontSize:30,
        paddingLeft:10
    },
    
})

export default WeatherCard;