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
			.then(response => this.setState({ books: response }))
	}

	render() {
		return (
			<div>
				<div className='header'>
					<div className='container'>
						<div>
							<h1 className='pa3'>Book Review App</h1>
						</div>
					</div>
				</div>
				<div className='sub-header'>
					<div className='container'>
						<div>
							<p className='pa1 ph3'>Books Reviewed: {this.state.books.length}</p>
						</div>
					</div>
				</div>
				<div className='container'>
					<BookList books={this.state.books} />
				</div>
			</div>
		);
	}
}

export default App;

