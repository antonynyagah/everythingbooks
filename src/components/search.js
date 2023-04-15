import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookSearchForm() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStartIndex(0);
    setSearched(true);
  };

  const handleNextClick = () => {
    setStartIndex(startIndex + 10);
  };

  const handlePrevClick = () => {
    setStartIndex(startIndex - 10);
  };

  useEffect(() => {
    if (searched) {
      setLoading(true);
      const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`;
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          if (data.items) {
            setBooks(data.items);
            setTotalItems(data.totalItems);
          } else {
            setBooks([]);
            setTotalItems(0);
          }
          setLoading(false);
        });
    }
  }, [query, startIndex, searched]);

  const disablePrev = startIndex === 0;
  const disableNext = startIndex + 10 >= totalItems;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search for a book:
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : searched && books.length === 0 ? (
        <p>No results found.</p>
      ) : searched && (
        <div>
          <ul>
            {books.map(book => (
              <li key={book.id}>
                <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={{
                  pathname: `/book/${book.id}`,
                  state: {
                    book: book
                  }
                }}>
                  <img src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} alt="" />
                  <div>
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.authors && <p>by {book.volumeInfo.authors.join(', ')}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <button disabled={disablePrev} onClick={handlePrevClick}>Previous</button>
            <button disabled={disableNext} onClick={handleNextClick}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSearchForm;
