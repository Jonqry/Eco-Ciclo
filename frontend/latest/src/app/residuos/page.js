'use client';

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, Layers, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ResiduosPage() {
  const router = useRouter();
  const [categoria, setCategoria] = useState("");
  const [pesoEstimado, setPesoEstimado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const categoriasResiduos = [
    { id: "1", nome: "Plástico (PET, Embalagens)", pontosPorKg: 50 },
    { id: "2", nome: "Papel / Papelão", pontosPorKg: 30 },
    { id: "3", nome: "Vidro (Garrafas, Potes)", pontosPorKg: 40 },
    { id: "4", nome: "Metal (Alumínio, Ferro)", pontosPorKg: 60 },
    { id: "5", nome: "Eletrônicos (E-waste)", pontosPorKg: 100 },
  ];

  const handleCadastrarResiduo = async (e) => {
    e.preventDefault();

    if (!categoria || !pesoEstimado) {
      toast.error("Por favor, selecione a categoria e o peso estimado.");
      return;
    }

    setLoading(true);

    const payload = {
      categoriaId: Number(categoria),
      peso: Number(pesoEstimado),
      detalhes: descricao,
      dataCadastro: new Date().toISOString()
    };

    try {
      const response = await axios.post("http://localhost:8080/api/residuos", payload);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Resíduo registrado com sucesso na sua coleta!");
        
        setTimeout(() => {
          router.push("/recompensas");
        }, 1500);
      }
    } catch (err) {
      toast.info("Resíduo salvo localmente (Simulação de integração).");
      setTimeout(() => {
        router.push("/recompensas");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const categoriaSelecionada = categoriasResiduos.find(c => c.id === categoria);
  const pontosCalculados = categoriaSelecionada && pesoEstimado 
    ? Number(pesoEstimado) * categoriaSelecionada.pontosPorKg 
    : 0;

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 md:p-12 font-sans text-[#1a2421]">
      
      <div className="max-w-5xl mx-auto mb-8">
        <span className="text-xs font-semibold text-[#7d9b76] uppercase tracking-widest block mb-2">
          Etapa Final
        </span>
        <h1 className="text-4xl font-extrabold text-[#1a2421] mb-2 font-heading">
          O que vamos reciclar?
        </h1>
        <p className="text-[#1a2421]/60 text-sm">
          Declare os materiais que serão retirados para calcular sua estimativa de pontos ECO.
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        <div className="flex-1 bg-white p-8 rounded-3xl border border-[#a8c0a0]/15 shadow-sm w-full">
          <form onSubmit={handleCadastrarResiduo} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-[#1a2421] mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#7d9b76]" /> Categoria do Resíduo
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f0e8]/40 border border-[#a8c0a0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7d9b76] text-[#1a2421] text-sm transition-all"
                required
              >
                <option value="">Selecione o tipo de material</option>
                {categoriasResiduos.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome} (+{cat.pontosPorKg} ECO/kg)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a2421] mb-2 flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#7d9b76]" /> Peso Estimado (em kg)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Ex: 2.5"
                value={pesoEstimado}
                onChange={(e) => setPesoEstimado(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f0e8]/40 border border-[#a8c0a0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7d9b76] text-[#1a2421] text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a2421] mb-2 flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-[#7d9b76]" /> Descrição / Observações (Opcional)
              </label>
              <textarea
                rows="3"
                placeholder="Ex: 4 garrafas de vidro amaciante limpas e caixas de papelão dobradas."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#a8c0a0]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7d9b76] text-[#1a2421] text-sm resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7d9b76] hover:bg-[#6c8866] text-[#f5f0e8] py-4 rounded-xl font-semibold shadow-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Processando..." : "Concluir e Registrar Resíduo"} <ArrowRight className="h-4 w-4" />
            </button>

          </form>
        </div>

        <div className="w-full lg:w-[360px] bg-[#dce5d4]/50 p-8 rounded-3xl border border-[#a8c0a0]/30 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1a2421] mb-4 font-heading flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-500 fill-current" /> Balanço do Lote
            </h2>
            <p className="text-xs text-[#1a2421]/70 leading-relaxed mb-6">
              A pontuação final será confirmada na central após a pesagem oficial realizada pelos coletores parceiros.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#a8c0a0]/20 shadow-sm text-center">
            <p className="text-[10px] font-bold text-[#1a2421]/40 uppercase tracking-wider mb-1">
              Bônus Estimado Adicional
            </p>
            <p className="text-4xl font-extrabold text-[#7d9b76]">
              +{pontosCalculados} <span className="text-sm font-bold text-[#1a2421]/50">ECO</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}