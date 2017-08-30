import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
import _ from 'lodash'

class BookSearch extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    searchResult: []
  }

  onSearchChange = e => {
    this._search(e.target.value)
  }

  async _search(query) {
    if (query) {
      try {
        let searchResult = await BooksAPI.search(query, 20)

        searchResult = searchResult.map(book => {
          const bookInShelf = _.find(this.props.currentBooks, {
            id: book.id
          })

          if (bookInShelf) {
            book.shelf = bookInShelf.shelf
          }

          return book
        })

        this.setState({ searchResult })
      } catch (error) {
        this.setState({ searchResult: [] })
      }
    } else {
      this.setState({ searchResult: [] })
    }
  }

  renderResult() {
    const { onShelfChange } = this.props
    return this.state.searchResult.map(book => {
      return <Book key={book.id} book={book} onShelfChange={onShelfChange} />
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              onChange={this.onSearchChange}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult && this.renderResult()}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
