import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
  Modal,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableFilters from './table-filter-clients';
import { fetchFilteredData } from '../services/clientService';
import { deleteItem } from '../services/clientService';
import dayjs from 'dayjs';
import { EyeIcon } from 'lucide-react';
import { fetchFilteredData as fetchResponsibles } from '../services/responsibleService';

export interface City {
  name: string;
  state: string;
  city_id: string;
}

export interface TableDataItem {
  id: string;
  name: string;
  city?: City;
  genre: string;
  birth: string;
  cpf: string;
}

const DataTable = ({ onEdit }: { onEdit: (item: TableDataItem) => void }) => {
  const [originalData, setOriginalData] = useState<TableDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<TableDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    city: '',
    state: '',
    genre: '',
    birth: '',
    cpf: ''
  });
  const [openModal, setOpenModal] = useState(false);
  const [responsibles, setResponsibles] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFilteredData(filters);
        setOriginalData(data);
        setFilteredData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      email: '',
      city: '',
      state: '',
      genre: '',
      birth: '',
      cpf: ''
    });
  };

  const handleView = async (id: string) => {
    const itemToView = filteredData.find(item => item.id === id);
    if (itemToView && itemToView.city) {
      try {
        const data = await fetchResponsibles({ city: itemToView.city.name });
        setResponsibles(data);
        setOpenModal(true);
      } catch (err) {
        console.error('Erro ao buscar responsáveis:', err);
      }
    }
  };

  const handleEdit = (id: string) => {
    const itemToEdit = filteredData.find(item => item.id === id);
    if (itemToEdit) {
      const birthDate = itemToEdit.birth ? dayjs(itemToEdit.birth).format('YYYY-MM-DD') : '';
      const genreShort = itemToEdit.genre === 'Masculino' ? 'M' : itemToEdit.genre === 'Feminino' ? 'F' : '';
      onEdit({
        id: itemToEdit.id,
        name: itemToEdit.name,
        cpf: itemToEdit.cpf,
        birth: birthDate,
        genre: genreShort,
        city: itemToEdit.city || { name: '', state: '', city_id: '' },
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setFilteredData(filteredData.filter(item => item.id !== id));
      alert('Item excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erro: {error}</Typography>;
  }

  return (
    <div>
      <TableFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NOME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CPF</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NASCIMENTO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ESTADO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CIDADE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>GÊNERO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.birth}</TableCell>
                <TableCell>{item.city?.state || '-'}</TableCell>
                <TableCell>{item.city?.name || '-'}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>

                  <IconButton
                    color="secondary"
                    onClick={() => handleView(item.id)}
                  >
                    <EyeIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, maxWidth: 600, margin: 'auto', marginTop: '10%' }}>
          <Typography variant="h6" gutterBottom>
            Responsáveis na Cidade
          </Typography>
          <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NOME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMAIL</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TELEFONE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {responsibles.map(responsible => (
                <TableRow key={responsible.id}>
                  <TableCell>{responsible.name}</TableCell>
                  <TableCell>{responsible.email}</TableCell>
                  <TableCell>{responsible.phone || '-'}</TableCell>
                </TableRow>
              ))}
              {responsibles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Nenhum responsável encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </TableContainer>
        </Box>
      </Modal>


    </div>
  );
};

export default DataTable;
