import _axios from 'axios';

const axios = _axios.create({
  withCredentials: true
});

const baseURL = "http://192.168.100.6:4000";

const requests = {
  get: (url, config)=> 
    axios.get(`${baseURL}${url}`, config),
  postJSON: (url, data, config)=> 
    axios.post(`${baseURL}${url}`, data, {...config, 
    headers: {"Content-Type": "application/json"}}),
  put: (url, data, config)=>
    axios.put(`${baseURL}${url}`, data, config),
  delete: (url, config)=> 
    axios.delete(`${baseURL}${url}`, config),
};

const Color = {
  getList: ()=> 
    requests.get("/color/list"),
  save: (color)=> 
    requests.postJSON("/color/add", {color}),
  delete: (colorId)=> 
    requests.postJSON("/color/delete", {colorId}),
  getFileURL: (languageExtension)=> 
    `${baseURL}/color/file?language=${languageExtension}`,
  getAPIData: ()=> 
    requests.get("/color/apiData")
};

export default { Color };