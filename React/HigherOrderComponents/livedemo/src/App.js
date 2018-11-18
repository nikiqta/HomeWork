import React, {Component} from 'react';
import './App.css';
import dataSource from './services/dataSource';
import CommentsList from './components/CommentsList.jsx'
import PostList from './components/PostList.jsx';
import withSubscription from './services/withSubscription';

const SubscribedList = withSubscription(CommentsList, 'comments');
const SubscribedPosts = withSubscription(PostList, 'posts');

dataSource.setData('comments',
       ['some comment',
        'another comments',
        'angry comments']);

dataSource.setData('posts',
    [
        {author: 'Pesho' , text: "What's up!"},
        {author: 'Gosho' , text: "Nothing so far!"}
    ]);

class App extends Component {

    constructor(props) {
        super(props);
    }

    changeData() {
        dataSource.setData('comment',
               ['some comment',
                'another comments',
                'angry comments',
                'haters gonna hate']);

        dataSource.setData('posts',
            [
                {author: 'Pesho' , text: "What's up!"},
                {author: 'Gosho' , text: "Nothing so far!"},
                {author: 'Sevdalin-Tigara', text: 'Mishkiiii shte vi razcepa!'}
            ]);
    }

    render() {
        return (
            <div className="App">
                <SubscribedList />
                <button onClick={this.changeData}>Change data</button>
                <SubscribedPosts />}/>
            </div>
        );
    }
}

export default App;
