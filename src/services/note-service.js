import axios from 'axios'


export const addNotes = (data, token) => {
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes?access_token=${token}`;
    return axios.post(`${URL}`, data)
  };
export const getAllNotes = (token) => {
  const URL = `http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList?access_token=${token}`;
  return axios.get(`${URL}`)
};

export const updateNotes = (data, token) =>{
  const URL = `http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes?access_token=${token}`;
  return axios.post(`${URL}`, data)
};

export const addColorNotes = (data, token) =>{
  const URL = `http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes?access_token=${token}`;
  return axios.post(`${URL}`, data)
};