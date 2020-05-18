import React from "react";

import { InputGroup, FormControl, Form } from "react-bootstrap";

import "./cryptoConverter.scss";

const CryptoConverter = ({ cryptoСurrency }) => {
  return (
    <div className="form">
      <div className="form__wrapper">
        <span className="form__name">Converter</span>
        <div className="form__categories">
          <InputGroup size="sm" className="mb-5">
            <FormControl type="number" placeholder="сумма" min="0" step="1" />
            <Form.Control as="select">
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
            <FormControl type="number" placeholder="сумма" min="0" step="1" />
            <Form.Control as="select">
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

export default CryptoConverter;
