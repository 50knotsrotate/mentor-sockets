import React, { Component } from "react";
import Header from "./Header";
import "./App.scss";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:4000");

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      returnedMessage: []
    };
    socket.on("message", returnedMessage => {
      this.setState({
        returnedMessage: [...this.state.returnedMessage, returnedMessage]
      });
    });
  }
  render() {
    const { message, returnedMessage } = this.state;

    return (
      <>
        <Header />
        <div className="App">
          <div>
            <div>
              {returnedMessage.map(message => {
                return <div>{message}</div>;
              })}
            </div>
            <div className="message-box">
              <label htmlFor="message">Message</label>
              <input
                id="message"
                type="text"
                onChange={e => this.setState({ message: e.target.value })}
              />
              <button onClick={() => socket.emit("message", message)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
