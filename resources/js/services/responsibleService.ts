import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchFilteredData = async (filters: { [x: string]: string; }) => {
    try {
      const params = new URLSearchParams();
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      
      const response = await axios.get(`${API_BASE_URL}/responsibles?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao filtrar dados:', error);
      throw error;
    }
  };

export const create = async (data: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/responsibles`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error;
  }
};

export const update = async (id: string, data: FormData) => {
  try {
    data.append('_method', 'PUT');
    const response = await axios.post(`${API_BASE_URL}/responsibles/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    throw error;
  }
};

export const deleteItem = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/responsibles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    throw error;
  }
};