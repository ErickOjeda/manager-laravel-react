import { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Typography
} from '@mui/material';
import { fetchData } from '../services/cityService';

export interface ClientFormData {
    id?: string;
    name: string;
    cpf: string;
    birth: string;
    genre: string;
    state: string;
    city: string;
    city_id?: string;
}

const genres = ['M', 'F'];

const ButtonModalEditCreate = ({ editItem, onSave, onClose }: { editItem?: ClientFormData, onSave: (formData: ClientFormData) => void, onClose?: () => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<ClientFormData>({
        name: '',
        cpf: '',
        birth: '',
        genre: '',
        state: '',
        city: '',
        city_id: ''
    });

    const [cities, setCities] = useState<{ id: string; name: string; state: string }[]>([]);
    const [filteredCities, setFilteredCities] = useState<{ id: string; name: string; state: string }[]>([]);
    const [uniqueStates, setUniqueStates] = useState<string[]>([]);

    useEffect(() => {
        const loadCities = async () => {
            try {
                const data: { id: string; name: string; state: string }[] = await fetchData();
                setCities(data);
                setFilteredCities(data);
                const states = Array.from(new Set(data.map((c: { state: string }) => c.state))).sort();
                setUniqueStates(states);
    
                if (editItem) {
                    const cityObj = editItem.city_id
                        ? data.find(c => c.id === editItem.city_id)
                        : data.find(c => c.name === editItem.city);
    
                    setFormData({
                        ...editItem,
                        city: cityObj?.name || '',
                        city_id: cityObj?.id || ''
                    });
                    setOpen(true);
                }
            } catch (error) {
                console.error('Erro ao carregar cidades:', error);
            }
        };
        loadCities();
    }, [editItem]);
    
    useEffect(() => {
        if (formData.state) {
            const citiesInState = cities.filter(city => city.state === formData.state);
            setFilteredCities(citiesInState);
        } else {
            setFilteredCities(cities);
        }
        setFormData(prev => ({ ...prev, city: '', city_id: '' }));
    }, [formData.state, cities]);
    

    useEffect(() => {
        if (editItem && cities.length > 0) {
            const cityObj = editItem.city_id
                ? cities.find(c => c.id === editItem.city_id)
                : cities.find(c => c.name === editItem.city);
            setFormData({
                ...editItem,
                city: cityObj?.name || '',
                city_id: cityObj?.id || ''
            });
            setOpen(true);
        }
    }, [editItem, cities]);

    const handleClickOpen = () => {
        if (!editItem) {
            setFormData({
                name: '',
                cpf: '',
                birth: '',
                genre: '',
                state: '',
                city: '',
                city_id: ''
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            let cleaned = value.replace(/\D/g, '');
            if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
            let formatted = cleaned;
            if (cleaned.length > 3) formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
            if (cleaned.length > 6) formatted = `${formatted.slice(0, 7)}.${formatted.slice(7)}`;
            if (cleaned.length > 9) formatted = `${formatted.slice(0, 11)}-${formatted.slice(11)}`;

            setFormData({
                ...formData,
                [name]: formatted
            });
        } else if (name === 'city') {
            const selectedCity = filteredCities.find(city => city.name === value);
            setFormData({
                ...formData,
                city: value,
                city_id: selectedCity ? selectedCity.id : ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = () => {
        const cleanedCpf = formData.cpf.replace(/\D/g, '');
        if (cleanedCpf.length !== 11) {
            alert('CPF inválido. Preencha todos os dígitos.');
            return;
        }

        const requiredFields = ['name', 'cpf', 'birth', 'genre', 'state', 'city'];
        const emptyFields = requiredFields.filter(field => !formData[field as keyof ClientFormData]);

        if (emptyFields.length > 0) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        onSave(formData);
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={handleClickOpen}
            >
                <Typography fontSize={24}>+</Typography>
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{editItem ? 'Editar Cliente' : 'Cadastrar Cliente'}</DialogTitle>
                <DialogContent>
                    <TextField label="CPF" fullWidth value={formData.cpf} onChange={handleChange} name="cpf" margin="normal" />
                    <TextField label="Nome" fullWidth value={formData.name} onChange={handleChange} name="name" margin="normal" />
                    <TextField type="date" label="Data de Nascimento" fullWidth value={formData.birth} onChange={handleChange} name="birth" margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField select label="Gênero" fullWidth value={formData.genre} onChange={handleChange} name="genre" margin="normal">
                        {genres.map(option => (
                            <MenuItem key={option} value={option}>{option === 'M' ? "Masculino" : "Feminino"}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Estado" fullWidth value={formData.state} onChange={handleChange} name="state" margin="normal">
                        <MenuItem value="">Selecione um estado</MenuItem>
                        {uniqueStates.map(state => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Cidade" fullWidth value={formData.city} onChange={handleChange} name="city" margin="normal">
                        <MenuItem value="">Selecione uma cidade</MenuItem>
                        {filteredCities.map(city => (
                            <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">{editItem ? 'Salvar' : 'Criar'}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ButtonModalEditCreate;
