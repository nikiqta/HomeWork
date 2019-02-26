import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import './Home.css';

import Movie from '../Movie/Movie'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            storyBtnClicked: false,
            trailerBtnClicked: false,
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
                if(data.movies) {
                    this.props.notify(data.message, 'success');
                    this.setState({movies: data.movies});
                } else {
                    this.props.notify(data.message, 'error');
                }
            })
            .catch(err =>  this.props.notify(err.message, 'error'));
    }

    async componentDidMount() {
        await this.getMovies();
    }

    onStoryLineClick(movieData) {

        this.setState(prevState => ({
            storyBtnClicked: true,
            trailerBtnClicked: false,
            movie: movieData,
            currentStoryId: movieData.id
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
        const {loggedIn} = this.props.data;
        const {movies, storyBtnClicked, movie, trailerBtnClicked} = this.state;
        return (
            <div id="root">
                <div className="App">
                    <div className="Home">
                        <h1>All movies</h1>
                        {storyBtnClicked && (
                            <div>
                                <h2>Story line of {movie.title}</h2>
                                <p style={{width: '90%'}}>{movie.storyLine}</p>
                            </div>
                        )}
                        {trailerBtnClicked && (
                            <div>
                                <h2>Trailer of {movie.title}</h2>
                                <ReactPlayer style={{margin: 'auto'}} url={movie.trailerUrl} playing/>
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
