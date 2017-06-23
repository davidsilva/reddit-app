import _ from 'lodash';
import { FETCH_COMMENTS } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			// first object in array is original post
			let originalPost = action.payload.data[0].data.children[0].data;
			// second object contains the comments
			let commentsArray = action.payload.data[1].data.children;

			let comments;
			comments = _.mapKeys(commentsArray, 'data.id');
			return {...state, originalPost: originalPost, comments: comments};
		default:
			return state;
	}
}
