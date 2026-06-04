'use client';

import { useState } from 'react';
import { Calendar, MapPin, Recycle, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

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

    if (!wasteId || !dataHora || !enderecoColeta.trim()) {
      return setErro('Por favor, preencha todos os campos obrigatórios.');
    }

    const dataSelecionada = new Date(dataHora);
    if (dataSelecionada < new Date()) {
      return setErro('Não é possível agendar uma coleta no passado.');
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
        setSucesso('Coleta agendada com sucesso!');
        
        setWasteId('');
        setDataHora('');
        setEnderecoColeta('');
        
        if (onAgendamentoSucesso) {
          onAgendamentoSucesso();
        }
      } else {
        setErro('Ocorreu um erro. Verifique os dados e tente novamente.');
      }
    } catch (err) {
      setErro('Falha na comunicação com o servidor backend.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
        <Calendar className="w-5 h-5 text-emerald-500" />
        Nova Solicitação
      </h2>
      
      <form onSubmit={handleAgendar} className="space-y-5">
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Recycle className="w-4 h-4 text-slate-400" />
            Tipo de Resíduo
          </label>
          <select 
            value={wasteId}
            onChange={(e) => setWasteId(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700"
          >
            <option value="" disabled>Selecione um item do inventário...</option>
            <option value="1">Óleo de Cozinha Usado</option>
            <option value="2">Baterias Velhas</option>
            <option value="3">Resíduos Eletrônicos</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Data e Horário
          </label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            Endereço de Coleta
          </label>
          <input
            type="text"
            placeholder="Ex: Av. Governador Agamenon Magalhães, Recife"
            value={enderecoColeta}
            onChange={(e) => setEnderecoColeta(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-slate-700"
          />
        </div>

        {erro && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-3 text-sm font-medium border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{erro}</p>
          </div>
        )}

        {sucesso && (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-start gap-3 text-sm font-medium border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p>{sucesso}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-sm shadow-emerald-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-2"
        >
          {carregando ? 'Processando...' : 'Confirmar Coleta'}
        </button>
      </form>
    </div>
  );
}