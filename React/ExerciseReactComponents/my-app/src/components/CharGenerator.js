import React, {Component} from 'react';
import Character from "./Character.js";

class Roster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charArr: [1, 1, 1, 1]
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/roster')
            .then(data => {
                return data.json()
            })
            .then(parsedData => {
                this.setState({charArr: parsedData});
            });
    }

    render() {
        return (
                <div className='characters'>
                    {this.state.charArr.map((hero, index) => {
                        return <Character key={index} params={hero}/>
                    })}
                </div>
        );
    }
}


export default Roster