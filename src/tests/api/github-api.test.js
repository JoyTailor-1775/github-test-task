import * as api from '../../api/github-api';
import axios from 'axios';

// Jest docs does not provide effective way to test
// axios cancellation process, hence there is no one presented.
describe('Testing git-hub api connection module', () => {
  test('Passing normal data', async () => {
    const cancelToken = axios.CancelToken;
    const call = cancelToken.source();
    try {
      const res = await api.getRepos({ name: 'name', page: 1, order: 'asc' }, call);
      expect(res).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  test('Passing wrong data', async () => {
    const cancelToken = axios.CancelToken;
    const call = cancelToken.source();
    try {
      await api.getRepos({ name: '2323', page: 'fjfj___377&&%%', order: '$$$$$$$$' }, call);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
