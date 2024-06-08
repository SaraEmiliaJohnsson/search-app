import React, { useState } from "react";
import { Breed } from "./SearchApp";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";


interface BreedDrawerProps {
    breeds: Breed[];
    onSelectedBreed: (breed: Breed) => void;
}

const BreedDrawer: React.FC<BreedDrawerProps> = ({ breeds, onSelectedBreed }) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (e: React.KeyboardEvent | React.MouseEvent) => {
        if (e.type === 'keydown' && ((e as React.KeyboardEvent).key === 'Tab' || (e as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <div>
            <IconButton edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250, overflowY: 'auto' }}>
                    {breeds.map((breed) => (
                        <ListItem key={breed.id} disablePadding>
                            <ListItemButton onClick={() => { onSelectedBreed(breed); setOpen(false); }}>
                                <ListItemText primary={breed.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};

export default BreedDrawer;