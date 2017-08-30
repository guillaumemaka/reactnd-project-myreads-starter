import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css'

import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import update from 'immutability-helper'

window.BooksAPI = BooksAPI

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  onShelfChange = async (book, shelf) => {
    const originalIndex = this.state.books.indexOf(book)
    try {
      await BooksAPI.update(book, shelf)

      book.shelf = shelf

      if (originalIndex === -1) {
        this.setState(state => ({
          books: update(state.books, {
            $push: [book]
          })
        }))
      } else {
        this.setState(state => ({
          books: update(state.books, {
            [originalIndex]: { $set: book }
          })
        }))
      }
    } catch (error) {
      this.setState({ books: [] })
    }
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <BookShelf
                    books={this.state.books}
                    section="Currently Reading"
                    filter="currentlyReading"
                    onShelfChange={this.onShelfChange}
                  />

                  <BookShelf
                    books={this.state.books}
                    section="Want To Read"
                    filter="wantToRead"
                    onShelfChange={this.onShelfChange}
                  />

                  <BookShelf
                    books={this.state.books}
                    section="Read"
                    filter="read"
                    onShelfChange={this.onShelfChange}
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          <Route
            path="/search"
            render={() => (
              <BookSearch
                currentBooks={this.state.books.map(({ id, shelf }) => ({
                  id,
                  shelf
                }))}
                onShelfChange={this.onShelfChange}
              />
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
