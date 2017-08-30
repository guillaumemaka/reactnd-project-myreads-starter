import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    filter: PropTypes.string,
    section: PropTypes.string
  }

  renderBooks() {
    const { books, filter, onShelfChange } = this.props
    return books.filter(book => book.shelf === filter).map(book => {
      return <Book key={book.id} book={book} onShelfChange={onShelfChange} />
    })
  }

  render() {
    const { section } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{section}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
