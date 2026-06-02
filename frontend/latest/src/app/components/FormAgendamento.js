'use client';

import { useState } from 'react';

export default function FormAgendamento({ onAgendamentoSucesso }) {

  const user = { id: 1, nome: "João Victor" };

  const [wasteId, setWasteId] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [enderecoColeta, setEnderecoColeta] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleAgendar = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!wasteId) return setErro('Por favor, selecione o tipo de resíduo.');
    if (!dataHora) return setErro('Por favor, escolha a data e a hora da recolha.');
    if (!enderecoColeta.trim()) return setErro('Por favor, insira o endereço de recolha.');

    const dataSelecionada = new Date(dataHora);
    if (dataSelecionada < new Date()) {
    return setErro('A data e hora do agendamento não podem ser no passado.');
    }

    setCarregando(true);

    const payload = {
      userId: user.id,
      wasteId: Number(wasteId),
      dataHora: dataHora,
      enderecoColeta: enderecoColeta
    };

    try {
      const response = await fetch('http://localhost:8080/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSucesso('Recolha agendada com sucesso!');
        
        setWasteId('');
        setDataHora('');
        setEnderecoColeta('');
        
        if (onAgendamentoSucesso) {
          onAgendamentoSucesso();
        }
      } else {
        setErro('Erro ao realizar o agendamento. Verifique os dados fornecidos.');
      }
    } catch (err) {
      setErro('Não foi possível conectar com o servidor backend.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agendar Nova Recolha</h2>
      
      <form onSubmit={handleAgendar} className="space-y-4">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">O que vai reciclar?</label>
          <select 
            value={wasteId} 
            onChange={(e) => setWasteId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">Selecione um item do seu inventário...</option>
            <option value="1">Óleo de Cozinha Usado</option>
            <option value="2">Baterias Velhas</option>
            <option value="3">Resíduos Eletrónicos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Data e Hora da Recolha</label>
          <input 
            type="datetime-local" 
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço de Recolha</label>
          <input 
            type="text" 
            placeholder="Ex: Rua da Aurora, 123 - Recife"
            value={enderecoColeta}
            onChange={(e) => setEnderecoColeta(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm font-medium">{sucesso}</p>}

        <button 
          type="submit" 
          disabled={carregando}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
        >
          {carregando ? 'A agendar...' : 'Confirmar Agendamento'}
        </button>
      </form>
    </div>
  );
}