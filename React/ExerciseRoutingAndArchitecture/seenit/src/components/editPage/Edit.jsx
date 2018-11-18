import React, {Component} from 'react';
import EditForm from "../forms/EditForm";
import reqHandler from "../../utils/requestHandler";
import dataCollector from "../../utils/dataCollector";


export default class Edit extends Component{
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            title: '',
            imageUrl: '',
            description: '',
            author: ''
        };

        this.dataCollector = this.dataCollector.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        reqHandler.getPostDetails(this.props.match.params.id).then((data => {
            this.setState({url: data.url,
                           title: data.title,
                           imageUrl: data.imageUrl,
                           description: data.description,
                           author: data.author});
        }));
    }

    dataCollector(e){
        this.setState(dataCollector(e));
        console.log(this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        reqHandler.editPost(this.props.match.params.id, this.state).then(response => {
             //  this.props.history.push("/");
            window.history.go(-1);
        });
    }

    render(){
        return(
            <section id="viewEdit">
                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <EditForm
                        onClickFunc={this.dataCollector}
                        onSubmitFunc={this.onSubmit}
                        data={this.state}/>
                </div>
            </section>
        );
    }

}