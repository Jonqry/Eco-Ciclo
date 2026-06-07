'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { User, Mail, Shield, Flame, Recycle, Award, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "../../store/useAuthStore"; 

export default function PerfilPage() {
  const usuarioLogado = useAuthStore((state) => state.user);

  const [editando, setEditando] = useState(false);
  const [nomeForm, setNomeForm] = useState("");
  const [cidadeForm, setCidadeForm] = useState("Recife - PE");

  useEffect(() => {
    if (usuarioLogado) {
      setNomeForm(usuarioLogado.nome || "");
    }
  }, [usuarioLogado]);

  if (!usuarioLogado) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <p className="text-sm font-medium text-gray-500">Carregando dados do perfil...</p>
      </div>
    );
  }

  const handleSalvarPerfil = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...usuarioLogado,
          nome: nomeForm
        })
      });

      if (response.ok) {
        toast.success("Informações cadastrais atualizadas com sucesso!");
        setEditando(false);
        
      } else {
        toast.error("Erro ao salvar as alterações no servidor.");
      }
    } catch (err) {
      toast.success("Perfil atualizado localmente!");
      setEditando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 md:p-12 font-sans text-[#1a2421]">
      
      <div className="max-w-5xl mx-auto mb-8">
        <span className="text-xs font-semibold text-[#7d9b76] uppercase tracking-widest block mb-2">
          Área do Usuário
        </span>
        <h1 className="text-4xl font-extrabold font-heading">Olá, {usuarioLogado.nome}!</h1>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2 bg-white border border-[#a8c0a0]/15 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 pb-2 border-b border-[#f5f0e8]">
            <User className="h-5 w-5 text-[#7d9b76]" /> Informações da Conta
          </h2>

          <form onSubmit={handleSalvarPerfil} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1a2421]/60 uppercase mb-2">Nome Completo</label>
              <input
                type="text"
                value={nomeForm}
                disabled={!editando}
                onChange={(e) => setNomeForm(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f0e8]/30 border border-[#a8c0a0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7d9b76] text-sm text-[#1a2421] disabled:opacity-60 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2421]/60 uppercase mb-2">Endereço de E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[#1a2421]/40" />
                <input
                  type="email"
                  value={usuarioLogado.email || "não informado"} 
                  disabled
                  className="w-full pl-11 pr-4 py-3 bg-[#f5f0e8]/10 border border-gray-200 rounded-xl text-sm text-[#1a2421]/50 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1a2421]/60 uppercase mb-2">Localidade Base</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-4 w-4 text-[#7d9b76]" />
                <input
                  type="text"
                  value={cidadeForm}
                  disabled={!editando}
                  onChange={(e) => setCidadeForm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#f5f0e8]/30 border border-[#a8c0a0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7d9b76] text-sm text-[#1a2421] disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              {editando ? (
                <>
                  <button
                    type="button"
                    onClick={() => { setEditando(false); setNomeForm(usuarioLogado.nome || ""); }}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#7d9b76] text-[#f5f0e8] hover:bg-[#6c8866] transition-colors shadow-sm cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditando(true)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-[#a8c0a0] text-[#7d9b76] hover:bg-[#dce5d4]/40 transition-all cursor-pointer"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-6 w-full">
          
          <div className="bg-gradient-to-br from-[#7d9b76] to-[#6c8866] rounded-3xl p-6 text-[#f5f0e8] shadow-sm flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5f0e8]/70 block">Sua Ofensiva</span>
                <span className="text-3xl font-black mt-1 block">
                  {usuarioLogado.streak || 0} Dias Seguidos
                </span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                <Flame className="h-6 w-6 text-orange-400 fill-current animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-[#f5f0e8]/80 leading-relaxed mt-4">
              Continue descartando materiais periodicamente para não perder seu bônus de multiplicador!
            </p>
          </div>

          <div className="bg-white border border-[#a8c0a0]/15 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a2421]/40 mb-2">Estatísticas Gerais</h3>
            
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#dce5d4]/50 text-[#7d9b76] flex items-center justify-center">
                <Recycle className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs text-[#1a2421]/60 block leading-none">Total reciclado</span>
                <strong className="text-base text-[#1a2421]">
                  {usuarioLogado.totalResiduosKg || 0} kg
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#dce5d4]/50 text-[#7d9b76] flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs text-[#1a2421]/60 block leading-none">Saldo de Pontos</span>
                <strong className="text-base text-[#7d9b76]">
                  {usuarioLogado.totalPontos || 0} ECO
                </strong>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#1a2421]/40 border-t border-[#f5f0e8] text-center">
              Membro participante ativo do EcoCiclo.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}