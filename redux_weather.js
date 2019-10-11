import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

//Actions & Action Creators
const ADD_PLACE = 'ADD_PLACE'
const REMOVE_PLACE = 'REMOVE_PLACE'

const GET_WEATHERINFO_STARTED = 'GET_WEATHERINFO_STARTED'
const GET_WEATHERINFO_SUCCESS = 'GET_WEATHERINFO_SUCCESS'
const GET_WEATHERINFO_FAILED = 'GET_WEATHERINFO_FAILED'

export function addPlace(place) {
    return {
        type: ADD_PLACE,
        place
    }
}

export function removePlace(place) {
    return {
        type: REMOVE_PLACE,
        place
    }
}

export function getWeatherInfoStarted() {
    return {
        type: GET_WEATHERINFO_STARTED
    }
}

export function getWeatherInfoSuccess(place) {
    console.log('get weatherinfo success called')
    return {
        type: GET_WEATHERINFO_SUCCESS,
        place
    }
}

export function getWeatherInfoFailed(error) {
    return {
        type: GET_WEATHERINFO_FAILED,
        error
    }
}

//thunk action
export function getWeatherInfo(zipCode) {
    console.log('calling api')
    return (dispatch) => {
        
        dispatch(getWeatherInfoStarted())

        let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=6644e680d2025e3820e93d0f13adb2ff`;
        var geoUrl=`http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipCode}&maxRows=10&username=varmab`
                
        fetch(weatherUrl)
            .then(response => response.json())
            .then(weatherInfo => {
                fetch(geoUrl)
                    .then(response => response.json())
                    .then(gpsInfo => {
                        let tempFarnheit = Math.round(9 / 5 * (weatherInfo.main.temp - 273) + 32);
                        let place={
                            zipCode,
                            weather:{
                                area: weatherInfo.name,
                                description: weatherInfo.weather[0].description,
                                temparature: tempFarnheit
                            },
                            gps:{
                                latitude:gpsInfo.postalCodes[0].lat,
                                longitude:gpsInfo.postalCodes[0].lng,
                            }
                        }
                        dispatch(addPlace(place))
                        dispatch(getWeatherInfoSuccess(weather));
                    })
                    .catch((err)=>{
                        dispatch(getWeatherInfoFailed(err));
                    })
                
            })
            .catch((err) => {
                dispatch(getWeatherInfoFailed(err));
            })

    }
}

//Reducer
const places = (state = [], action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case ADD_PLACE:
            return [
                ...state,
                {   
                    id:state.length+1,
                    zipCode:action.place.zipCode,
                    weather:{
                        area: action.place.weather.area,
                        description: action.place.weather.description,
                        temparature: action.place.weather.temparature
                    },
                    gps:{
                        longitude:action.place.gps.longitude,
                        latitude:action.place.gps.latitude
                    }
                }
            ]
        case REMOVE_PLACE:
            return state.filter((currentPlace) => {
                return currentPlace.zipCode != action.place.zipCode
            })
        default:
            return state;
    }
}

const weatherInfo = (state = {
    loading: false,
    error: false,
    weather: {
        area: '',
        description: '',
        temparature: ''
    }
}, action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case GET_WEATHERINFO_STARTED:
            return {
                loading: true,
                error: false,
                weather: {
                    area: '',
                    description: '',
                    temparature: ''
                }
            }
        case GET_WEATHERINFO_SUCCESS:
            return {
                loading: false,
                error: false,
                weather: {
                    ...action.weather
                }
            }
        case GET_WEATHERINFO_FAILED:
            return {
                loading: false,
                error: true,
                weather: {
                    area: '',
                    description: '',
                    temparature: ''
                }
            }
        default:
            return state;
    }
}

var rootReducer = combineReducers({ places, weatherInfo });
//Store
export const store = createStore(rootReducer, applyMiddleware(thunk));