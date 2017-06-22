import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import App from './components/App';
import reducers from './reducers';
import PostsList from './components/posts_list';
import CommentsList from './components/comments_list';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/comments/:id" component={CommentsList} />
					<Route path="/" component={PostsList} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('.container')
)
