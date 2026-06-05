'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wasteService } from '../../services/wasteService';

export default function ResiduosPage() {
  const queryClient = useQueryClient();
  
  // Estados para controlar o formulário localmente
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [isPerigoso, setIsPerigoso] = useState(false);
  const [pesoEstimado, setPesoEstimado] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // TanStack Query: Busca a lista de resíduos do Back-end
  const { data: residuos, isLoading, isError } = useQuery({
    queryKey: ['wasteItems'],
    queryFn: wasteService.listar
  });

  // TanStack Query: Mutation para Criar ou Atualizar um resíduo
  const salvarMutation = useMutation({
    mutationFn: async (novoItem) => {
      if (editandoId) {
        return wasteService.atualizar(editandoId, novoItem);
      }
      return wasteService.cadastrar(novoItem);
    },
    onSuccess: () => {
      // Atualiza a lista na tela automaticamente
      queryClient.invalidateQueries({ queryKey: ['wasteItems'] });
      limparFormulario();
    }
  });

  // TanStack Query: Mutation para Deletar um resíduo
  const deletarMutation = useMutation({
    mutationFn: wasteService.deletar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wasteItems'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !tipo || !pesoEstimado) return alert('Preencha os campos obrigatórios!');

    salvarMutation.mutate({
      nome,
      tipo,
      isPerigoso,
      pesoEstimado: parseFloat(pesoEstimado)
    });
  };

  const handleEdit = (item) => {
    setEditandoId(item.id);
    setNome(item.nome);
    setTipo(item.tipo);
    setIsPerigoso(item.isPerigoso);
    setPesoEstimado(item.pesoEstimated || item.pesoEstimado);
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setNome('');
    setTipo('');
    setIsPerigoso(false);
    setPesoEstimado('');
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Gerenciamento de Resíduos</h1>

      {/* Formulário de Cadastro / Edição */}
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8 shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editandoId ? 'Editar Resíduo' : 'Cadastrar Novo Resíduo'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Resíduo *</label>
            <input 
              type="text" value={nome} onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Óleo de Cozinha Usado, Bateria de celular..." 
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo *</label>
            <input 
              type="text" value={tipo} onChange={(e) => setTipo(e.target.value)}
              placeholder="Ex: Eletrônico, Líquido, Plástico..." 
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Peso Estimado (kg) *</label>
            <input 
              type="number" step="0.1" value={pesoEstimado} onChange={(e) => setPesoEstimado(e.target.value)}
              placeholder="Ex: 2.5" 
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center mt-6">
            <input 
              type="checkbox" checked={isPerigoso} onChange={(e) => setIsPerigoso(e.target.checked)}
              id="perigoso" className="mr-2 w-4 h-4 text-green-600"
            />
            <label htmlFor="perigoso" className="text-sm font-medium text-red-500">Este resíduo é perigoso / tóxico?</label>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition">
            {editandoId ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
          {editandoId && (
            <button type="button" onClick={limparFormulario} className="bg-gray-500 text-white px-4 py-2 rounded font-medium transition">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabela de Listagem de Resíduos */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden border dark:border-gray-800">
        <h2 className="text-xl font-semibold p-4 border-b dark:border-gray-800">Seu Inventário de Descarte</h2>
        
        {isLoading && <p className="p-4 text-gray-500">Carregando seus resíduos...</p>}
        {isError && <p className="p-4 text-red-500">Erro ao comunicar com o servidor backend.</p>}

        {!isLoading && residuos?.length === 0 && (
          <p className="p-4 text-gray-500">Nenhum resíduo cadastrado até o momento.</p>
        )}

        {!isLoading && residuos?.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Peso</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {residuos.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="p-3 font-medium">{item.nome}</td>
                  <td className="p-3">{item.tipo}</td>
                  <td className="p-3">{item.pesoEstimado} kg</td>
                  <td className="p-3">
                    {item.isPerigoso && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 font-semibold">Perigoso</span>}
                    {item.isPrioritario && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-semibold">Prioritário</span>}
                  </td>
                  <td className="p-3 flex justify-center gap-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-sm font-medium">Editar</button>
                    <button onClick={() => deletarMutation.mutate(item.id)} className="text-red-600 hover:underline text-sm font-medium">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}