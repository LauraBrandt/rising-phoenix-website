import decode from "jwt-decode";
import auth0 from "auth0-js";
import axios from "axios";

const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENTID;
const CLIENT_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const REDIRECT = `${window.location.origin}/admin/callback`;
const SCOPE = "openid email profile";
const AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN,
  responseType: "token id_token",
  redirectUri: REDIRECT,
  audience: AUDIENCE,
  scope: SCOPE
});

export function login() {
  auth.authorize();
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  window.location.href = "/";
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function sendResetPasswordRequest(callback) {
  const email = decode(getIdToken()).email;

  axios({
    method: "post",
    url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`,
    headers: { "content-type": "application/json", Authorization: `Bearer ${getAccessToken()}` },
    data: {
      client_id: process.env.REACT_APP_AUTH0_CLIENTID,
      email: email,
      connection: "Username-Password-Authentication"
    }
  })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(error.response.message);
    });
}
