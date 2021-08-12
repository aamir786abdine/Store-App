import axios from "axios";

const baseUrl = "https://shopapp-withdb.herokuapp.com";

function get(url) {
  return axios.get(baseUrl + url);
}

function post(url, obj) {
  return axios.post(baseUrl + url, obj);
}

function put(url, obj) {
  return axios.put(baseUrl + url, obj);
}

export default {
  get,
  post,
  put,
};
