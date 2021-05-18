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
function toData(res){
  return res.data;
}

function loginUser(credentials) {
  return axios
    .post(apiUrl + '/auth/login', credentials)
    .then(saveToken)
    .then(toData)
    .catch(e => {
      console.log(e);
    });
}

function registerUser(credentials) {
  return axios.post(apiUrl + '/users/register', credentials)
  .then(toData).catch(e => {
    console.log(e.response);
  });
}

function logoutUser() {
  const cookies = new Cookies();
  cookies.remove('token', { path: '/' });
  console.log("123");
}

function isLoggedIn() {
  return cookies.get('token', { path: '/' });
}

function getProfile() {
  return  cachios
    .get(apiUrl + '/users/profile', {ttl: 30})
    .then(toData)
    .catch(logoutIfNecessary);
}

export default {
  loginUser,
  logoutUser,
  registerUser,
  isLoggedIn,
  getProfile
};
