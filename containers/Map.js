import React, { Component } from 'react'
import { Constants, Location } from 'expo';
import { Permissions } from 'expo-permissions'
import MapView from 'react-native-maps';

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';

class Map extends Component {
    static navigationOptions = {
        title: 'Map',
        headerStyle: {
            backgroundColor: '#EA4C89'
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            fontWeight: 'bold'
        }
    }

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            region: {
                latitude: props.navigation.getParam("latitude"),
                longitude: props.navigation.getParam("longitude"),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <MapView style={{ alignSelf: 'stretch', flex:1}}
                    region={this.state.region}
                />
            </SafeAreaView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EA4C89",
        width: "100%"
    }
})

export default Map;