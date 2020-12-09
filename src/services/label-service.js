import axios from 'axios';

export const addLabel = (data, token) =>{
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels?access_token=${token}`;
    return axios.post(`${URL}`, data)
};

export const getAllLabelList = (token) =>{
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/getNoteLabelList?access_token=${token}`;
    return axios.get(`${URL}`)
};

export const removeLabel = (id, token) =>{
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/5fcfaaa6d5d3de001e5d83b0/deleteNoteLabel?access_token=${token}`;
    return axios.delete(`${URL}`, id)
};

export const updateLabel = (data, token) =>{
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/5fcfaaa6d5d3de001e5d83b0/updateNoteLabel?access_token=${token}`;
    return axios.delete(`${URL}`, data)
};