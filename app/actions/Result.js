import { RSAA } from "redux-api-middleware";
import _ from "lodash";
import * as types from "./actionTypes";

export const getNumberOfVisitors = (time) => ({
  type: types.GET_NUMBER_OF_VISITORS,
  time
});


export const competePoker = () => ({
  type: types.COMPETE_POKER
});

export const resetPoker = () => ({
  type: types.RESET_POKER
});