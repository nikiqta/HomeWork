import React, {Component} from 'react';
import './Converter.css';
import CurrencyDisplay from './CurrencyDisplay.jsx';

const conversionTable = {
    euro: 1,
    usd: 1.16
};

function convert(value, from, to){
  return value / conversionTable[from] * conversionTable[to];
}

class Converter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            euro: 0,
            usd: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        let value = Number(e.target.value);
        
        if (e.target.value === "") {
            return;
        }
        
        this.setState({
            euro: convert(value, e.target.name, 'euro'),
            usd: convert(value, e.target.name, 'usd')
        });
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="converter">
            <form onSubmit={this.onSubmit}>
                <CurrencyDisplay
                    onChange={this.onChange}
                    type="number"
                    name="euro"
                    value={this.state.euro}/>
                <CurrencyDisplay
                    onChange={this.onChange}
                    type="number"
                    name="usd"
                    value={this.state.usd}/>
            </form>
            </div>
        );
    }
}

export default Converter;