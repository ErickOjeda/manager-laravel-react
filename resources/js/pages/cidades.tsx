import AppBar from '../components/app-bar';
import ButtonModalEditCreate from '../components/button-modal-cities';
import Table from '../components/table-cities';
import Container from '@mui/material/Container';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { create, update } from '../services/cityService';
import type { TableDataItem } from '../components/table-cities';
import type { CidadeFormData } from '../components/button-modal-cities';
import { Head } from '@inertiajs/react';


export default function Cidade() {

  const [editItem, setEditItem]: [CidadeFormData | undefined, Dispatch<SetStateAction<CidadeFormData | undefined>>] = useState();
  const [tableKey, setTableKey] = useState(0);

  const handleSave = async (formData: CidadeFormData) => {
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

      alert(`Cidade ${formData.id ? 'atualizado' : 'criado'} com sucesso!`);
      setEditItem(undefined);

      setTableKey(prev => prev + 1);
    } catch (error) {
      console.error('Erro ao salvar cidade:', error);
    }
  };



  return (
    <>
      <Head title="Cidades" />
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Table
          key={tableKey}
          onEdit={(item: TableDataItem) => {
            setEditItem({
              id: item.id,
              name: item.name,
              state: item.state
            });
          }}
        />
      </Container>
      <ButtonModalEditCreate editItem={editItem} onSave={handleSave} onClose={() => setEditItem(undefined)}/>
    </>

  );
}
