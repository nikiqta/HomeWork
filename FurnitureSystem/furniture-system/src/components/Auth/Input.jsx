import React, {Component} from 'react';

export default class Input extends Component {

    render() {
        const {name, type = 'text', value, onChange, label} = this.props;
        return (
            <div className="form-group">
                <label className="form-control-label"
                       htmlFor={name}>{label}
                </label>
                <input className="form-control"
                       onChange={(e) => onChange(e)}
                       name={name}
                       id={name}
                       type={type}
                       value={value}
                />
                {false && <div className="form-control-feedback">This input value is valid</div>}
            </div>
        );
    }

}