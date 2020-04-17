import types from './reposActionsTypes';

const getRepos = (repos) => ({
  type: types.GET_REPOS_SUCCESS,
  payload: repos,
});

const updateQueryRequest = (params) => ({
  type: types.UPDATE_QUERY_REQUEST,
  payload: params,
});

const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

const fetchError = (error) => ({
  type: types.FETCH_ERROR,
  payload: error,
});

const fetchSuccess = () => ({
  type: types.FETCH_SUCCESS,
});

export default {
  getRepos,
  updateQueryRequest,
  fetchRequest,
  fetchError,
  fetchSuccess,
};
