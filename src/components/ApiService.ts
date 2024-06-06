import axios from "axios";



const API_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error featching data: ', error);
        throw error;
    }
};
