import React from 'react';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: ''
    };
  }

  async componentDidMount() {
    await fetch(`http://localhost:9999${IMAGE_URL}${this.props.selectedEp}`)
      .then(data => {
        return data.json();
      })
      .then(parsedData => {
        this.setState({ currentImage: parsedData.url });
      });
  }

  async componentWillReceiveProps(nextProps) {
    const { selectedEp } = nextProps;
    await fetch(`http://localhost:9999${IMAGE_URL}${selectedEp}`)
      .then(data => {
        return data.json();
      })
      .then(parsedData => {
        this.setState({ currentImage: parsedData.url });
      });
  }

  render = () => (
    <section id="slider">
      <img
        className="button"
        src="/left.png"
        onClick={() =>
          this.props.onChangeEpHandler(
            Number(this.props.selectedEp) - 1 < 0
              ? 0
              : Number(this.props.selectedEp) - 1
          )
        }
        title="previous"
        alt="nav"
      />
      <div className="image-container">
        <img src={this.state.currentImage} alt="episode" />
      </div>
      <img
        className="button"
        src="/right.png"
        onClick={() =>
          this.props.onChangeEpHandler(
            Number(this.props.selectedEp) + 1 > 2
              ? 2
              : Number(this.props.selectedEp) + 1
          )
        }
        title="previous"
        alt="nav"
      />
    </section>
  );
}
