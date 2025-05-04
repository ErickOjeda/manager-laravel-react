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
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableFilters from './table-filter-responsible';
import { fetchFilteredData } from '../services/responsibleService';
import { deleteItem } from '../services/responsibleService'; 

export interface City {
  name: string;
  state: string;
  city_id: string; 
}

export interface TableDataItem {
  id: string;
  name: string;
  city?: City;
  email: string; 
  phone: string;
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
    phone: ''
  });

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
      phone: ''
    });
  };

  const handleEdit = (id: string) => {
    const itemToEdit = filteredData.find(item => item.id === id);
    if (itemToEdit) {
      onEdit({
        id: itemToEdit.id,
        name: itemToEdit.name,
        phone: itemToEdit.phone,
        email: itemToEdit.email,
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMAIL</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>TELEFONE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ESTADO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CIDADE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.city?.state || '-'}</TableCell>
                <TableCell>{item.city?.name || '-'}</TableCell>
                <TableCell>
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
    </div>
  );
};

export default DataTable;
