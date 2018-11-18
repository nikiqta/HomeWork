import React, {Component} from 'react';
import Avatar from './Avatar.jsx';

export default class Character extends Component {

    renderAvatar(i) {
        return (
            <Avatar
                key={i}
                value={this.props.avatars[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="avatars">
                <ul>
                    {this.props.avatars.map((a, i) => this.renderAvatar(i))}
                </ul>
            </div>
        );
    }
}
