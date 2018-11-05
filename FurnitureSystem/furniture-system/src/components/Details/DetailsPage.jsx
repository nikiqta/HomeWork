import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


import Review from "./Review";
import { fetchDetailsThunk } from "../../actions/furnitureActions";

class DetailsPage extends Component{

    constructor(props) {
        super(props);

        this.state = {

        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }


    onChangeHandler() {

    }

    onSubmitHandler () {

    }

    componentWillMount() {
        this.props.getData(this.props.match.params.id);
    }

    render(){

        const {
            make,
            model,
            year,
            description,
            price,
            image,
            material
        } = this.props.item;

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Furniture Details</h1>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <img alt={image} src={image}/>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p>Make: {make}</p>
                        <p>Model: {model}</p>
                        <p>Year: {year}</p>
                        <p>Description: {description}</p>
                        <p>Price: {price}</p>
                        <p>Material: {material}</p>
                        <a href="#" className="btn btn-primary">Like</a>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-8">
                        <form onSubmit={this.onSubmitHandler}>
                            <legend>Leave a review</legend>
                            <div className="form-group">
                                <textarea className="form-control"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <div className="btn-group mr-2" role="group" aria-label="First group">
                                    <button type="button" className="btn btn-secondary">1</button>
                                    <button type="button" className="btn btn-secondary">2</button>
                                    <button type="button" className="btn btn-primary">3</button>
                                    <button type="button" className="btn btn-secondary">4</button>
                                    <button type="button" className="btn btn-secondary">5</button>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit review"/>
                            </div>
                        </form>
                    </div>
                    <Review
                    user="pesho"
                    comment="Comment comment comment......."
                    rating="4.5"
                    />
                    <Review
                        user="mimi"
                        comment="Gret great great......."
                        rating="5"
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const item = state.furniture.filter(f => f.id == ownProps.match.params.id)[0];
    return {
       item: item || {
           make: 'Loading...',
           model: 'Loading...',
           year: 'Loading...',
           image: 'Loading...',
           description: 'Loading...',
           material: 'Loading...',
           price: 'Loading...'
       },
        reviews: item ? item.reviews : []
    };
}

function mapDispatchToProps(dispatch) {
    return {
         getData: (id) => dispatch(fetchDetailsThunk(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailsPage));