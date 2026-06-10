export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a2421]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">
          Política de Privacidade
        </h1>

        <div className="space-y-6 text-[#1a2421]/80 leading-relaxed">
          <p>
            Esta Política de Privacidade descreve como o EcoCiclo coleta,
            utiliza e protege os dados dos usuários.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Dados Coletados
            </h2>
            <p>
              Podemos coletar informações como nome, e-mail, endereço de coleta,
              histórico de agendamentos e pontuação do usuário.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Finalidade dos Dados
            </h2>
            <p>
              Os dados são utilizados para autenticação, gerenciamento de
              resíduos, agendamentos e sistema de recompensas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Segurança
            </h2>
            <p>
              Adotamos medidas de segurança para proteger as informações dos
              usuários contra acessos não autorizados.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              4. Compartilhamento
            </h2>
            <p>
              Os dados não serão vendidos ou compartilhados com terceiros,
              exceto quando exigido por lei.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              5. Direitos do Usuário
            </h2>
            <p>
              O usuário poderá solicitar atualização ou remoção de seus dados,
              conforme previsto pela legislação aplicável.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}