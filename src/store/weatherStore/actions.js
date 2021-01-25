import  * as actionTYPES from "./constants";
import axios from 'axios';

  export function setCityWeather(city, weather) {
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
              dispatch(setCityWeather(city, weather));
            } catch (error) {
              console.error(error);
              dispatch(endLoading());
            }  
      }
    }
  function conversionResult(weatherForFewDays, daysCount, weather){
   
    for( let i = 0; weatherForFewDays.length <= (daysCount - 1); i++){
      if(weatherForFewDays.length === 0){
        const weatherForDay = {
          temp: weather[i].main.temp,
          feelsLike: weather[i].main.feels_like,
          windSpeed: weather[i].wind.speed,
          humidity: weather[i].main.humidity,
          clouds: weather[i].clouds.all,
          id: weather[i].dt,
          data: weather[i].dt_txt.split(' ')[0],
        }
        weatherForFewDays.push(weatherForDay);
        continue;
      }
      if(weather[i].dt_txt.split(' ')[0] !== weatherForFewDays[weatherForFewDays.length - 1].data){
        const weatherForDay = {
          temp: weather[i].main.temp,
          feelsLike: weather[i].main.feels_like,
          windSpeed: weather[i].wind.speed,
          humidity: weather[i].main.humidity,
          clouds: weather[i].clouds.all,
          id: weather[i].dt,
          data: weather[i].dt_txt.split(' ')[0],
        }
        weatherForFewDays.push(weatherForDay);
      }

    }
  }
  export function getTheWeatherForNamyDays(city, daysCount) {
      return async (dispatch) => {
            dispatch(startLoadingForMoreWeather_Screen())
            const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=c84e81f0893f9f465e10a059c0ec9606`;
            try {
              const response = await axios.get(apiUrl);
              const weather = response.data.list;
              const weatherForFewDays = [];
              conversionResult(weatherForFewDays, daysCount, weather );
              dispatch(setMoreWeather(weatherForFewDays));
            }catch (error) {
              console.error(error);
              dispatch(endLoading());
            }  
      }
    }
      
  export function setMoreWeather(weatherForFewDays) {
      return {
        type: actionTYPES.WEATHER_FOR_FEW_DAYS,
        payload: weatherForFewDays,
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
    export function startLoadingForMoreWeather_Screen(){
      return {
        type: actionTYPES.START_LOADING_FOR_MORE_WEATHER_SCREEN,
        loading: true
      }
    }
  
    export function endLoadingForMoreWeather_Screen(){
      return {
        type: actionTYPES.END_LOADING_FOR_MORE_WEATHER_SCREEN,
        loading: false
      }
    }