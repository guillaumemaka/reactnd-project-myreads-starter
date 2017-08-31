import React from 'react'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import BookShelves from './BookShelves'
import BookSearch from './BookSearch'
import update from 'immutability-helper'

class BooksApp extends React.Component {
  state = {
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
              <BookShelves
                books={this.state.books}
                onShelfChange={this.onShelfChange}
              />
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
