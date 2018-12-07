import React, { Component } from 'react';
import BookList from './BookList'
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
    .then(response => response.books)
    .then(response => this.setState({ books: response}))
  }

  render() {
    return (
      <div>
        <h1>Book App</h1>
          <BookList books={this.state.books}/>
      </div>
    );
  }
}

export default App;

