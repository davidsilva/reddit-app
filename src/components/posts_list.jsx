import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsList extends Component {
	componentDidMount() {
		this.props.fetchPosts('reactjs');
	}

	renderPosts() {
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
			<ol className="list-group">
				{this.renderPosts()}
			</ol>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
