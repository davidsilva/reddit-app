import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_POSTS:
			console.log("action.payload.data.data.children=");
			console.log(action.payload.data.data.children);
			var posts = {};
			for (var i = 0; i < action.payload.data.data.children.length; i++) {
				posts[action.payload.data.data.children[i].data.id] = action.payload.data.data.children[i].data;
			}
			return posts;
		default:
			return state;
	}
}
