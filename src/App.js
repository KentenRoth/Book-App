import React, { Component } from 'react';
import BookList from './BookList'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: {}
    }
  }

  componentDidMount() {
    fetch('/books').then(response => response.json())
    .then(readingList => this.setState({ books: readingList}))
  }

  render() {
    return (
      <div>
        <h1>Book App</h1>
        <h2>{this.state.books.title}</h2>
        
        {console.log(this.state.books)}
      </div>
    );
  }
}

export default App;

