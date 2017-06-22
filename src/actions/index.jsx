import axios from 'axios';

const ROOT_URL = 'https://www.reddit.com/r/';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchPosts() {
	const url = `${ROOT_URL}reactjs.json`;
	const request = axios.get(url);

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function fetchComments(id) {
	const url = `${ROOT_URL}reactjs/${id}.json`;
	const request = axios.get(url);

	return {
		type: FETCH_COMMENTS,
		payload: request
	};
}
