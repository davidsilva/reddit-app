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

	renderTopComments() {
		return this.renderComments(this.props.thread.comments);
	}
	
	renderComments(comments) {
		console.log('render comments', comments);
		return (
			_.map(comments, comment => {
				console.log('comment=');
				console.log(comment);
				// kind: t1 (comment)
				return ([
					<ol className="list-group">
						{this.renderComment(comment.data)}
					</ol>
					
				])
			})
		);
	}

	renderComment(comment) {
		console.log('comment=');
		console.log(comment);
		if (comment.replies !== null && typeof comment.replies === 'object') {
			// replies is a Listing, (not a thing), whose data prop has a list
			// of things in the children prop.
			return (
				<li key={comment.id} className="list-group-item" style={{color: "blue"}}>
					{comment.body}
					<ol className="list-group" style={{color: "green"}}>
						{this.renderComments(comment.replies.data.children)}
					</ol>
				</li>
			);
		}
		else {
			return (
				<li key={comment.id} className="list-group-item" style={{color: "red"}}>
					{comment.body}
				</li>
			);
		}
	}

	render() {
		return (
			<div>
			<div>{this.renderOriginalPost()}</div>
			{this.renderTopComments()}
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
