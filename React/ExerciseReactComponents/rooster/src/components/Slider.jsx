import React, {Component} from 'react';

import leftArrow from './../img/left.png';
import rightArrow from './../img/right.png';

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedImg: ''
        };
    }

    componentWillReceiveProps() {
        fetch('http://localhost:9999/episodePreview/' + this.props.focusedEp)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({selectedImg: parsedData.url});
            });
    }

    componentDidMount() {

        fetch('http://localhost:9999/episodePreview/' + this.props.focusedEp)
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({selectedImg: parsedData.url});
            });
    }


    render() {
        return (
            <div>
                <div className='warper'>
                    <img
                        alt='nope'
                        src={leftArrow}
                        className='slider-elem slider-button case-left'
                        onClick={() =>
                            this.props.updateFunc(
                                Number(this.props.focusedEp) - 1 < 0
                                    ? 0
                                    : Number(this.props.focusedEp) - 1
                            )}
                    />
                    <img
                        className='sliderImg slider-elem'
                        alt='focusedEp'
                        src={this.state.selectedImg}
                    />
                    <img
                        alt='nope'
                        src={rightArrow}
                        className='slider-elem slider-button case-right'
                        onClick={() =>
                            this.props.updateFunc(
                                Number(this.props.focusedEp) + 1 > 2
                                    ? 2
                                    : Number(this.props.focusedEp) + 1
                            )}
                    />
                </div>
            </div>
        );
    }
}