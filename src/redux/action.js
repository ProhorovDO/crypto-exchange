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
    Axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`)
      .then(({ data }) => {
        const coins = data.Data;
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
        "5~CCCAGG~EOS~USD",
        "5~CCCAGG~BCH~USD",
        "5~CCCAGG~XRP~USD",
        "5~CCCAGG~ETC~USD",
        "5~CCCAGG~LTC~USD",
        "5~CCCAGG~BCV~USD",
        "5~CCCAGG~XML~USD",
        "5~CCCAGG~BNB~USD",
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
        "5~CCCAGG~EOS~USD",
        "5~CCCAGG~BCH~USD",
        "5~CCCAGG~XRP~USD",
        "5~CCCAGG~ETC~USD",
        "5~CCCAGG~LTC~USD",
        "5~CCCAGG~BCV~USD",
        "5~CCCAGG~XML~USD",
        "5~CCCAGG~BNB~USD",
      ]
    })
    socket.on("m", message => {
      const messageType = message.substring(0, message.indexOf("~"));
      let res = [];
      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        dispatch(socketData(res))
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


/* export function rerenderCurrencyCoins() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.app.coins[2].name === state.app.currencyCoins.name) {
      state.app.coins[2].price = state.app.currencyCoins.price;
      const newObj = {
        imageUrl: state.app.coins[2].imageUrl,
        name: state.app.coins[2].name,
        fullName: state.app.coins[2].fullName,
        price: state.app.currencyCoins.price,
        FLAGS: state.app.currencyCoins.FLAGS
      }
      dispatch({ type: FETCHING_COINS, payload: [...state.app.coins, newObj] })
    }

  }
}
 */
