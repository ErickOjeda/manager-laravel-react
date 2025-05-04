import AppBar from '../components/app-bar';
import ButtonModalEditCreate from '../components/button-modal-responsible';
import Table from '../components/table-responsible';
import Container from '@mui/material/Container';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { create, update } from '../services/responsibleService';
import type { TableDataItem } from '../components/table-responsible';
import type { ResponsibleFormData } from '../components/button-modal-responsible';
import { Head } from '@inertiajs/react';


export default function Responsible() {

  const [editItem, setEditItem]: [ResponsibleFormData | undefined, Dispatch<SetStateAction<ResponsibleFormData | undefined>>] = useState();
  const [tableKey, setTableKey] = useState(0);

  const handleSave = async (formData: ResponsibleFormData) => {
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

      alert(`Responsavel ${formData.id ? 'atualizado' : 'criado'} com sucesso!`);
      setEditItem(undefined);

      setTableKey(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao salvar responsavel:', error);
    }
  };



  return (
    <>
      <Head title="Responsible" />
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Table
          key={tableKey}
          onEdit={(item: TableDataItem) => {
            setEditItem({
              id: item.id,
              name: item.name,
              email: item.email,
              phone: item.phone,
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
