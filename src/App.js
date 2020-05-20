import React from "react";
import CryptoTable from "./components/CryptoTable";
import CryptoConverter from "./components/CryptoConverter";
import Nav from "./components/Nav";
import { Row, Container, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchingCoins, socketConnection, socketDisconnection } from './redux/action'



class App extends React.Component {

  componentDidMount() {
    this.props.fetchingCoins()
  }
  render() {
    return (
      <Container fluid>
        <Nav />
        <Button variant="primary" className='button' size="sm" onClick={this.props.socketConnection}> subscribe </Button>
        <Button variant="primary" className='button' size="sm" onClick={this.props.socketDisconnection}> unsubscribe </Button>
        <Row>
          <Col lg={6} col={12}>
            <CryptoTable cryptoСurrency={this.props.coins} />
          </Col>
          <Col lg={6} col={12}>
            <CryptoConverter cryptoСurrency={this.props.coins} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  fetchingCoins,
  socketConnection,
  socketDisconnection
}

const mapStateToProps = state => ({
  socketDisconnected: state.socketDisconnected,
  socketConnected: state.socketConnected,
  isLoading: state.app.isLoading,
  coins: state.app.coins
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

