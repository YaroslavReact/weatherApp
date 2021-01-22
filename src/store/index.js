import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import * as weatherActions from "./weatherStore/actions";
import  weatherReducers  from "./weatherStore/reducers";

export const actions = {
    weatherActions,
}
const rootReducer = combineReducers({
  mainState: weatherReducers,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);