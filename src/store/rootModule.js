import { combineReducers } from 'redux';
import reposReducers from './githubRepos/reposReducers';

export default combineReducers({
  gitHub: reposReducers,
});
