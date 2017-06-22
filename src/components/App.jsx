import React, { Component } from 'react';
import PostsList from '../components/posts_list';

export default class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <PostsList />
                </div>
            </div>
        );
    }
}
