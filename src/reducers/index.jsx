import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
  posts: PostsReducer,
  thread: CommentsReducer
});

export default rootReducer;
