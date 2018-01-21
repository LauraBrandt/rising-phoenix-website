import axios from "axios";
import { getAccessToken } from "./authService";

export {getData, postData, deleteData, putData};

const getData = (endpoint) => {
  return axios.get(endpoint)
    .then(response => response.data)
    .catch(error => {
      return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message };
    });
};

const postData = (endpoint, data) => {
  return axios({ 
    method: "POST", 
    url: endpoint, 
    headers:{ Authorization: `Bearer ${getAccessToken()}` }, 
    data: data
  })
    .then(response => response.data)
    .catch(error => {
      return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message };
    });
};

const deleteData = (endpoint, id) => {
  return axios({ 
    method: "DELETE", 
    url: endpoint, 
    headers:{ Authorization: `Bearer ${getAccessToken()}` }, 
    data: {id: id}
  })
    .then(response => response.data)
    .catch(error => {
      return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message };
    });
};

const putData = (endpoint, data) => {
  return axios({ 
    method: "PUT",
    url: endpoint, 
    headers:{ Authorization: `Bearer ${getAccessToken()}` }, 
    data: data
  })
    .then(response => response.data)
    .catch(error => {
      return error.response ? error.response.data.message ? { error: error.response.data.message } : { error: error.message } : { error: error.message };
    });
};
