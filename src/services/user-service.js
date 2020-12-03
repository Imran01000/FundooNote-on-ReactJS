import axios from 'axios'


export const userlogin = (data) => {
    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/login";
    console.log("This is from service class", data);
    return axios.post(`${URL}`, data)
  };

export const userRegistration = (data) => {
    const URL = "http://fundoonotes.incubation.bridgelabz.com/api/user/adminSignUp"
    return axios.post(URL, data)
}