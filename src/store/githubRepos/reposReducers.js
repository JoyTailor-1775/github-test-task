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

function queryRequestReducer(state = { ...INITIAL_QUERY }, { type, payload }) {
  switch (type) {
    case types.UPDATE_QUERY_REQUEST:
      const newState = Object.assign(state, payload);
      return newState;

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

function cancelToken(state = null, { type, payload }) {
  switch (type) {
    case types.CHANGE_CANCEL_TOKEN:
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
  cancelToken: cancelToken,
});
