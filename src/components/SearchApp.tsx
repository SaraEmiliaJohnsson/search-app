import { useEffect, useRef, useState } from "react";
import { fetchData } from "./ApiService";
import CatCard from "./CatCard";


export interface Breed {
    id: number;
    name: string;
    temperament: string;
    origin: string;
    description: string;
    image?: {
        url: string;
    }
}


export const SearchApp: React.FC = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchData();
                console.log('Breeds:', result);
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
        if (cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
                    <div ref={cardRef}
                        className="p-4 mt-4 border border-gray-200 rounded shadow">
                        <CatCard breed={selectedBreed} />
                    </div>
                )}

                <ul className="list-none space-y-4">

                    {filteredBreeds.map(breed => (
                        <li key={breed.id} onClick={() => handleBreedClick(breed)} className="cursor-pointer hover:bg-gray-100 p-2 rounded" >
                            {breed.name}
                        </li>
                    ))}

                </ul>


            </section>
        </>
    )
}