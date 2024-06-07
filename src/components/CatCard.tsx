import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Breed } from "./SearchApp";

interface CatCardProps {
    breed: Breed;
}

export default function CatCard({ breed }: CatCardProps) {
    return (
        <Card sx={{ margin: 2, maxWidth: 345 }}>
            <CardHeader title={breed.name} />

            <CardMedia component='img' height='300' image={breed.image?.url || 'https://via.placeholder.com/300?text=No+Image+Available'} alt={breed.name} />


            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <strong>Temperament:</strong> {breed.temperament || "No temperament information available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Origin:</strong> {breed.origin || "No origin information available"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {breed.description || "No description available"}
                </Typography>
            </CardContent>
        </Card>
    );
}
