import React, { Component } from 'react'

import {
    FlatList,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import WeatherCard from './WeatherCard'

import { store } from '../redux_weather'

class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }

        store.subscribe(() => {
            var state = store.getState();
            console.log(state)
            this.setState({
                places: state.places
            })
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.places}
                renderItem={(place) => {
                    console.log(place.item)
                    return (<TouchableOpacity onPress={() => {

                                this.props.navigation.navigate("Map", {latitude:place.item.gps.latitude,longitude:place.item.gps.longitude});
                            }}>
                        <WeatherCard place={place.item} />
                    </TouchableOpacity>)

                }}
                keyExtractor={(item) => {
                    return item.zipCode.toString();
                }}
            />
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Places;