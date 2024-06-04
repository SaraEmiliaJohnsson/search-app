import { useEffect, useState } from "react";
import { fetchData } from "./ApiService";


interface Breed {
    id: number;
    name: string;
    description: string;
    image: {
        url: string;
    };
}

export const SearchApp: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredBreeds = breeds.filter(breed =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <section className="p-4">
                <h1>Search for a Dog Breed!</h1>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="w-full p-2 mb-4 border border-gray-300 rounded" />
                <ul className="list-none space-y-4">
                    {filteredBreeds.map(breed => (
                        <li key={breed.id} className="p-4 border border-gray-200 rounded shadow ">
                            <h3 className="text-xl font-bold">{breed.name}</h3>
                            <p>{breed.description}</p>
                            {breed.image && <img src={breed.image.url} alt={breed.name} className="mt-2" />}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}