import  * as actionTYPES from "./constants";
import axios from 'axios';
import moment from 'moment';
export function enterCity(city, weather) {

    return {
          type: actionTYPES.CITY_INPUT_VALUE,
          city: city,
          temp: weather.main.temp,
          feelsLike: weather.main.feels_like,
          windSpeed: weather.wind.speed,
          humidity: weather.main.humidity,
          clouds: weather.clouds.all,
        }
  }
export function getTheWeather(city) {
      return async dispatch => {
            dispatch(startLoading())
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c84e81f0893f9f465e10a059c0ec9606`;
            try {
              const response = await axios.get(apiUrl);
              const weather = response.data;
              dispatch(enterCity(city, weather));
              dispatch(endLoading());
            } catch (error) {
              console.error(error);
              dispatch(endLoading());
            }  
      }
    }

  export function getTheWeatherForNamyDays(city, daysCount) {
      return async (dispatch, getState) => {
            dispatch(startLoading())
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=c84e81f0893f9f465e10a059c0ec9606`;
            try {
              const response = await axios.get(apiUrl);
              dispatch(endLoading());
              const weather = response.data.list;
              console.log(weather)
              for( let i = 0; i < daysCount; i++){
                const weatherForFewDays = getState().mainState.weatherForFewDays
                dispatch(setMoreWeather(weather[i], weatherForFewDays))
              }
              
            }catch (error) {
              console.error(error);
              dispatch(endLoading());
            }  
      }
    }
      
  export function setMoreWeather( weather, weatherForFewDays) {

      return {
        type: actionTYPES.WEATHER_FOR_FEW_DAYS,
        payload: [...weatherForFewDays, {
            temp: weather.main.temp,
            feelsLike: weather.main.feels_like,
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            clouds: weather.clouds.all,
            id: weather.dt,
            data: weather.dt_txt, //.split(' ')[0]
          }
        ]
      }
    }

    export function resetWeather() {
      return {
        type: actionTYPES.RESET_WEATHER,
        weatherForFewDays: []
      }
    }

    export function startLoading(){
      return {
        type: actionTYPES.START_LOADING,
        loading: true
      }
    }

    export function endLoading(){
      return {
        type: actionTYPES.END_LOADING,
        loading: false
      }
    }