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

export interface ResponsibleFormData {
    id?: string;
    name: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    city_id?: string;
}

const ButtonModalEditCreate = ({ editItem, onSave, onClose }: { editItem?: ResponsibleFormData, onSave: (formData: ResponsibleFormData) => void, onClose?: () => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<ResponsibleFormData>({
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        city_id: ''
    });
    const [cities, setCities] = useState<{ id: string; name: string; state: string }[]>([]);
    const [filteredCities, setFilteredCities] = useState<{ id: string; name: string; state: string }[]>([]);
    const [uniqueStates, setUniqueStates] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCities = async () => {
            try {
                setIsLoading(true);
                const data: { id: string; name: string; state: string }[] = await fetchData();
                setCities(data);
                const states = Array.from(new Set(data.map((c: { state: string }) => c.state))).sort();
                setUniqueStates(states);
                
                // Se estiver editando, filtra as cidades pelo estado do editItem
                if (editItem?.state) {
                    const citiesInState = data.filter(city => city.state === editItem.state);
                    setFilteredCities(citiesInState);
                } else {
                    setFilteredCities(data);
                }
                
                // Configura os dados do formulário após carregar as cidades
                if (editItem) {
                    const cityObj = data.find(c => 
                        editItem.city_id ? c.id === editItem.city_id : c.name === editItem.city
                    );
                    
                    setFormData({
                        ...editItem,
                        state: editItem.state || '',
                        city: cityObj?.name || editItem.city || '',
                        city_id: cityObj?.id || editItem.city_id || ''
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar cidades:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadCities();
    }, [editItem]);

    useEffect(() => {
        if (editItem) {
            setOpen(true);
        }
    }, [editItem]);

    const handleClickOpen = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            state: '',
            city: '',
            city_id: ''
        });
        setErrors({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    const handleSubmit = () => {
        const newErrors: { [key: string]: boolean } = {};
        ['name', 'email', 'phone', 'state', 'city'].forEach(field => {
            if (!formData[field as keyof ResponsibleFormData]) {
                newErrors[field] = true;
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSave(formData);
            handleClose();
        }
    };

    const formatPhone = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
    
        if (cleaned.length <= 2) {
            return `+${cleaned}`;
        } else if (cleaned.length <= 4) {
            return `+${cleaned.slice(0, 2)} (${cleaned.slice(2)}`;
        } else if (cleaned.length <= 6) {
            return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4)}`;
        } else if (cleaned.length <= 11) {
            return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
        } else {
            return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9, 13)}`;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'city') {
            const selectedCity = filteredCities.find(city => city.name === value);
            setFormData({
                ...formData,
                city: value,
                city_id: selectedCity ? selectedCity.id : ''
            });
        } else if (name === 'phone') {
            const formatted = formatPhone(value);
            setFormData({
                ...formData,
                phone: formatted
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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
                    <TextField
                        label="Nome"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        margin="normal"
                        error={errors.name}
                        helperText={errors.name && "Campo obrigatório"}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        margin="normal"
                        error={errors.email}
                        helperText={errors.email && "Campo obrigatório"}
                    />
                    <TextField
                        label="Telefone"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                        margin="normal"
                        error={errors.phone}
                        helperText={errors.phone && "Telefone incompleto. Formato: +55 (XX) XXXXX-XXXX"}
                        placeholder="+55 (XX) XXXXX-XXXX"
                    />
                    
                    <TextField
                        select
                        label="Estado"
                        fullWidth
                        value={formData.state}
                        onChange={handleChange}
                        name="state"
                        margin="normal"
                        error={errors.state}
                        helperText={errors.state && "Campo obrigatório"}
                    >
                        <MenuItem value="">Selecione um estado</MenuItem>
                        {uniqueStates.map(state => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Cidade"
                        fullWidth
                        value={formData.city}
                        onChange={handleChange}
                        name="city"
                        margin="normal"
                        error={errors.city}
                        helperText={errors.city && "Campo obrigatório"}
                    >
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
