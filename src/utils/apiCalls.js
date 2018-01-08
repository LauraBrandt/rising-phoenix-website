import axios from 'axios';
import { getAccessToken } from './authService';

export {getData, postData};

function getData(endpoint) {
  return axios.get(endpoint)
    .then(response => response.data)
    .catch(error => {
      return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message }
    });
}

function postData(endpoint, data) {
  return axios({ 
    method: 'POST', 
    url: endpoint, 
    headers:{ Authorization: `Bearer ${getAccessToken()}` }, 
    data: data
  })
    .then(response => response.data)
    .catch(error => 
      {
        return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message }
      }
    );
}
