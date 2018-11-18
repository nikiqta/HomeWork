import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Catalog from "../catalog/Catalog";
import MyPosts from "../myPosts/myPosts";
import Submit from "../createPost/createPost";
import Details from "../details/Details";
import Edit from "../editPage/Edit";


export default function ViewComponent(props) {
    return (
      <Switch>
          <Route exact path="/" component={Catalog}/>
          <Route path="/catalog" component={Catalog}/>
          <Route path="/submit" component={Submit}/>
          <Route path="/myPosts" component={MyPosts}/>
          <Route path="/details/:id" component={Details}/>
          <Route path="/edit/:id" component={Edit}/>
      </Switch>
    );
}
