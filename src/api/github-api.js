import axios from 'axios';
import * as proxy from './cachingProxy';

export const getRepos = async ({ name, page, order }, callEntity) => {
  // Creates query, depending on incoming parameters.
  const BASE_QUERY = `https://api.github.com/search/repositories?q=${name}&page=${
    page + 1
  }&per_page=30`;
  const query = order ? `${BASE_QUERY}&sort=stars&order=${order}` : BASE_QUERY;

  // Checks if there is already such value in the LocalStorage, and returns it
  // if true.
  try {
    const cache = await proxy.getItem(query);
    if (cache) return cache;
  } catch (error) {
    console.error('LocalStorage error: ', error);
  }

  // Requests a new data from git-hub api.
  const res = await axios
    .get(query, {
      cancelToken: callEntity.token,
    })
    .then((response) => {
      // Tries to save the api response into the LocalStorage, wether succeeded
      // or not, returns new response to app.
      try {
        proxy.setItem(query, response.data);
      } catch (error) {
        console.error('LocalStorage error: ', error);
      } finally {
        return response.data;
      }
    })
    .catch((exeption) => {
      if (axios.isCancel(exeption)) {
        console.log(exeption.message);
      } else {
        console.error('GitHub API error: ', exeption);
      }
    });

  return res;
};
