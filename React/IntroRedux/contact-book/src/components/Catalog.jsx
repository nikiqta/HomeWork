import React, {Component} from 'react';
import ContactList from "./ContactList";
import Details from "./Details";
import {connect} from 'react-redux';
import fetchData from "../store/actionCreators/fetchData";

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedId: 0};

        this.onContactClick = this.onContactClick.bind(this);
    }

    onContactClick(id) {
        this.setState({selectedId: id});
    }

    render() {
        const {contacts} = this.props;

        return (
            <div id="book">
                <ContactList
                    contacts={contacts}
                    clickHandler={this.onContactClick}
                    selectedId={this.state.selectedId}
                />
                <Details
                    user={contacts
                        .filter(u => u.id === this.state.selectedId)[0]}
                />
            </div>
        );
    }
}

// user={this.props.contacts.filter(u => u.id === this.state.selectedId)[0]}

function mapStateToProps(state) {

    return {
        contacts: state.contacts,
        ajaxStatus: state.ajaxStatus
    };

}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);