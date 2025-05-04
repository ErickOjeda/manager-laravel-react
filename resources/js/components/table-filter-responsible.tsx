import React, { useEffect, useState } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Box,
    Grid
} from '@mui/material';
import { fetchData } from '../services/cityService';

interface CityData {
    name: string;
    state: string;
}

interface TableFiltersProps {
    filters: {
        name: string;
        email: string;
        phone: string;
        city: string;
        state: string;
    };
    onFilterChange: (field: string, value: string) => void;
    onReset: () => void;
}

const TableFilters: React.FC<TableFiltersProps> = ({ filters, onFilterChange, onReset }) => {
    const [cities, setCities] = useState<CityData[]>([]);
    const [filteredCities, setFilteredCities] = useState<CityData[]>([]);

    useEffect(() => {
        const loadCities = async () => {
            try {
                const data = await fetchData();
                setCities(data);
                setFilteredCities(data); 
            } catch (error) {
                console.error('Erro ao carregar cidades:', error);
            }
        };
        loadCities();
    }, []);

    useEffect(() => {
        if (filters.state) {
            const citiesInState = cities.filter(city => city.state === filters.state);
            setFilteredCities(citiesInState);
        } else {
            setFilteredCities(cities); 
        }
    }, [filters.state, cities]);

    const uniqueStates = Array.from(new Set(cities.map(c => c.state))).sort();

    return (
        <Box sx={{ p: 2, mb: 3, border: '1px solid #eee', borderRadius: 1 }}>
            <Box sx={{ mb: 2 }}>
                <h3>Filtrar</h3>
            </Box>
            <Grid container spacing={2}>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        label="Nome"
                        value={filters.name}
                        onChange={(e) => onFilterChange('name', e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={filters.email}
                        onChange={(e) => onFilterChange('email', e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <TextField
                        fullWidth
                        label="Telefone"
                        value={filters.phone}
                        onChange={(e) => onFilterChange('phone', e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                </Grid>



                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={filters.state}
                            label="Estado"
                            onChange={(e) => onFilterChange('state', e.target.value)}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {uniqueStates.map(state => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Cidade</InputLabel>
                        <Select
                            value={filters.city}
                            label="Cidade"
                            onChange={(e) => onFilterChange('city', e.target.value)}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            {filteredCities.map(city => (
                                <MenuItem key={city.name} value={city.name}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                

                <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button variant="outlined" onClick={onReset} size="small" sx={{fontWeight: 'bold' }}> 
                            Limpar Filtros
                        </Button>
                        <Button variant="contained" size="small" sx={{fontWeight: 'bold' }}> 
                            Aplicar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TableFilters;
