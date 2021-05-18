import axios from 'axios';
import cachios from 'cachios';
import Cookies from 'universal-cookie';
const apiUrl = 'http://localhost:3030';
const cookies = new Cookies();
console.log(apiUrl);

function saveToken(res) {
  cookies.set('token', res.data.token, { path: '/' });

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

  return res;
}


function logoutIfNecessary(e){
  if (e.response.status === 403) {
    logoutUser();
    location.reload();
  }
}

function loginUser(credentials) {
  return axios
    .post(apiUrl + '/auth/login', credentials)
    .then(saveToken)
    .then(res => res.data)
    .catch(e => {
      console.log(e);
    });
}

function registerUser(credentials) {
  return axios.post(apiUrl + '/users/register', credentials)
  .then(res => res.data).catch(e => {
    console.log(e.response);
  });
}

function logoutUser() {
  const cookies = new Cookies();
  cookies.remove('token', { path: '/' });
  console.log('123');
}

function isLoggedIn() {
  return cookies.get('token', { path: '/' });
}

function getProfile() {
  return  cachios
    .get(apiUrl + '/users/profile', {ttl: 30})
    .then(res => res.data)
    .catch(logoutIfNecessary);
}

function gameStart(difficulty) {
  return axios
    .post(apiUrl + '/users/newGame', { difficulty })
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e.response);
    });
}

function getTopUsers(difficulty){
  return axios.get(`${apiUrl}/users/top?difficulty=${difficulty}`).then(res => res.data);
}

export default {
  loginUser,
  logoutUser,
  registerUser,
  isLoggedIn,
  getProfile,
  getTopUsers,
  gameStart
};
