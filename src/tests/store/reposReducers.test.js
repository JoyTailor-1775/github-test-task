import reducer from '../../store/githubRepos/reposReducers';
import { reposActions } from '../../store/githubRepos/';
import { createStore } from 'redux';

describe('reposReducers', () => {
  const store = createStore(reducer);

  it('Should add new repositories', () => {
    const repos = [{ name: 'repo1', creator: 'god', number: 777 }];

    store.dispatch(reposActions.getRepos(repos));
    const actualStore = store.getState().repos;
    expect(actualStore).toEqual(repos);
  });

  it('Should change query', () => {
    const query = {
      name: 'asds',
      order: 'asc',
      page: 2,
    };

    store.dispatch(reposActions.updateQueryRequest(query));
    const actualStore = store.getState().query;
    expect(actualStore).toEqual(query);
  });

  it('Should set loading status properly', () => {
    let actualStore;
    store.dispatch(reposActions.fetchRequest());
    actualStore = store.getState().loading;
    expect(actualStore).toBeTruthy();

    store.dispatch(reposActions.fetchSuccess());
    actualStore = store.getState().loading;
    expect(actualStore).toBeFalsy();

    store.dispatch(reposActions.fetchRequest());
    actualStore = store.getState().loading;
    expect(actualStore).toBeTruthy();

    store.dispatch(reposActions.fetchError({ type: 401, message: 'very very bad error' }));
    actualStore = store.getState().loading;
    expect(actualStore).toBeFalsy();
  });

  it('Should set error status properly', () => {
    let actualStore;
    store.dispatch(reposActions.fetchRequest());
    actualStore = store.getState().error;
    expect(actualStore).toBeNull();

    const error = { type: 401, message: 'very very bad error' };

    store.dispatch(reposActions.fetchError(error));
    actualStore = store.getState().error;
    expect(actualStore).toEqual(error);
  });
});
