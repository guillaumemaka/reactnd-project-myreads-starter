import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

const BookShelves = ({ books, onShelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          books={books}
          section="Currently Reading"
          filter="currentlyReading"
          onShelfChange={onShelfChange}
        />

        <BookShelf
          books={books}
          section="Want To Read"
          filter="wantToRead"
          onShelfChange={onShelfChange}
        />

        <BookShelf
          books={books}
          section="Read"
          filter="read"
          onShelfChange={onShelfChange}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

BookShelves.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default BookShelves
