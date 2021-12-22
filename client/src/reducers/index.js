import { combineReducers } from 'redux';
import types from '../actions/types'

const initialState = 0;

function count(state = initialState, action) {
  switch (action.type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  count
});

export default rootReducer;
