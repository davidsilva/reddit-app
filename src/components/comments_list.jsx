import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments } from '../actions';
import { browserHistory } from 'react-router';

class CommentsList extends Component {

	constructor(props) {
		super(props);

		this.state = { sortKey: ''};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		console.log(this.props.match.params);
		this.props.fetchComments(id);
	}

	renderOriginalPost() {
		if (this.props.thread.originalPost) {
			//console.log('this.props.thread.originalPost');
			//console.log(this.props.thread.originalPost);
			return (
				<h2>{this.props.thread.originalPost.title}</h2>
			)
		}
	}

	renderTopComments() {
		//console.log('renderTopComments');
		//console.log(this.props.thread.comments);
		//console.log('sortKey=' + sortKey);
		if (this.props.thread.comments && _.isArray(this.props.thread.comments)) {
			//console.log('this.props.thread.comments before sort');
			//console.log(this.props.thread.comments);
			if (this.state.sortKey) {
				this.sort(this.props.thread.comments, this.state.sortKey);
			}
			//console.log('this.props.thread.comments after sort');
			//console.log(this.props.thread.comments);
		}
		return this.renderComments(this.props.thread.comments);
	}

	sort(comments, sortKey) {
		console.log('sort. sortKey=' + sortKey);
		if (comments && _.isArray(comments)) {
			console.log('comments before sort');
			console.log(comments);
			comments.sort(function(a, b) {
				var keyA, keyB;
				if (sortKey !== "ratio") {
					keyA = a.data[sortKey];
					keyB = b.data[sortKey];
				}
				else {
					keyA = a.data.ups / (a.data.ups + a.data.downs);
					keyB = b.data.ups / (b.data.ups + b.data.downs);
				}
				return keyB - keyA;
			});
			console.log('comments after sort');
			console.log(comments);
		}
	}
	
	renderComments(comments) {
		//console.log('render comments', comments);
		if (this.state.sortKey) {
			this.sort(comments, this.state.sortKey);
		}
		return (
			_.map(comments, comment => {
				//console.log('comment=');
				//console.log(comment);
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
		//console.log('comment=');
		//console.log(comment);
		let created = new Date(comment.created * 1000);
		let date = created.getDate();
		let month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][created.getMonth()];
		let year = created.getFullYear();
		let hours = created.getHours();
		let minutes = created.getMinutes();
		if (comment.replies !== null && typeof comment.replies === 'object') {
			// replies is a Listing, (not a thing), whose data prop has a list
			// of things in the children prop.
			return (
				<li key={comment.id} className="list-group-item">
					{comment.body}
					<div className="meta-info">ups: {comment.ups} / downs: {comment.downs} / created: {hours}:{minutes} {month} {date}, {year}</div>
					<ol className="list-group">
						{this.renderComments(comment.replies.data.children)}
					</ol>
				</li>
			);
		}
		else {
			return (
				<li key={comment.id} className="list-group-item">
					{comment.body}
					<div className="meta-info">ups: {comment.ups} / downs: {comment.downs} / created: {hours}:{minutes} {month} {date}, {year}</div>
				</li>
			);
		}
	}

	doSort(event) {
		event.preventDefault();
		console.log('value is=');
		console.log(event.target.value);
		//browserHistory.push(event.target.value);
		sortKey = event.target.value;
		this.setState({...state, "sortKey": sortKey});
	}

	render() {
		console.log('render');
		const { id } = this.props.match.params;
		return (
			<div>
				<div className="row">
					<div className="form-group col-xs-2">
						<label for="sort-select" className="control-label">Sort by...</label>
						<select id="sort-select" className="form-control" onChange={event => this.setState({sortKey: event.target.value})}>
							<option value="" selected></option>
							<option value="ups">ups</option>
							<option value="ratio">ratio</option>
							<option value="time">time</option>
						</select>
					</div>
					<div className="col-xs-2 col-xs-offset-8">
						<Link to="/">Home</Link>
					</div>
				</div>
				<div>{this.renderOriginalPost()}</div>
				{this.renderTopComments()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	//console.log('state.thread=');
	//console.log(state.thread);
	return {
		thread: state.thread
	};
}

export default connect(mapStateToProps, { fetchComments })(CommentsList);
