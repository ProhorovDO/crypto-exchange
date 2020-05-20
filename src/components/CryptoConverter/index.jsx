import React from "react";

import { InputGroup, FormControl, Form } from "react-bootstrap";

import "./cryptoConverter.scss";
import { connect, useDispatch } from "react-redux";
import {
  fromChangeInput,
  toChangeInput,
  fromCurrencyChange,
  toCurrencyChange,
} from "../../redux/action";
const CryptoConverter = ({ cryptoСurrency, from, to, fromCoin, toCoin }) => {
  const dispatch = useDispatch();
  return (
    <div className="form">
      <div className="form__wrapper">
        <span className="form__name">Converter</span>
        <div className="form__categories">
          <InputGroup size="sm" className="mb-5">
            <FormControl
              type="number"
              min="0"
              onChange={(event) =>
                dispatch(fromChangeInput(event.target.value))
              }
              value={from}
            />
            <Form.Control
              as="select"
              onChange={(event) => {
                dispatch(fromCurrencyChange(event.target.value));
              }}
            >
              {cryptoСurrency &&
                cryptoСurrency.map((coin, index) => (
                  <option key={index}>{coin.name}</option>
                ))}
            </Form.Control>
            <InputGroup.Append>
              <InputGroup.Text>Валюта</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup size="sm">
            <FormControl
              type="number"
              min="0"
              onChange={(event) => dispatch(toChangeInput(event.target.value))}
              value={to}
            />
            <Form.Control
              as="select"
              onChange={(event) =>
                dispatch(toCurrencyChange(event.target.value))
              }
            >
              {cryptoСurrency &&
                cryptoСurrency.map((coin, index) => (
                  <option key={index}>{coin.name}</option>
                ))}
            </Form.Control>
            <InputGroup.Append>
              <InputGroup.Text>Валюта</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  from: state.app.from,
  to: state.app.to,
});
const mapDispatchToProps = {
  toChangeInput,
  fromChangeInput,
  fromCurrencyChange,
  toCurrencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptoConverter);
