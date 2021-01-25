import * as actionTYPES from "./constants";

const defultState = {
    city: '',
    temp: '',
    feelsLike: '',
    windSpeed: '',
    humidity: '',
    clouds: '',
    weatherForFewDays: [],
    loading: false,
    loaderForMoreWeatherScreen: false,
}
export default function gameReducers(state = defultState, action){
    switch(action.type){
        case actionTYPES.CITY_INPUT_VALUE:
            return {
                    ...state,
                    city: action.city,
                    temp: action.temp,
                    feelsLike: action.feelsLike,
                    windSpeed: action.windSpeed,
                    humidity: action.humidity,
                    clouds: action.clouds,
                    loading: false,
                };
        case actionTYPES.WEATHER_FOR_FEW_DAYS:
            return {
                ...state,
                weatherForFewDays: action.payload,
                loaderForMoreWeatherScreen: false,
            }
        case actionTYPES.RESET_WEATHER:
            return {
                ...state,
                weatherForFewDays: action.weatherForFewDays
            }
        case actionTYPES.START_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTYPES.END_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case actionTYPES.START_LOADING_FOR_MORE_WEATHER_SCREEN:
            return {
                ...state,
                loaderForMoreWeatherScreen: action.loading
            }    
        case actionTYPES.END_LOADING_FOR_MORE_WEATHER_SCREEN:
            return {
                ...state,
                loaderForMoreWeatherScreen: action.loading
            }    
        default: return state
    }
}