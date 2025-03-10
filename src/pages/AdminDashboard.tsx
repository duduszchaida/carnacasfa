import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RSVPResponse {
  id: string;
  name: string;
  costume_participation: string;
  contribution_type: string;
  food_type: string | null;
  created_at: string;
  music: string | null;
  group_size: number | null;
  pagamento: string | null;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResponses();
  }, []);

  async function fetchResponses() {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching responses:', error);
      alert('Erro ao carregar as respostas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  const formatParticipationType = (type: string) => {
    switch (type) {
      case 'individual': return 'Individual';
      case 'group': return 'Grupo';
      case 'none': return 'Não participa';
      default: return type;
    }
  };

  const formatContributionType = (type: string) => {
    switch (type) {
      case '10_reais_e_prato': return 'R$ 10,00 + Prato';
      case '20_reais': return 'R$ 20,00';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePaymentStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('rsvp_responses')
        .update({ pagamento: status })
        .eq('id', id);

      if (error) throw error;

      // Atualiza o estado local
      setResponses(prev =>
        prev.map(response =>
          response.id === id ? { ...response, pagamento: status } : response
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Erro ao atualizar o status do pagamento. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-yellow-200 hover:text-yellow-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-yellow-300">Painel de Controle - Confirmações</h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto"></div>
            <p className="mt-4 text-yellow-100">Carregando respostas...</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-yellow-200">Nome</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Participação no Desfile</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Contribuição</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Prato</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Tamanho do Grupo</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Música do Desfile</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Status do Pagamento</th>
                  <th className="text-left py-3 px-4 text-yellow-200">Data de Confirmação</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">{response.name}</td>
                    <td className="py-3 px-4">{formatParticipationType(response.costume_participation)}</td>
                    <td className="py-3 px-4">{formatContributionType(response.contribution_type)}</td>
                    <td className="py-3 px-4">{response.food_type || '-'}</td>
                    <td className="py-3 px-4">{response.group_size || '-'}</td>
                    <td className="py-3 px-4">{response.music || '-'}</td>
                    <td className="py-3 px-4">
                      <select
                        value={response.pagamento || 'não pago'}
                        onChange={(e) => handlePaymentStatusChange(response.id, e.target.value)}
                        className="bg-transparent border border-white/20 rounded-lg px-2 py-1 text-yellow-100"
                      >
                        <option value="pago">Pago</option>
                        <option value="não pago">Não Pago</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">{formatDate(response.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-center text-yellow-100">
              Total de confirmações: {responses.length}
            </div>
          </div>
        )}
      </div>

      {/* Disney Characters */}
      <div className="fixed bottom-0 left-0 w-40 h-40">
        <img 
          src="https://imgur.com/kNx4qG9.png" 
          alt="Mickey Mouse"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="fixed bottom-0 right-0 w-40 h-40">
        <img 
          src="https://imgur.com/WQ4yrZA.png" 
          alt="Minnie Mouse"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;