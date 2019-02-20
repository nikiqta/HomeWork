import React from 'react';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState() {
        this.setState({
            title: '',
            description: '',
            imageUrl: ''
        })
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="create-form">
                <h1>Create game</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onCreateSubmit(this.state);
                    this.resetState();
                }}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        id="title"
                        onChange={this.onChangeHandler}
                    />
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={this.state.description}
                        id="description"
                        onChange={this.onChangeHandler}
                    />
                    <label>ImageUrl</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        id="imageUrl"
                        onChange={this.onChangeHandler}
                    />
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}

export default CreateForm;

