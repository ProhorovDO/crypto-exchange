import {
  COINS_IS_LOADING, FETCHING_COINS, SOCKET_DATA, SOCKET_CONNECTED,
  SOCKET_DISCONNECTED, RELOADING_CURRENCY, FROM_CHANGE_INPUT,
  TO_CHANGE_INPUT, FROM_CURRENCY_CHANGE, TO_CURRENCY_CHANGE
} from "./types";
import Axios from "axios";
import io from "socket.io-client";
import CCC from "../utils/ccc-streamer-utilities";





//connect api//
export function coinsIsLoading() {
  return {
    type: COINS_IS_LOADING,
  }
}
export function fetchingCoins() {
  return async dispatch => {
    Axios.get(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`)
      .then(({ data }) => {
        const coins = data.Data.map((coin, id) => {
          const obj = {
            id: coin.CoinInfo.Name,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            FLAGS: 0,
            price: coin.RAW.USD.PRICE.toFixed(2),
          };
          return obj
        });
        dispatch({ type: FETCHING_COINS, payload: coins })
        dispatch(coinsIsLoading())
      })
  }
}
//connect socket//
const socket = io.connect("https://streamer.cryptocompare.com/");

export function socketConnected() {
  return {
    type: SOCKET_CONNECTED
  }
}
export function socketDisconnected() {
  return {
    type: SOCKET_DISCONNECTED
  }
}


export function socketData(message) {
  message = {
    id: message.FROMSYMBOL,
    name: message.FROMSYMBOL,
    price: message.PRICE,
    FLAGS: message.FLAGS
  }

  return {
    type: SOCKET_DATA,
    payload: message
  }
}


export function socketDisconnection() {
  return async dispatch => {
    socket.emit("SubRemove", {
      subs: [
        "5~CCCAGG~BTC~USD",
        "5~CCCAGG~ETH~USD",
        "5~CCCAGG~XRP~USD",
        "5~CCCAGG~CRO~USD",
        "5~CCCAGG~NYN~USD",
        "5~CCCAGG~USDT~USD",
        "5~CCCAGG~GAPS~USD",
        "5~CCCAGG~HMR~USD",
        "5~CCCAGG~BCH~USD",
        "5~CCCAGG~PLF~USD",
      ]
    });
    dispatch(socketDisconnected())
  }
};


export function socketConnection() {
  return async (dispatch, getState) => {
    dispatch(socketConnected())
    socket.emit('SubAdd', {
      subs: [
        "5~CCCAGG~BTC~USD",
        "5~CCCAGG~ETH~USD",
        "5~CCCAGG~XRP~USD",
        "5~CCCAGG~CRO~USD",
        "5~CCCAGG~NYN~USD",
        "5~CCCAGG~USDT~USD",
        "5~CCCAGG~GAPS~USD",
        "5~CCCAGG~HMR~USD",
        "5~CCCAGG~BCH~USD",
        "5~CCCAGG~PLF~USD",
      ]
    })
    socket.on("m", message => {
      const messageType = message.substring(0, message.indexOf("~"));
      let res = [];
      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        dispatch(socketData(res))
        dispatch(rerenderCurrencyCoins())
      }
    });
  }
}



//сравнение цен///



export function reloadingCurrency(obj) {
  return {
    type: RELOADING_CURRENCY,
    payload: obj
  }
}

export function rerenderCurrencyCoins() {
  return (dispatch, getState) => {

    const state = getState();
    for (let i = 0; i < 9; i++) {
      const coins = state.app.coins;
      const reloadCoins = state.app.currencyCoins;
      if (coins[i].name === reloadCoins.name) {
        if (reloadCoins.price !== undefined) {
          let obj = Object.assign(coins[i], reloadCoins)
          dispatch({ type: RELOADING_CURRENCY, payload: obj })
        } else {
          let obj = {
            FLAGS: reloadCoins.FLAGS,
            price: coins[i].price
          }
          dispatch({ type: RELOADING_CURRENCY, payload: obj })
        }
      }
    }
  }
}

///converter block


export function fromChangeInput(value) {
  return dispatch => {
    dispatch({
      type: FROM_CHANGE_INPUT,
      payload: value
    })
    dispatch(fromCurrencyChangeConvert())
  };
};

export function toChangeInput(value) {
  return dispatch => {
    dispatch({
      type: TO_CHANGE_INPUT,
      payload: value
    })
    dispatch(toCurrencyChangeConvert())
  };
};
export function fromCurrencyChange(element) {
  return dispatch => {
    dispatch({
      type: FROM_CURRENCY_CHANGE,
      payload: element
    })
    dispatch(fromCurrencyChangeConvert())
  }
};

export function toCurrencyChange(element) {
  return dispatch => {
    dispatch({
      type: TO_CURRENCY_CHANGE,
      payload: element
    })
    dispatch(fromCurrencyChangeConvert())
  };
};


export function fromCurrencyChangeConvert() {
  return (dispatch, getState) => {
    const state = getState();
    const fromCoin = state.app.fromCoin;
    const toCoin = state.app.toCoin;
    const from = state.app.from;
    for (let i = 0; i < 9; i++) {
      if (from === state.app.from) {
        if (fromCoin === state.app.coins[i].name) {
          const fromCoinPrice = state.app.coins[i].price;
          const valueFromCoin = fromCoinPrice * from
          for (let k = 0; k < 9; k++) {
            if (toCoin === state.app.coins[k].name) {
              const toCoinPrice = state.app.coins[k].price;
              const convert = valueFromCoin / toCoinPrice
              dispatch({ type: TO_CHANGE_INPUT, payload: convert })
            }
          }
        }
      }
    }
  }
}
export function toCurrencyChangeConvert() {
  return (dispatch, getState) => {
    const state = getState();
    const fromCoin = state.app.fromCoin;
    const toCoin = state.app.toCoin;
    const to = state.app.to;
    for (let i = 0; i < 9; i++) {
      if (to === state.app.to) {
        if (toCoin === state.app.coins[i].name) {
          const toCoinPrice = state.app.coins[i].price;
          const valueFromCoin = toCoinPrice * to
          for (let k = 0; k < 9; k++) {
            if (fromCoin === state.app.coins[k].name) {
              const fromCoinPrice = state.app.coins[k].price;
              const convert = valueFromCoin / fromCoinPrice
              dispatch({ type: FROM_CHANGE_INPUT, payload: convert })
            }
          }
        }
      }
    }
  }
}

