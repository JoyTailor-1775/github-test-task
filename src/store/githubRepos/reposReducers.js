import { combineReducers } from 'redux';
import types from './reposActionsTypes';

const INITIAL_QUERY = {
  name: '',
  page: 0,
  order: null,
};

function reposReducer(state = [], { type, payload }) {
  switch (type) {
    case types.GET_REPOS_SUCCESS:
      return payload;

    default:
      return state;
  }
}

function queryRequestReducer(state = INITIAL_QUERY, { type, payload }) {
  switch (type) {
    case type.UPDATE_QUERY_REQUEST:
      return { ...INITIAL_QUERY, ...payload };

    default:
      return INITIAL_QUERY;
  }
}

function loadingReducer(state = false, { type }) {
  switch (type) {
    case types.FETCH_REQUEST:
      return true;

    case types.FETCH_SUCCESS:
    case types.FETCH_ERROR:
      return false;

    default:
      return state;
  }
}

function errorReducer(state = null, { type, payload }) {
  switch (type) {
    case types.FETCH_REQUEST:
      return null;

    case types.FETCH_ERROR:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  loading: loadingReducer,
  error: errorReducer,
  repos: reposReducer,
  query: queryRequestReducer,
});
