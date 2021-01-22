import * as React from 'react';
import { StyleSheet, Text, View, ScrollView,ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { actions } from '../store';


function TabTwoScreen({ weatherForFewDays, loading }) {

  return (
    <View style={styles.container}>
      {loading && <View style={styles.load}><ActivityIndicator color="gold" /></View>}
      <ScrollView>
        {weatherForFewDays.map( day => (
          <View key={day.id}   style={styles.forecastForTheDay}>
            <Text style={styles.title}>Температура: {Math.floor(day.temp - 273.15)}°</Text>
            <Text style={styles.title}>Ощущается как: {Math.floor(day.feelsLike - 273.15)}°</Text>
            <Text style={styles.title}>Скорость ветра: {day.windSpeed} м/с</Text>
            <Text style={styles.title}>Влажность: {day.humidity}%</Text>
            <Text style={styles.title}>Облачность: {day.clouds}%</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b8ccea',
  },
  forecastForTheDay: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 50,
    margin:5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FAEEDD",
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}
});

const mapStateToProps = state => ({
  weatherForFewDays: state.mainState.weatherForFewDays,
  loading: state.mainState.loading,
});

const mapDispatchToProps = dispatch => {
  const {
    getTheWeather,
  } = actions.weatherActions;
  return {
    getTheWeather: (city) => dispatch(getTheWeather(city)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabTwoScreen);