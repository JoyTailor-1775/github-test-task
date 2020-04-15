import axios from 'axios';

const getRepos = (name, page) => {
  return axios
    .get(
      `https://api.github.com/search/repositories?q=${name}&page=${page}&per_page=30`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('GitHub API error: ', error);
    });
};

export default getRepos;
