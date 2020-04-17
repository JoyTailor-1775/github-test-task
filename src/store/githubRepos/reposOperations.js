import * as api from '../../api/github-api';
import actions from './reposActions';

const requestRepos = (params) => async (dispatch) => {
  dispatch(actions.fetchRequest());

  try {
    const response = await api.getRepos(params);
    dispatch(actions.getRepos(response));
    dispatch(actions.fetchSuccess());
  } catch (error) {
    dispatch(actions.fetchError(error.message));
  }
};

export default {
  requestRepos,
};
