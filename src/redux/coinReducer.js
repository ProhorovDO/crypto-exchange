import { COINS_IS_LOADING, FETCHING_COINS, SOCKET_DATA, SOCKET_CONNECTED, SOCKET_DISCONNECTED } from "./types"


const initialState = {
  coins: null,
  currencyCoins: {},
  isLoading: false,
  socketConnected: false,
  socketDisconnected: true
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
        coins: action.payload.map((coin) => {
          const obj = {
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            price: coin.RAW.USD.PRICE.toFixed(2),
          };
          return obj
        })
      }
    case SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: true
      }
    case SOCKET_DATA:
      return {
        ...state,
        currencyCoins: action.payload
      }
    case SOCKET_DISCONNECTED:
      return {
        ...state,
        socketDisconnected: false
      }
    default:
      return state
  }
}


/* export function coinsReloadingCurrency(state = { initialState }, action) {
  return {
    info: Object.assign({}, state.coins.map((item) => {
      const obj = {
        name: item.name,
        price: item.price,
        FLAGS: null
      }
      return obj
    }), state.currencyCoins),
    info: this.info.filter(function (name) {
      (coins.name === currency.name){
        return name
      }
    })
  }
} */

/* Object.assign({}, state.coins.map((item) => {
  const obj = {
    name: item.name,
    price: item.price,
    FLAGS: null
  }
  return obj
}) *//* .filter(function (name) {
  if (String(state.coins.name) === String(action.payload.name)) {
    state.coins = {
      price: action.payload.price,
      FLAGS: action.payload.FLAGS
    } */
/*
  state.currencyCoins.name.price = action.payload.price
  state.currencyCoins.name.FLAGS = action.payload.FLAGS */