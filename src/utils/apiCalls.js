import axios from 'axios';
import { getAccessToken } from './authService';

export {getData, postData};

function getData(endpoint) {
  return axios.get(endpoint)
    .then(response => response.data)
    .catch(error => error.response);
}

function postData(endpoint, data) {
  return axios({ 
    method: 'POST', 
    url: endpoint, 
    headers:{ Authorization: `Bearer ${getAccessToken()}` }, 
    data: data
  })
    .then(response => response.data)
    .catch(error => error.response);
}
