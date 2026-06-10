import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eco-ciclo-pfe-poo-aps-backend.onrender.com/api' 
});

export const wasteService = {
  listar: async () => {
    const response = await api.get('/waste-items');
    return response.data;
  },
  cadastrar: async (item) => {
    const response = await api.post('/waste-items', item);
    return response.data;
  },
  atualizar: async (id, item) => {
    const response = await api.put(`/waste-items/${id}`, item);
    return response.data;
  },
  deletar: async (id) => {
    await api.delete(`/waste-items/${id}`);
  }
};