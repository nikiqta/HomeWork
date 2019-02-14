import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroDetails: {}
    };
  }

  async  componentWillReceiveProps(nextProps) {
        const { heroId } = nextProps;
    await  fetch(`http://localhost:9999/character/${heroId}`)
        .then(data => {
          return data.json();
        })
        .then(parsedData => {
          this.setState({ heroDetails: parsedData });
        });
    }


  render() {
    const { name, url, bio } = this.state.heroDetails;
    debugger;
    return (
      <section id="bio">
        <div className="image">
          <img 
          style={{
              width: '100%'
          }}
          alt={name} 
          src={url} />
        </div>
        <div className="info">
          <p>Name: {name}</p>
          <p>Bio: {bio}</p>
          <p />
        </div>
      </section>
    );
  }
}
