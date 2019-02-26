import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './Home.css';

import Movie from '../Movie/Movie'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      storyBtnClicked: false,
      trilerBtnClicked: false,
      movie: ''
    };
    this.getMovies = this.getMovies.bind(this);
    this.onStoryLineClick = this.onStoryLineClick.bind(this);
    this.onTrailerClick = this.onTrailerClick.bind(this);
  }

  async getMovies() {
    await fetch('http://localhost:9999/feed/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ movies: data.movies });
      })
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    await this.getMovies();
  }

  onStoryLineClick(movieData) {
    this.setState(prevState => ({
      storyBtnClicked: true,
      trailerBtnClicked: false,
      movie: movieData
    }));
  }

  onTrailerClick(movieData) {
    this.setState(prevState => ({
      trailerBtnClicked: true,
      storyBtnClicked: false,
      movie: movieData
    }));
  }

  render() {
    const { loggedIn } = this.props.data;
    const { movies, storyBtnClicked, movie, trailerBtnClicked } = this.state;
    return (
      <div id="root">
        <div className="App">
          <div className="Home">
            <h1>All movies</h1>
            {storyBtnClicked && (
              <div>
                <h3>Story line of {movie.title}</h3>
                <p style={{ width: '90%' }}>{movie.storyLine}</p>
              </div>
            )}
            {trailerBtnClicked && (
              <div>
                <h3>Trailer of {movie.title}</h3>
                <ReactPlayer style={{ margin: 'auto' }} url={movie.trailerUrl} playing />
              </div>
            )}
            <Movie
            movies={movies}
            loggedIn={loggedIn}
            onStoryLineClick={this.onStoryLineClick}
            onTrailerClick={this.onTrailerClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
