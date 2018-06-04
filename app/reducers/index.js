import { combineReducers } from "redux";
import { combineForms, modelReducer } from "react-redux-form";
import { routerReducer } from "react-router-redux";
import { initialTimeState } from "../constants/models";

import Result from "./Result";


const rootReducer = combineReducers({
  forms: combineForms({
    time: modelReducer("time", initialTimeState),
  }, "forms"),
  Result,
});

export default rootReducer;
