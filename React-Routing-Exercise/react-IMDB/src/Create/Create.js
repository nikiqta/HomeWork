import React, { Component } from 'react';
import './Create.css';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state={
      title: '',
      storyLine: '',
      trailerUrl: '',
      poster: ''
    };
    this.onInputChangeHandler = this.props.onInputChangeHandler.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  async createMovie(data) {
    await fetch('http://localhost:9999/feed/movie/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        })
        .then((data) => {
          if(data._id) {
            this.props.notify(data.message, 'success');
          } else {
            this.props.notify(data.message, 'error');
          }

        })
        .catch(err =>  this.props.notify(err.message, 'error'));
}

  render() {

    return (
        <div id="root">
          <div className="App">
            <div className="Create">
              <h1>Create Movie</h1>
              <form onSubmit={(e) => {
                e.preventDefault();
                this.createMovie(this.state);
                this.props. history.push('/');
              }}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    id="title"
                    placeholder="Titanic"
                    onChange={this.onInputChangeHandler}
                />
                  <label htmlFor="storyLine">Story Line</label>
                <input
                    type="text"
                    name="storyLine"
                    value={this.state.storyLine}
                    id="storyLine"
                    placeholder="Text"
                    onChange={this.onInputChangeHandler}
                />
                <label htmlFor="trailerUrl">Trailer Url</label>
                <input
                    type="text"
                    name="trailerUrl"
                    value={this.state.trailerUrl}
                    id="trailerUrl"
                    placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q"
                    onChange={this.onInputChangeHandler}
                />
                  <label htmlFor="poster">Movie Poster</label>
                <input
                    type="text"
                    name="poster"
                    value={this.state.poster}
                    id="poster"
                    placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzg6o0KjhufKFU1iBNr1zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA"
                    onChange={this.onInputChangeHandler}
                />
                <input
                  type="submit"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default Create;
