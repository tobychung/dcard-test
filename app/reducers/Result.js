import _ from "lodash";
import * as actionTypes from "../actions/actionTypes";
import { LOADING, SUCCESS } from "../constants/apiActions";
import { maxNumberOfVisitors, competeNow } from "../libraries/utils";

const InitialState = {
  vistors: {
    result: null
  },
  poker: {
    result: "Not start yet",
    resultA: {
      word: null,
      cards: []
    },
    resultB: {
      word: null,
      cards: []
    }
  }
};

export default function Result(state = InitialState, action) {
  switch (action.type) {
  case actionTypes.GET_NUMBER_OF_VISITORS:
    return {
      ...state,
      vistors: {
        result: maxNumberOfVisitors(action.time.start, action.time.end)
      },
    };
  case actionTypes.COMPETE_POKER:
    const resultObj = competeNow();
    return {
      ...state,
      poker: {
        result: resultObj.resultWord,
        resultA: resultObj.resultA, 
        resultB: resultObj.resultB
      },
    };
  case actionTypes.RESET_POKER:
    return {
      ...state,
      poker: {
        result:  "Not start yet",
        resultA: {
          word: null,
          cards: []
        },
        resultB: {
          word: null,
          cards: []
        }
      },
    };
  default:
    return state;
  }
}
