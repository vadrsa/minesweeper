import axios from 'axios';
import Cookies from 'universal-cookie';
const apiUrl = 'http://localhost:3030';
const cookies = new Cookies();
console.log(apiUrl);

function saveToken(res) {
  cookies.set('token', res.data.token);

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

  return res;
}

async function loginUser(credentials) {
  return axios
    .post(apiUrl + '/auth/login', credentials)
    .then(saveToken)
    .catch(e => {
      console.log(e);
    });
}

async function registerUser(credentials) {
  return axios.post(apiUrl + '/users/register', credentials).catch(e => {
    console.log(e.response);
  });
}

function logoutUser() {
  cookies.remove('token');
}

function isLoggedIn() {
  return cookies.get('token');
}

function getProfile() {
  return axios
    .get(apiUrl + '/users/profile')
    .then(res => {
      console.log(res);
      console.log(123123);
      return res;
    })
    .catch(e => {
      console.log(e.response);
      console.log(e.response.status);
      if (e.response.status === 403) {
        console.log(123123);
        logoutUser();
      }
    });
}

export default {
  loginUser,
  logoutUser,
  registerUser,
  isLoggedIn,
  getProfile
};
