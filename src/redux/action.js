import { COINS_IS_LOADING, FETCHING_COINS, SOCKET_DATA, SOCKET_CONNECTED, SOCKET_DISCONNECTED, RELOADING_CURRENCY } from "./types";
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


/* const state = getState();
      if (state.app.coins[2].name === res.FROMSYMBOL) {
        state.app.coins[2].price = res.PRICE
      }
      return state.coins */


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
            name: coins[i].name,
            FLAGS: reloadCoins.FLAGS,
            price: coins[i].price
          }
          dispatch({ type: RELOADING_CURRENCY, payload: obj })
        }
      }
    }
  }
}

/* debugger;
const obj = {
  id: coin.id
};
if (obj.id === state.app.currencyCoins.id) {
  debugger;
  const newObj = reloadingCoins.concat(state.app.currencyCoins)
  dispatch({ type: RELOADING_CURRENCY, payload: newObj })
}

}); */
/* Object.assign(state.app.coins, state.currencyCoins).map((coin, id) => {
  const obj = {
    id: coin.id,
    imageUrl: coin.imageUrl,
    name: coin.name,
    fullName: coin.fullName,
    price: coin.price
  };
  return obj
});
} */