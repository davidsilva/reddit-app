import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../actions';

class CommentsList extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchComments(id);
	}

	renderOriginalPost() {
		if (this.props.thread.originalPost) {
			console.log('this.props.thread.originalPost');
			console.log(this.props.thread.originalPost);
			return (
				<h1>{this.props.thread.originalPost.title}</h1>
			)
		}
	}
	
	renderComments() {
		return (
			_.map(this.props.thread.comments, comment => {
				console.log('comment=');
				console.log(comment);
				return ([
					<ol className="list-group">
						{this.renderReplies(comment.data)}
					</ol>
					
				])
			})
		);
	}

	renderReplies(listing) {
		console.log('listing=');
		console.log(listing);
		if (listing.replies !== null && typeof listing.replies === 'object') {
			return (
				<li key={listing.id} className="list-group-item" style={{color: "blue"}}>
					{listing.body}
					<ol className="list-group" style={{color: "green"}}>
						{this.renderReplies(listing.replies.data.children[0].data)}
					</ol>
				</li>
			);
		}
		else {
			return (
				<li key={listing.id} className="list-group-item" style={{color: "red"}}>
					{listing.body}
				</li>
			);
		}
	}

	render() {
		return (
			<div>
			<div>{this.renderOriginalPost()}</div>
			{this.renderComments()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log('state.thread=');
	console.log(state.thread);
	return {
		thread: state.thread
	};
}

export default connect(mapStateToProps, { fetchComments })(CommentsList);
