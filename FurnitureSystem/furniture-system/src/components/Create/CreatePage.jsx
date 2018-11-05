import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Input from "../Auth/Input";
import { createFurnitureThunk } from "../../actions/furnitureActions";

class CreatePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            year: '',
            description: '',
            price: '',
            image: '',
            material: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

   async onSubmitHandler(e) {
        e.preventDefault(e);
        this.setState({submitting: true});
        const data = {
            make: this.state.make,
            model: this.state.model,
            year: this.state.year,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            material: this.state.material,
            submitting: false
        };
       await this.props.createFurniture(data);
       this.setState({submitting: false});
       this.props.history.push('/profile');
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Create New Furniture</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChangeHandler}
                                name="make"
                                value={this.state.make}
                                label="Make"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="model"
                                value={this.state.model}
                                label="Model"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="year"
                                value={this.state.year}
                                label="Year"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="description"
                                value={this.state.description}
                                label="Description"
                            />
                        </div>
                        <div className="col-md-4">
                            <Input
                                onChange={this.onChangeHandler}
                                name="price"
                                value={this.state.price}
                                label="Price"
                                type="number"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="image"
                                value={this.state.image}
                                label="Image"
                            />
                            <Input
                                onChange={this.onChangeHandler}
                                name="material"
                                value={this.state.material}
                                label="Material"
                            />
                            <input type="submit" className="btn btn-primary" value="Create" disabled={this.state.submitting}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        state
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        createFurniture: (data) => dispatch(createFurnitureThunk(data))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePage));