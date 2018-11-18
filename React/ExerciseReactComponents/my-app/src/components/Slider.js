import React, {Component} from 'react';
import leftArrow from '../left.png';
import rightArrow from '../right.png';
import '../Slider.css';

class Slider extends Component{
    constructor(props){
        super(props);

        this.state = {
            focusedEpId: 0,
            imgUrl: ''
        };
        
        this.getNewEp = function (id) {
            fetch('http://localhost:9999/episodePreview/'+id)
                .then(data => {
                    return data.json();
                })
                .then(parsedData => {
                    this.setState({imgUrl:parsedData.url});
                    this.setState({focusedEpId:parsedData.id})
                });
        };
    }

    componentDidMount(){
        fetch('http://localhost:9999/episodePreview/'+this.state.focusedEpId).then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({imgUrl:parsedData.url});
            });
    }

    render(){
        return (
            <div>
                <img className='leftArrow' onClick={() => {
                    this.getNewEp(Number(this.state.focusedEpId) - 1);
                }} alt='leftArrow' src={leftArrow}/>
                <img className='focused-img' alt='focusedEp' src={this.state.imgUrl} />
                <img className='rightArrow' onClick={() => {
                    this.getNewEp(Number(this.state.focusedEpId) + 1);
                }} alt='rightArrow' src={rightArrow}/>
            </div>
        );
    }
}

export default Slider;