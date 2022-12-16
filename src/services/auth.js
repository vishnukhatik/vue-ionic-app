import jwtDecode from 'jwt-decode';

let userId;
let location;

function getUserId() {
  if (!userId && localStorage.access_token) {
    userId = jwtDecode(localStorage.access_token).id;
  }
  return userId;
}

function isLoggedIn() {
  // TODO: Validate token
  return !!localStorage.access_token;
}

async function getLocation() {
  if (location) {
    return location;
  }
  location = await fetch('https://ipapi.co/json/').then((r) => r.json());
  return location;
}

function getLanguage() {
  return localStorage.language || 'en';
}

export default {
  getUserId,
  isLoggedIn,
  getLocation,
  getLanguage,
};
