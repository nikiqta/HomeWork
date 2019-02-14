import React from 'react';

export default class Rooster extends React.Component {

    render = () => {
        const { rosters } = this.props;
        return (
            <section id="roster">
            {rosters && rosters.map((roster, index) => {
                return <img 
                alt={roster.name}
                src={roster.url}
                onClick={() => {this.props.onImageClickHandler(roster.id)}}
                />
            })  }
            </section>
        )
    }
}