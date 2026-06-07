'use client';

import * as React from "react";
import { useState } from "react";
import { Award, ShoppingBag, Sparkles, CheckCircle, Ticket } from "lucide-react";
import { toast } from "sonner";

export default function RecompensasPage() {
  const [saldoPontos, setSaldoPontos] = useState(1250);

  const [recompensas, setRecompensas] = useState([
    { id: 1, titulo: "R$ 15 em Desconto - Supermercado Verde", pontos: 300, categoria: "Alimentação", empresa: "Hortifrúti Orgânico" },
    { id: 2, titulo: "Isenção de Taxa na Próxima Coleta Premium", pontos: 500, categoria: "Serviço", empresa: "EcoCiclo Logística" },
    { id: 3, titulo: "Cupom de 20% OFF em Linha de Cosméticos Naturais", pontos: 450, categoria: "Beleza", empresa: "BioEstética" },
    { id: 4, titulo: "R$ 30 em Créditos de Passagem de Ônibus / Metrô", pontos: 800, categoria: "Transporte", empresa: "Vem Conectado" },
  ]);

  const handleResgatar = (id, titulo, custoPontos) => {
    if (saldoPontos < custoPontos) {
      toast.error("Pontos ECO insuficientes para realizar este resgate.");
      return;
    }

    setSaldoPontos((prev) => prev - custoPontos);
    toast.success(`Cupom "${titulo}" resgatado! O código foi enviado para seu e-mail.`);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] p-6 md:p-12 font-sans text-[#1a2421]">

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <span className="text-xs font-semibold text-[#7d9b76] uppercase tracking-widest block mb-2">
            Marketplace Sustentável
          </span>
          <h1 className="text-4xl font-extrabold font-heading">Recompensas Eco</h1>
          <p className="text-[#1a2421]/60 text-sm mt-1">
            Troque os pontos acumulados nas suas coletas por vantagens exclusivas.
          </p>
        </div>

        <div className="bg-white border border-[#a8c0a0]/30 rounded-2xl p-4 flex items-center gap-4 shadow-sm w-full md:w-auto min-w-[220px]">
          <div className="h-12 w-12 rounded-xl bg-[#7d9b76]/10 flex items-center justify-center text-[#7d9b76]">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#1a2421]/40 uppercase tracking-wider block">Seu Saldo Atual</span>
            <span className="text-2xl font-black text-[#7d9b76]">{saldoPontos} <span className="text-xs font-bold text-[#1a2421]/60">ECO</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {recompensas.map((item) => {
          const podeResgatar = saldoPontos >= item.pontos;

          return (
            <div 
              key={item.id} 
              className="bg-white border border-[#a8c0a0]/15 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#a8c0a0]/40 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-16 w-16 bg-[#dce5d4]/30 rounded-bl-full flex items-start justify-end p-3 text-[#7d9b76]">
                <Ticket className="h-4 w-4 transform group-hover:rotate-12 transition-transform" />
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f5f0e8] text-[#7d9b76] text-[10px] font-bold uppercase tracking-wider mb-3">
                  {item.categoria}
                </span>
                <h3 className="text-lg font-bold text-[#1a2421] pr-8 leading-snug">
                  {item.titulo}
                </h3>
                <p className="text-xs text-[#1a2421]/50 mt-1 font-medium">
                  Parceiro: {item.empresa}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f5f0e8] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#1a2421]/40 block uppercase font-bold">Custo para troca</span>
                  <span className="text-xl font-extrabold text-[#1a2421]">
                    {item.pontos} <span className="text-xs font-semibold text-[#7d9b76]">ECO</span>
                  </span>
                </div>

                <button
                  onClick={() => handleResgatar(item.id, item.titulo, item.pontos)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    podeResgatar
                      ? "bg-[#7d9b76] hover:bg-[#6c8866] text-[#f5f0e8]"
                      : "bg-[#f5f0e8] text-[#1a2421]/40 cursor-not-allowed border border-gray-200"
                  }`}
                >
                  {podeResgatar ? "Resgatar Benefício" : "Pontos Insuficientes"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}