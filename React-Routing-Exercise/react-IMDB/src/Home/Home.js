import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './Home.css'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state={
      movies: []
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')){

    }
  }

  render() {

    const { movies, username, loggedIn} = this.props.data;
    return (
        <div id="root">
          <div className="App">
            <div className="Home"><h1>All movies</h1>
              <ul className="movies">
                {
                  movies.map(movie => {
                    return (
                        <li key={movie.id} className="movie">
                          <h2>{movie.title}</h2>
                          <img src={movie.poster}/>
                          <span>
                             {loggedIn &&
                             <button
                             onClick={() => {
                                   return (<p>{movie.storyLine}</p>)
                             }}
                             >
                                 View Trailer
                             </button>}
                            {loggedIn &&
                            <button
                            onClick={() => {
                                return (<ReactPlayer url={movie.trailerUrl} playing />);
                            }}
                            >View Story Line</button>}
                            </span>
                        </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
