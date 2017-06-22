import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsList extends Component {
	componentDidMount() {
		this.props.fetchPosts('reactjs');
	}

	renderPosts() {
		console.log('this.props.posts=');
		console.log(this.props.posts);
		return _.map(this.props.posts, post => {
			return (
				<li key={post.id} className="list-group-item">
					<Link to={`/comments/${post.id}`}>
						{post.title}
					</Link>
				</li>
			);
		})

	}

	render() {
		return (
			<ol>
				{this.renderPosts()}
			</ol>
		);
	}
}

function mapStateToProps(state) {
	console.log('state.posts=');
	console.log(state.posts);
	return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
