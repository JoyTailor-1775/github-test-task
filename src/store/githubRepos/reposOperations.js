import * as api from '../../api/github-api';
import actions from './reposActions';

const requestRepos = (params, cancelToken) => async (dispatch) => {
  dispatch(actions.fetchRequest());

  try {
    const response = await api.getRepos(params, cancelToken);
    dispatch(actions.getRepos(response));
    dispatch(actions.fetchSuccess());
  } catch (error) {
    dispatch(actions.fetchError(error.message));
  }
};

export default {
  requestRepos,
};
