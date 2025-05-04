import AppBar from '../components/app-bar';
import ButtonModalEditCreate from '../components/button-modal-clients';
import Table from '../components/table-clients';
import Container from '@mui/material/Container';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { create, update } from '../services/clientService';
import type { TableDataItem } from '../components/table-clients';
import type { ClientFormData } from '../components/button-modal-clients';
import { Head } from '@inertiajs/react';


export default function Cliente() {

  const [editItem, setEditItem]: [ClientFormData | undefined, Dispatch<SetStateAction<ClientFormData | undefined>>] = useState();
  const [tableKey, setTableKey] = useState(0);

  const handleSave = async (formData: ClientFormData) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, value.toString());
        }
      });

      if (formData.id) {
        await update(formData.id, formDataToSend);
      } else {
        await create(formDataToSend);
      }

      alert(`Cliente ${formData.id ? 'atualizado' : 'criado'} com sucesso!`);
      setEditItem(undefined);

      setTableKey(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };



  return (
    <>
      <Head title="Clientes" />
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Table
          key={tableKey}
          onEdit={(item: TableDataItem) => {
            setEditItem({
              id: item.id,
              name: item.name,
              cpf: item.cpf,
              birth: item.birth,
              genre: item.genre,
              state: item.city?.state || '',
              city: item.city?.name || '',
              city_id: item.city?.city_id || ''
            });
          }}
        />
      </Container>
      <ButtonModalEditCreate editItem={editItem} onSave={handleSave} onClose={() => setEditItem(undefined)} />
    </>

  );
}
