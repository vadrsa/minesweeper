import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.get('token');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();