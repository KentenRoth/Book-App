import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetch('/books').then(response => response.json())
    .then(responsejson => console.log(responsejson))
  }

  render() {
    return (
      <div>
        <h1>Book App</h1>
      </div>
    );
  }
}

export default App;
