import { Add, Delete } from '@mui/icons-material';
import { FormControl, FormLabel, IconButton, Input, List, ListItem, ListItemContent } from '@mui/joy';
import { useState } from 'react';

export interface DeveloperListProps {
    developers: string[],
    onListChange: any,
}

function DeveloperList({ developers, onListChange }: DeveloperListProps) {
    const [name, setName] = useState('');
    const [names, setNames] = useState<string[]>([]);

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleAddName = (e: any) => {
        if (name.trim() !== '') {
            onListChange([...names, name]);
            setNames([...names, name]);
            setName('');
        }
    };

    const handleDeleteName = (index) => {
        const updatedNames = names.filter((_, i) => i !== index);
        onListChange(updatedNames);
        setNames(updatedNames);
    };

    return (
        <FormControl>
            <FormLabel>Developers(5 Max):</FormLabel>
            <List>
                {names.map((name, index) => (
                    <ListItem key={index} endAction={
                        <IconButton aria-label="Delete" size="sm" onClick={() => handleDeleteName(index)}>
                            <Delete />
                        </IconButton>
                    }>
                        <ListItemContent key={index}>
                            {name}
                        </ListItemContent>
                    </ListItem>
                ))}
            </List>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <Input
                        value={name}
                        size="lg"
                        placeholder="Adam Sandler"
                        disabled={names.length >= 5}
                        onChange={handleNameChange} />
                </div>
                <div style={{ flex: 1 }}>
                    <IconButton aria-label="Add" size="lg" onClick={handleAddName}>
                        <Add />
                    </IconButton>
                </div>
            </div>
        </FormControl>
    );
}

export default DeveloperList;
