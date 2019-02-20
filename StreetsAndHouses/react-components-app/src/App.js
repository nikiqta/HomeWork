import React, {Component} from 'react';
import './App.css';
import Street from "./components/street/Street";
import House from "./components/house/House";
import HouseDetails from "./components/houseDetails/HouseDetails";

const BASE_URL = 'http://localhost:9999/';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            streets: [],
            selectedStreet: '',
            selectedHouse: ''
        };

        this.onStreetClickHandler = this.onStreetClickHandler.bind(this);
        this.onHouseClickedHandler = this.onHouseClickedHandler.bind(this);
    }

    componentWillMount() {
        fetch(`${BASE_URL}feed/street/all`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    streets: data.streets
                })
            })
    }

    onStreetClickHandler(id) {
        this.setState({
            selectedStreet: id,
            selectedHouse: ''
        });
    }

    onHouseClickedHandler(id) {
        this.setState({
            selectedHouse: id,
            enableHoverOut: false
        });
    }

    render() {
        const {streets} = this.state;

        const currentStreetId = this.state.selectedStreet !== ''
            ? this.state.selectedStreet
            : undefined;

        const homes = currentStreetId >= 0
            ? streets[currentStreetId].homes
            : [];

        const currentHouseId = this.state.selectedHouse !== ''
            ? this.state.selectedHouse
            : undefined;
        const houseDetails = currentHouseId >= 0
            ? homes[currentHouseId]
            : [];

        return (
            <div className="App">
                <div>
                    <h2>Streets</h2>
                    {streets && streets.map((street, index) => {
                        return (<Street
                            location={street.location}
                            onClickHandler={this.onStreetClickHandler}
                            key={index}
                            id={index}
                        />);
                    })}
                </div>
                <div>
                    <h2>Houses</h2>
                    {homes.length === 0 &&
                    <div>In order to see houses, please choose street...</div>
                    }
                    {homes && homes.map((house, index) => {
                        return (<House
                            key={index}
                            id={index}
                            data={house}
                            onClickHandler={this.onHouseClickedHandler}
                        />);
                    })}
                </div>
                <div>
                    {houseDetails.length !== 0 &&
                    <HouseDetails
                        data={houseDetails}
                    />
                    }
                </div>
            </div>
        );
    }
}

export default App;
