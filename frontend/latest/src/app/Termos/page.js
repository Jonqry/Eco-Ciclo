export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a2421]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>

        <div className="space-y-6 text-[#1a2421]/80 leading-relaxed">
          <p>
            Ao utilizar a plataforma EcoCiclo, você concorda com os termos e
            condições descritos nesta página.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Uso da Plataforma
            </h2>
            <p>
              O EcoCiclo é uma plataforma voltada para o gerenciamento de
              resíduos recicláveis, agendamento de coletas e sistema de
              recompensas sustentáveis.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Responsabilidade do Usuário
            </h2>
            <p>
              O usuário é responsável pela veracidade das informações fornecidas
              durante o cadastro e pela segurança de sua conta.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Agendamentos de Coleta
            </h2>
            <p>
              Os agendamentos estão sujeitos à disponibilidade do serviço e
              poderão ser alterados ou cancelados quando necessário.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Programa de Recompensas
            </h2>
            <p>
              A pontuação obtida pelos usuários poderá ser utilizada para
              resgate de recompensas disponíveis na plataforma.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Alterações dos Termos
            </h2>
            <p>
              O EcoCiclo poderá atualizar estes termos sempre que necessário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}