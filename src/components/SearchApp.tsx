import { useEffect, useState } from "react";
import { fetchData } from "./ApiService";


interface Breed {
    id: number;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    image: {
        url: string;
    }
}


export const SearchApp: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                setBreeds(result);
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        getData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleBreedClick = (breed: Breed) => {
        setSelectedBreed(breed);
    };

    const filteredBreeds = breeds.filter(breed =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className="p-4">
                <h1>Search for a Cat Breed!</h1>

                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="w-full p-2 mb-4 border border-gray-300 rounded" />

                {selectedBreed && (
                    <div className="p-4 mt-4 border border-gray-200 rounded shadow">
                        <h3 className="text-xl font-bold">{selectedBreed.name}</h3>
                        <p><strong>Temperament:</strong> {selectedBreed.temperament || "No temperament information available"}</p>
                        <p><strong>Origin:</strong> {selectedBreed.origin || "No origin information available"}</p>
                        <p>{selectedBreed.description || "No description available"}</p>
                        {selectedBreed.image && <img src={selectedBreed.image.url} alt={selectedBreed.name} className="mt-2" />}
                    </div>
                )}

                <ul className="list-none space-y-4">

                    {filteredBreeds.map(breed => (
                        <li key={breed.id} className="p-4 border border-gray-200 rounded shadow cursor-pointer" onClick={() => handleBreedClick(breed)} >

                            <h3 className="text-xl font-bold">{breed.name}</h3>

                            <p>Temperament: {breed.temperament || "No temperament information available"}</p>
                            <p>Origin: {breed.origin || "No origin information available"}</p>

                        </li>
                    ))}

                </ul>


            </section>
        </>
    )
}