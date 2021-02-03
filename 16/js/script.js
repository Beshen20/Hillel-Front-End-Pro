const makeGithubApiRequest = async (...options) => {
  const response = await fetch(...options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status} ${error.message}`);
  }
  return await response.json();
};

const loadUser = (userName) =>
  makeGithubApiRequest('https://api.github.com/users/' + userName);

const loadRepos = (reposUrl) => makeGithubApiRequest(reposUrl);

const createReposHTML = (repos) => {
  const list = repos.map((repo) => {
    return `<li><a href=${repo.html_url} target="_blank">${repo.name}</a></li>`;
  });
  return `<li>${list.join('')}</li>`;
};

const createUserHTML = (user, userRepos) => `
  <img class="ms-user__image" src=${user.avatar_url}/> 
  <h2 class="ms-username">${user.name ? user.name : user.login}</h2>
  <h4 class="ms-user__url"> 
    <a href="${user.html_url}" target="_blank">@${user.login}</a>
  </h4>
  <p class="ms-repo__count">Total Repo: ${user.public_repos}</p>
  <p class="ms-followers">Followers: ${user.followers}</p>
  <p class="ms-following">Following: ${user.following}</p>
  <h3 class="ms-bio">Bio:</h3>
  <p>${user.bio}</p>
  <h3>User repos</h3>
  ${createReposHTML(userRepos)}`;
const createErrorHTML = (error) => `<h3>Error: ${error.message}!</h3>`;

const searchInput = document.querySelector('.ms-input');
const searchButton = document.querySelector('.ms-btn--pull');
const resultsContainer = document.querySelector('.ms-user__container');

const search = async (userName) => {
  try {
    const user = await loadUser(userName);
    const repos = await loadRepos(user.repos_url);
    resultsContainer.innerHTML = createUserHTML(user, repos);
  } catch (error) {
    resultsContainer.innerHTML = createErrorHTML(error);
  }
};

searchButton.addEventListener('click', () => search(searchInput.value));
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    search(searchInput.value);
  }
});