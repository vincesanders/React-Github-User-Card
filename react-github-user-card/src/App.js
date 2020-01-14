import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    gHUsers: []
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="./assets/lambdalogo.png" alt="Lambda Logo"/>
          <p>❤️'s</p>
          <img src="./assets/githublogo.png" alt="GitHub Logo" />
        </div>
      </div>
    );
  }
}

export default App;
