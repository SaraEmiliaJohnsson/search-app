import axios from "axios";



const API_URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_API_URL = 'https://api.thecatapi.com/v1/images';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchData = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
        console.log('Fetched data:', response.data);
        const breeds = response.data;

        // Fetch images for each breed
        const breedsWithImages = await Promise.all(
            breeds.map(async (breed: any) => {
                if (breed.reference_image_id) {
                    const imageResponse = await axios.get(`${IMAGE_API_URL}/${breed.reference_image_id}`, {
                        headers: {
                            'x-api-key': API_KEY,
                        },
                    });
                    breed.image = { url: imageResponse.data.url };
                } else {
                    breed.image = { url: 'https://via.placeholder.com/300?text=No+Image+Available' };
                }
                return breed;
            })
        );

        return breedsWithImages;
    } catch (error) {
        console.error('Error featching data: ', error);
        throw error;
    }
};
