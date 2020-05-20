import {
  COINS_IS_LOADING, FETCHING_COINS, SOCKET_DATA,
  SOCKET_CONNECTED, SOCKET_DISCONNECTED, RELOADING_CURRENCY,
  FROM_CHANGE_INPUT, TO_CHANGE_INPUT, TO_CURRENCY_CHANGE,
  FROM_CURRENCY_CHANGE
} from "./types"


const initialState = {
  coins: null,
  currencyCoins: {},
  isLoading: false,
  socketConnected: false,
  socketDisconnected: true,
  from: 1,
  to: 1,
  fromCoin: 'BTC',
  toCoin: 'BTC'
}


export const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case COINS_IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case FETCHING_COINS:
      return {
        ...state,
        coins: action.payload
      }
    case SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: true,
        socketDisconnected: false
      }
    case SOCKET_DATA:
      return {
        ...state,
        currencyCoins: action.payload
      }
    case SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnected: false,
        socketDisconnected: true
      }
    case RELOADING_CURRENCY:
      return {
        ...state,
        coins: Object.assign([], state.coins, action.payload)
      }
    case FROM_CHANGE_INPUT:
      return {
        ...state,
        from: action.payload
      }
    case TO_CHANGE_INPUT:
      return {
        ...state,
        to: action.payload
      }
    case FROM_CURRENCY_CHANGE:
      return {
        ...state,
        fromCoin: action.payload
      }
    case TO_CURRENCY_CHANGE:
      return {
        ...state,
        toCoin: action.payload
      }
    default:
      return state
  }
}


