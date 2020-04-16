import axios from 'axios';

export const getRepos = ({ name, page, order }) => {
  const BASE_QUERY = `https://api.github.com/search/repositories?q=${name}&page=${page}&per_page=30`;
  const query = order ? `${BASE_QUERY}&sort=stars&order=${order}` : BASE_QUERY;
  return axios
    .get(query)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('GitHub API error: ', error);
    });
};
