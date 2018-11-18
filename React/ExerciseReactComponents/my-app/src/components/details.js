import React, {Component} from 'react';
import Character from "./Character.js";

  class Bio extends Component{
       constructor(props){
           super(props);

           this.state = {
                 id: 0,
               currentChar: {
                     url:''
               }
           };
       }

       componentDidMount(){
           fetch('http://localhost:9999/character/' + this.state.id)
               .then(data => {
                  return data.json();
               })
               .then(parsedData => {
                   this.setState({currentChar: parsedData});
               });
       }

       render(){
           return(
               <div className='heroDetails'>
                   <fieldset>
                       <Character params={({url:this.state.currentChar.url})}/>
                       <p>{this.state.currentChar.bio}</p>
                   </fieldset>
               </div>
           );
       }
  }

export default Bio;