import React, { useState, useEffect, ReactNode } from 'react';
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
import TableFilters from './table-filter-cities';
import { fetchFilteredData } from '../services/cityService';
import { deleteItem } from '../services/cityService';
import dayjs from 'dayjs';


export interface TableDataItem {
  state: string;
  id: string;
  name: string;
}

const DataTable = ({ onEdit }: { onEdit: (item: TableDataItem) => void }) => {
  const [originalData, setOriginalData] = useState<TableDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<TableDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    name: '',
    state: ''
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
      state: '',
    });
  };

  const handleEdit = (id: string) => {
    const itemToEdit = filteredData.find(item => item.id === id);
    if (itemToEdit) {
      onEdit({
        id: itemToEdit.id,
        name: itemToEdit.name,
        state: itemToEdit.state,
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ESTADO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.state}</TableCell>
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
