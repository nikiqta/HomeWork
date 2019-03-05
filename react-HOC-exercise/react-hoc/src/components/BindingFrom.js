import React, { Component } from 'react';

class BindingForm extends Component {
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
        <form 
        onSubmit={(e) => {
            e.preventDefault();
            return this.props.onSubmit(this.state)}}
        >
        {React.Children.map(this.props.children, child => {
          if (child.type === 'input') {
            return React.cloneElement(child, {
              onChange: this.handleChange.bind(this),
              ...child.props
            });
          }
          return child;
        })}
        <input type="submit" value="Register" />
        </form>
    );
  }
}

export default BindingForm;
