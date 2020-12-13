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
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${id}/deleteNoteLabel?access_token=${token}`;
    return axios.delete(`${URL}`)
};

export const updateLabel = (data, token, LabelId) =>{
    const URL = `http://fundoonotes.incubation.bridgelabz.com/api/noteLabels/${LabelId}/updateNoteLabel?access_token=${token}`;
    return axios.post(`${URL}`, data)
};