import axios from 'axios';
import { BASE_API_URL } from '../../../utils/constants'

export const getAllTopics = async (id) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/topics?userid=${id}`);
        if (!res.status == 200) {
            throw new Error("Failed to fetch topic");
        }
        return res;
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

export const addTopics = async (inputData) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/topics`, inputData)
        return res;
    } catch (error) {
        console.error(error)
    }
}

export const editTopic = async ({ id, inputData }) => {
    try {
        const res = await axios.put(`${BASE_API_URL}/api/topics/${id}`, inputData)
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getTopicById = async (id) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/topics/${id}`);
        if (!res.status == 200) {
            throw new Error("Failed to fetch topic");
        }
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteTopic = async(id)=>{
    try{
        const res = await axios.delete(`${BASE_API_URL}/api/topics?id=${id}`);
        if(!res.status==201){
            throw new Error("Failed to delete.");
        }
        return res;
    }catch(err){
        console.log(err)
    }
}
