import axios from 'axios';

export const getRepos = ({ name, page, order }) => {
  const BASE_QUERY = `https://api.github.com/search/repositories?q=${name}&page=${
    page + 1
  }&per_page=30`;
  const query = order ? `${BASE_QUERY}&sort=stars&order=${order}` : BASE_QUERY;
  return axios
    .get(query, {
      headers: { 'If-Modified-Since': 'Thu, 05 Jul 2012 15:31:30 GMT' },
    })
    .then((response) => {
      console.log(response.headers);
      return response.data;
    })
    .catch((error) => {
      console.log('GitHub API error: ', error);
    });
};
