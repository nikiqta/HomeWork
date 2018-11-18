import React, {Component} from 'react';
import FurnitureList from "../common/FurnitureList";
import Paginator from "../common/Paginator";
import {connect} from 'react-redux';
import {fetchPageThunk, fetchSearchThunk} from "../../actions/furnitureActions";

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler(e) {
        e.preventDefault(e);
        this.props.fetchSearch(this.state.query, 1);
    }

    componentWillMount() {
        this.props.fetchPage(1);
    }

    render() {

        let furniture = this.props.furniture;
        const page = this.props.match.params.page || 1;

        if (this.state.query !== '') {
            furniture = furniture.filter(f => (f.make.toLowerCase()
                    .includes(this.state.query
                        .toLowerCase())
                ||
                f.model.toLowerCase()
                    .includes(this.state.query
                        .toLowerCase())));
        }

        const pageLength = 2;

        furniture = furniture.slice((page - 1) * pageLength, page * pageLength);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>

                        <form onSubmit={this.onSubmitHandler} className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2"
                                   placeholder="Search"
                                   onChange={(e) => this.onChangeHandler(e)}
                                   type="text"
                                   name="query"
                                   value={this.state.query}
                            />
                            <input className="btn btn-secondary my-2 my-sm-0" value="Search" type="submit"/>
                        </form>
                    </div>
                </div>
                <FurnitureList furniture={furniture}/>
                <Paginator
                   items={this.props.items}
                   pageLength={pageLength}
                   currentPage={Number(page)}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        furniture: state.furniture,
        items: state.stats.furniture
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPage: (page) => dispatch(fetchPageThunk(page)),
        fetchSearch: (query, page) => dispatch(fetchSearchThunk(query, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);