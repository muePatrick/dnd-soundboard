import { createStore, applyMiddleware } from 'redux'

import { combineReducers } from 'redux'

const initialState:object = {
  ws: "wss://127.0.0.1:3000",
  http: "http://127.0.0.1:4000",
}

const urls = (state = initialState, action:any) => {
  switch (action.type) {
    case 'urls/updateWs': {
      const newState:any = state;
      newState.ws = action.payload;
      return newState
    }
    case 'urls/updateHttp': {
      const newState:any = state;
      newState.http = action.payload;
      return newState
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  urls,
})


const store = createStore(rootReducer, undefined)
export default store