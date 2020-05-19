import React from "react";
import { Table } from "react-bootstrap";
import "./cryptoTable.scss";

const CryptoTable = ({ cryptoСurrency }) => {
  return (
    <Table striped bordered hover responsive size="md">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Full Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cryptoСurrency &&
          cryptoСurrency.map((item, index) => (
            <tr key={index}>
              <td className="coin">
                <img
                  src={item.imageUrl}
                  alt="coin-icon"
                  className="coin__icon"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.fullName}</td>
              <td className="column">
                {item.price}$
                {item.FLAGS === "1" ? (
                  <i className="up">↑</i>
                ) : item.FLAGS === "2" ? (
                  <i className="down">↓</i> 
                ) : null}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default CryptoTable;
