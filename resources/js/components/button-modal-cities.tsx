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

export interface CidadeFormData {
    id?: string;
    name: string;
    state: string;
}

const estadosBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const ButtonModalEditCreate = ({ editItem, onSave, onClose }: { editItem?: CidadeFormData, onSave: (formData: CidadeFormData) => void, onClose?: () => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<CidadeFormData>({
        name: '',
        state: ''
    });

    useEffect(() => {
        if (editItem) {
            setFormData({ 
                ...editItem
            });
            setOpen(true);
        }
    }, [editItem]);
    
    const handleClickOpen = () => {
        if (!editItem) {
            setFormData({
                name: '',
                state: ''
            });
        }
        setOpen(true);
    };
    
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!formData.name.trim() || !formData.state) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        onSave(formData);
        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                    <TextField label="Nome" fullWidth value={formData.name} onChange={handleChange} name="name" margin="normal" />
                    <TextField select label="Estado" fullWidth value={formData.state} onChange={handleChange} name="state" margin="normal">
                        <MenuItem value="">Selecione um estado</MenuItem>
                        {estadosBrasil.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
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
