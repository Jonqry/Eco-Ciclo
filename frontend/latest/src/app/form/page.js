'use client';

import { useState } from 'react';
import { MapPin, Check, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore'; 

export default function FormAgendamento({ onAgendamentoSucesso }) {
  const router = useRouter();

  const usuarioLogado = useAuthStore((state) => state.user);

  const [pontoColeta, setPontoColeta] = useState('');
  const [wasteId, setWasteId] = useState(''); 
  const [data, setData] = useState('');       
  const [horario, setHorario] = useState('');
  const [endereco, setEndereco] = useState('');
  const [referencia, setReferencia] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const horariosDisponiveis = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30'];

  const handleAgendar = async (e) => {
    if (e) e.preventDefault();
    setErro('');
    setSucesso('');

    const userId = usuarioLogado?.id; 
    if (!userId) {
      setErro("Você precisa estar logado para realizar um agendamento.");
      return;
    }

    if (!pontoColeta || !wasteId || !data || !horario || !endereco) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setCarregando(true);

    const dataHoraFormatada = `${data}T${horario}:00.000Z`;

    const payload = {
      userId: Number(userId),
      wasteId: Number(wasteId),
      dataHora: dataHoraFormatada,
      enderecoColeta: endereco
    };

    try {
      const response = await fetch('http://localhost:8080/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSucesso("Agendamento realizado com sucesso!");
        limparCampos();
        if (onAgendamentoSucesso) onAgendamentoSucesso();
      } else {
        setErro("Erro ao realizar o agendamento. Verifique os dados com o servidor.");
      }
    } catch (err) {
      console.error("Erro na conexão:", err);
      setErro("Erro de conexão com o servidor. O back-end está rodando?");
    } finally {
      setCarregando(false);
    }
  };

  const limparCampos = () => {
    setPontoColeta('');
    setWasteId('');
    setData('');
    setHorario('');
    setEndereco('');
    setReferencia('');
  };

  return (
    <div className="min-h-screen bg-[#FBFDF8] p-8 font-sans text-slate-800">

      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
          Agendamento
        </p>
        <h1 className="text-4xl font-extrabold text-[#232F2A] mb-3">
          Agende sua coleta
        </h1>
        <p className="text-gray-600 text-sm">
          Escolha o ponto, o resíduo, a data e o horário. Confirme o endereço e pronto.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
          <form onSubmit={handleAgendar} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ponto de coleta</label>
                <select
                  value={pontoColeta}
                  onChange={(e) => setPontoColeta(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F9FAF8] border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#708769] text-gray-600 text-sm"
                >
                  <option value="">Selecione um ponto</option>
                  <option value="ecoponto-centro">Ecoponto Centro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#F9FAF8] border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#708769] text-gray-600 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Código do Resíduo</label>
              <select
                value={wasteId}
                onChange={(e) => setWasteId(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9FAF8] border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#708769] text-gray-600 text-sm"
              >
                <option value="">Selecione o código do lote</option>
                <option value="1">Lote Padrão de Recicláveis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Horário disponível</label>
              <div className="flex flex-wrap gap-3">
                {horariosDisponiveis.map((hora) => (
                  <button
                    key={hora}
                    type="button"
                    onClick={() => setHorario(hora)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${horario === hora
                        ? 'border-[#708769] bg-[#708769]/10 text-[#708769]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    <Clock className="w-4 h-4" />
                    {hora}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço para retirada</label>
              <input
                type="text"
                placeholder="Ex: Rua, número, bairro, Recife"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#708769] text-gray-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ponto de referência (opcional)</label>
              <textarea
                rows="2"
                placeholder="Ex.: portão verde ao lado da padaria"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#708769] text-gray-800 text-sm resize-none"
              ></textarea>
            </div>

            {erro && <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-xl">{erro}</p>}
            {sucesso && <p className="text-[#4A5D45] text-sm font-medium bg-green-50 p-3 rounded-xl">{sucesso}</p>}

          </form>
        </div>

        <div className="w-full lg:w-[380px] bg-[#EBECE1] p-8 rounded-3xl border border-[#DFE1D4]">
          <h2 className="text-xl font-bold text-[#232F2A] mb-6">Resumo</h2>

          <ul className="space-y-4 mb-8">
            <li className={`flex items-center gap-3 text-sm ${pontoColeta ? 'text-[#4A5D45] font-medium' : 'text-gray-500'}`}>
              <MapPin className="w-4 h-4" />
              {pontoColeta ? 'Ponto selecionado' : 'Escolha um ponto'}
            </li>
            <li className={`flex items-center gap-3 text-sm ${wasteId ? 'text-[#4A5D45] font-medium' : 'text-gray-500'}`}>
              <Check className="w-4 h-4" />
              {wasteId ? 'Resíduo selecionado' : 'Escolha o resíduo'}
            </li>
            <li className={`flex items-center gap-3 text-sm ${data ? 'text-[#4A5D45] font-medium' : 'text-gray-500'}`}>
              <Calendar className="w-4 h-4" />
              {data && horario ? `${data.split('-').reverse().join('/')} às ${horario}` : 'Escolha uma data'}
            </li>
          </ul>

          <button
            onClick={(e) => handleAgendar(e)}
            disabled={carregando}
            className="w-full bg-[#708769] hover:bg-[#5C7056] text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            {carregando ? 'A processar...' : 'Confirmar agendamento'}
          </button>
        </div>

      </div>
    </div>
  );
}