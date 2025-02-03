import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

function RSVPForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contributionType: '',
    foodType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('rsvp_responses')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            contribution_type: formData.contributionType,
            foodType: formData.foodType
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Erro ao enviar confirmação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
          <h2 className="text-2xl font-bold mb-4">Presença Confirmada!</h2>
          <p className="mb-6">Obrigado por confirmar sua presença. Mal podemos esperar para celebrar com você!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white">
      <div className="relative min-h-screen container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-yellow-200 hover:text-yellow-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <h2 className="text-2xl font-bold mb-6 text-yellow-300">Confirmar Presença</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-yellow-100 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-yellow-100 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-100 mb-2">
                Forma de Contribuição
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="contribution"
                    value="10_reais_e_prato"
                    required
                    className="form-radio text-yellow-400"
                    onChange={(e) => setFormData(prev => ({ ...prev, contributionType: e.target.value }))}
                  />
                  <span>R$ 10,00 + Um prato de comida</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="contribution"
                    value="20_reais"
                    className="form-radio text-yellow-400"
                    onChange={(e) => setFormData(prev => ({ ...prev, contributionType: e.target.value }))}
                  />
                  <span>R$ 20,00</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-yellow-100 mb-2">
                Qual prato irá levar?
              </label>
              <input
                type="tel"
                id="foodType"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" 
                value={formData.foodType}
                onChange={(e) => setFormData(prev => ({ ...prev, foodType: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-full transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Finalizar Confirmação'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RSVPForm;