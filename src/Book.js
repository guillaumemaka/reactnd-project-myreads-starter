import React from 'react'
import PropTypes from 'prop-types'

function Book({ book, onShelfChange }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e => {
                onShelfChange(book, e.target.value)
              }}
              value={book.shelf ? book.shelf : 'none'}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(', ')}
        </div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Book
