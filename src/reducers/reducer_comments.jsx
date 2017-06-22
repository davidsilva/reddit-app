import _ from 'lodash';
import { FETCH_COMMENTS } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			/*
			[{data: {children: {data: {id: '', author: '', title: ''}}}}]
			*/
			console.log('FETCH_COMMENTS');
			console.log("action.payload.data=");
			console.log(action.payload.data);
			// first object in array is original post
			var originalPost = action.payload.data[0].data.children[0].data;
			// second object contains the comments
			var commentsArray = action.payload.data[1].data.children;

			var comments;
			comments = _.mapKeys(commentsArray, 'data.id');
			/*
			for (var i = 0; i < action.payload.data.length; i++) {
				comments[i] = {};
				for (var j = 0; j < action.payload.data[i].data.children.length; j++) {
					comments[i][action.payload.data[i].data.children[j].data.id] = action.payload.data[i].data.children[j].data;
				}
			}
			*/
			console.log('originalPost=');
			console.log(originalPost);
			console.log('comments=');
			console.log(comments);

			return {...state, originalPost: originalPost, comments: comments};
		default:
			return state;
	}
}
