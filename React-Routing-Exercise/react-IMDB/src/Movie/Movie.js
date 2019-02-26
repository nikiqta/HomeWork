import React from 'react';

const Movie = (props) => {
    const { movies, loggedIn, onStoryLineClick, onTrailerClick } = props;
      return (
<ul className="movies">
              {movies.map(movie => {
                return (
                  <li key={movie.id} className="movie">
                    <h2>{movie.title}</h2>
                    <img alt="movie-poster" src={movie.poster} />
                    <span>
                      {loggedIn && (
                        <button
                          name=""
                          onClick={() => {
                            return onStoryLineClick(movie);
                          }}
                        >
                          View Story Line
                        </button>
                      )}
                      {loggedIn && (
                        <button
                          onClick={() => {
                            return onTrailerClick(movie);
                          }}
                        >
                          View Trailer
                        </button>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
      );
}

export default Movie;