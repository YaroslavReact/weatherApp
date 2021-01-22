import * as React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";
import { actions } from '../store';
import { LinearGradient } from 'expo-linear-gradient'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Rect } from 'react-native-svg'
import { StyleSheet,
  TextInput, 
  Button, 
  Text, 
  View,  
  TouchableWithoutFeedback, 
  Keyboard,
  ActivityIndicator, } from 'react-native';

function TabOneScreen({
  getTheWeather, 
  city,
  temp,
  feelsLike,
  windSpeed,
  humidity,
  clouds,
  getTheWeatherForNamyDays,
  navigation,
  resetWeather,
  loading,
}) {
  const [text, setText] = useState("")
  const saveHandler = () => {
    getTheWeather(text)
    setText("")

  }
  const checkMoreWeather= (dayCount) => {
    resetWeather()
    navigation.push('MoreScreen')
    getTheWeatherForNamyDays( city, dayCount)
  }
  const presetColors = {
    instagram: [
      'rgb(106, 57, 171)',
      'rgb(151, 52, 160)',
      'rgb(197, 57, 92)',
      'rgb(231, 166, 73)',
      'rgb(181, 70, 92)'
    ],}

  return (
    <View  style={styles.container}>
      <SvgAnimatedLinearGradient  x1="0" y2="1" secondaryColor='blue' width={400} height={900} position="absolute" >
        <LinearGradient style={styles.gradient} colors={presetColors.instagram} speed={4000}/>
        <Rect  height="100%" width="100%" position="absolute" />
      </SvgAnimatedLinearGradient >
        
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss() }>  
          <View style={styles.screen} >
            <View style={styles.mainContainer}>
              <Text style={styles.head}>Узнай погоду в любом городе!</Text>
                <View style={styles.textareaContainer}>
                  <TextInput 
                    style={styles.textarea}
                    placeholder="Enter your city"
                    value={text}
                    onChangeText={setText}
                    multiline
                  />
                </View>
              <View style={styles.button}>
                <Button 
                  title="Check weather" 
                  color={"limegreen"} 
                  onPress={saveHandler}
                  disabled={!text}
                />
              </View>    
            </View>
            {loading && <View style={styles.load}><ActivityIndicator color="gold" /></View>}      
            {city.length > 0  && <View><View style={styles.weather}>    
              <Text style={styles.title}>{city}: {Math.floor(temp - 273.15)}°</Text>
              <Text style={styles.title}>Ощущается как: {Math.floor(feelsLike - 273.15)}°</Text>
              <Text style={styles.title}>Скорость ветра: {windSpeed} м/с</Text>
              <Text style={styles.title}>Влажность: {humidity}%</Text>
              <Text style={styles.title}>Облачность: {clouds}%</Text>
              
            </View>
            <View style={styles.button}>
            <Text>Check More For:</Text>
            <View style={styles.days}>
              <View style={styles.dayButton}>
                <Button 
                  title="3 day" 
                  color={"limegreen"} 
                  onPress={() => checkMoreWeather(3)}
                />
              </View>
              <View style={styles.dayButton}>
                <Button 
                  title="5 day" 
                  color={"limegreen"} 
                  onPress={() => checkMoreWeather(5)}
                />
              </View>
              <View style={styles.dayButton}>
                <Button 
                  title="7 day" 
                  color={"limegreen"} 
                  onPress={() => checkMoreWeather(7)}
                />
              </View>
            </View>
          </View>
          </View>}    
          </View>
        </TouchableWithoutFeedback> 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },  
  container: {
    flex: 1,
    position: 'relative'
  },
  gradient:{
    width: 400,
     height: 900,
     position: 'absolute',
     opacity: 0.9,
     top: 0,
     left: 0,
   },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FAEEDD",
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F984E5',
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#006df7",
    justifyContent: 'center',
    textAlign: "center",
    padding: 10,
    margin: 10,
    width: "100%",
    height: 50
  },
  weather: {
    marginTop: 10,
    paddingLeft: 40,
  },
  mainContainer: {
    backgroundColor:"#d6fffa",
    textAlign: 'center',
    width: "90%",
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textareaContainer: {
    width: "100%",
   alignItems:'center'
  },
  button:{
   width: "60%",
  },
  dayButton:{
    width: "35%",
    padding: 5
   },
  days: {
    flexDirection: "row"
  }

});

const mapStateToProps = state => ({
  city: state.mainState.city,
  temp: state.mainState.temp,
  feelsLike: state.mainState.feelsLike,
  windSpeed: state.mainState.windSpeed,
  humidity: state.mainState.humidity,
  clouds: state.mainState.clouds,
  loading: state.mainState.loading,
});

const mapDispatchToProps = dispatch => {
  const {
    getTheWeather,
    getTheWeatherForNamyDays,
    resetWeather,
  } = actions.weatherActions;
  return {
    getTheWeather: (city) => dispatch(getTheWeather(city)),
    getTheWeatherForNamyDays:  (city, daysCount) => dispatch(getTheWeatherForNamyDays(city, daysCount)),
    resetWeather: () => dispatch(resetWeather()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabOneScreen);