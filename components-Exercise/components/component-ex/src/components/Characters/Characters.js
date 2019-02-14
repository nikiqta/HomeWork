import React from 'react';

import Rooster from './Rooster';
import Details from './Details';

const ROOSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        detailsId: 0
    }

    this.onImageClickHandler = this.onImageClickHandler.bind(this);
  }

  onImageClickHandler(id) {
   this.setState({ detailsId: id });
   console.log(this.state.detailsId)
  }

  render() {
    const { rosters } = this.props;
    console.log(this.state.detailsId);
    return (
      <div>
        <Rooster 
        rosters={rosters} 
        onImageClickHandler={this.onImageClickHandler}
        />
        <Details
        heroId={this.state.detailsId}
        />
      </div>
    );
  }
}
