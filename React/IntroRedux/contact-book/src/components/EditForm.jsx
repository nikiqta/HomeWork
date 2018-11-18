import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateContact } from './../store/actionCreators/postData.js';

class EditForm extends Component{

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeHandler(e){
          this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
          e.preventDefault(e);
          this.props.updateContact(this.props.match.params.id,{
              firstNAme: this.state.firstName,
              lastName: this.state.lastName,
              phone: this.state.phone,
              email: this.state.email
          });
    }

    componentDidMount(){
        if(this.props.match.params.id){
            let contact = this.props.contacts.filter(c => c.id === this.props.match.params.id)[0];
            if (contact){
                this.setState({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                    email: contact.email
                });
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id){
            let contact = nextProps.contacts.filter(c => c.id === nextProps.match.params.id)[0];
            if (contact){
                this.setState({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                    email: contact.email
                });
            }
        }
    }

    render(){
         return (
             <div className="box-large">
                 {/*
                    <Route exact path="/"
                           render={props => (
                           )}
                    />
                    <Route path="/edit/:id" render={props => {
                        if (contacts.length < 1) {
                            return null;
                        }

                        let contact = contacts
                            .filter(u => u.id === props.match.params.id)[0];
                        if (!contact) {
                        }

                        const {firstName, lastName, phone, email} = contact;

                        return (<EditForm
                            firstName={firstName}
                            lastName={lastName}
                            phone={phone}
                            email={email}
                        />);
                    }}/>
                    */}
                 <h1>My Profile</h1>
                 <div className="content">
                     <div className="info">
                         <div className="col centered">
                             <span className="avatar">&#9787;</span>
                             <button>Change</button>
                         </div>
                         <div className="col">
                             <form onSubmit={this.onSubmit} className="profile-editor">
                                 <label>First name:</label>
                                 <input
                                     onChange={(e) => this.onChangeHandler(e)}
                                     name="firstName"
                                     type="text"
                                     value={this.state.firstName}/><br/>
                                 <label>Last name:</label>
                                 <input
                                     onChange={(e) => this.onChangeHandler(e)}
                                     name="lastName"
                                     type="text"
                                     value={this.state.lastName}/><br/>
                                 <label>Phone:</label>
                                 <input
                                     onChange={(e) => this.onChangeHandler(e)}
                                     name="phone"
                                     type="text"
                                     value={this.state.phone}/><br/>
                                 <label>E-mail:</label>
                                 <input
                                     onChange={(e) => this.onChangeHandler(e)}
                                     name="email"
                                     type="text"
                                     value={this.state.email}/><br/>
                                 <input
                                     type="submit"
                                     value="Save changes"/>
                             </form>
                         </div>
                     </div>
                 </div>
             </div>
         );
    }

}

function mapStateToProps(state) {
    return{
        contacts: state.contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateContact: (id, contact) => dispatch(updateContact(id, contact))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);