'use client';
import { useQuery } from '@tanstack/react-query';
import { wasteService } from '../../services/wasteService';
import Link from 'next/link';

export default function DashboardPage() {
  // Busca os resíduos cadastrados para gerar as estatísticas do Dashboard
  const { data: residuos, isLoading } = useQuery({
    queryKey: ['wasteItems'],
    queryFn: wasteService.listar
  });

  // Cálculos automáticos para o Dashboard de Impacto
  const totalItens = residuos?.length || 0;
  const pesoTotal = residuos?.reduce((acc, item) => acc + (item.pesoEstimado || 0), 0) || 0;
  const itensPerigosos = residuos?.filter(item => item.isPerigoso).length || 0;

  // Dados fictícios do usuário (que depois serão conectados ao Zustand do Integrante A)
  const usuarioInfo = {
    nome: "Usuário EcoCiclo",
    streak: 5, // Ofensiva baseada no estilo Duolingo
    totalPontos: 120
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-900 dark:text-white">
      {/* Mensagem de Boas-Vindas */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">Olá, {usuarioInfo.nome}! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">Bem-vindo ao seu painel de controle de logística reversa.</p>
      </div>

      {/* Cards de Resumo e Gamificação (Conexão Integrante A e E) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card do Streak / Ofensiva */}
        <div className="bg-orange-50 dark:bg-orange-950/30 p-6 rounded-xl border border-orange-200 dark:border-orange-900 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-700 dark:text-orange-400 uppercase tracking-wider">Sua Ofensiva</p>
            <h3 className="text-3xl font-bold text-orange-600">{usuarioInfo.streak} Dias seguidos</h3>
          </div>
          <span className="text-4xl">🔥</span>
        </div>

        {/* Card de Pontos Acumulados */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-6 rounded-xl border border-yellow-200 dark:border-yellow-900 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">Saldo de Pontos</p>
            <h3 className="text-3xl font-bold text-yellow-600">{usuarioInfo.totalPontos} EcoPontos</h3>
          </div>
          <span className="text-4xl">🪙</span>
        </div>

        {/* Card de Impacto Ecológico */}
        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400 uppercase tracking-wider">Total Descartado</p>
            <h3 className="text-3xl font-bold text-green-600">{pesoTotal.toFixed(1)} kg</h3>
          </div>
          <span className="text-4xl">🌱</span>
        </div>
      </div>

      {/* Estatísticas Detalhadas do Inventário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Resumo do Inventário</h2>
          {isLoading ? (
            <p className="text-gray-500">Calculando métricas...</p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Total de resíduos listados:</span>
                <span className="font-semibold">{totalItens} itens</span>
              </div>
              <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Itens perigosos / tóxicos:</span>
                <span className="font-semibold text-red-500">{itensPerigosos} itens</span>
              </div>
            </div>
          )}
        </div>

        {/* Links de Ações Rápidas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Ações Rápidas</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Gerencie os seus resíduos ou programe coletas de forma rápida.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/residuos" className="bg-green-600 hover:bg-green-700 text-white text-center py-2.5 rounded-lg font-medium transition text-sm">
              Meu Inventário
            </Link>
            <Link href="/form" className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-center py-2.5 rounded-lg font-medium transition text-sm">
              Agendar Coleta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}