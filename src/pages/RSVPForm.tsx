import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

function RSVPForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    costumeParticipation: '',
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
            contribution_type: formData.contributionType,
            costume_participation: formData.costumeParticipation,
            food_type: formData.foodType
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
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 text-center ">
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
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white overflow-hidden relative">
      {/* Toy Story no canto superior direito */}
      <div className="absolute top-4 right-3 w-48 transform -rotate-12 z-10">
        <img 
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/db9ed8c9-b18e-40d7-9b96-eb34d64138e6/dfmlvjg-2e67acfd-86a5-41f2-b3aa-9a68200e328c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RiOWVkOGM5LWIxOGUtNDBkNy05Yjk2LWViMzRkNjQxMzhlNlwvZGZtbHZqZy0yZTY3YWNmZC04NmE1LTQxZjItYjNhYS05YTY4MjAwZTMyOGMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fz4iBvVXg02KS02bs_ST7b0fnkO4F_WmrIgHyy0_5ME" 
          alt="toy story"
          className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      </div>

      {/* Carros no canto inferior direito */}
      <div className="absolute bottom-6 right-4 w-40 h-40 z-10">
        <img 
          src="https://imagensgratis.com/wp-content/uploads/2022/07/carros-da-disney-png-83.png" 
          alt="carros"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Formulário */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 relative z-9 mt-[20px] mb-[105px]">
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
              <label className="block text-sm font-medium text-yellow-100 mb-2">
                Participação no Desfile de Fantasias
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="costumeParticipation"
                    value="individual"
                    required
                    className="form-radio text-yellow-400"
                    onChange={(e) => setFormData(prev => ({ ...prev, costumeParticipation: e.target.value }))}
                  />
                  <span>Desfile Individual</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="costumeParticipation"
                    value="group"
                    className="form-radio text-yellow-400"
                    onChange={(e) => setFormData(prev => ({ ...prev, costumeParticipation: e.target.value }))}
                  />
                  <span>Desfile em Grupo</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="costumeParticipation"
                    value="none"
                    className="form-radio text-yellow-400"
                    onChange={(e) => setFormData(prev => ({ ...prev, costumeParticipation: e.target.value }))}
                  />
                  <span>Não vou participar do desfile</span>
                </label>
              </div>
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

            {formData.contributionType === '10_reais_e_prato' && (
              <div>
                <label htmlFor="foodType" className="block text-sm font-medium text-yellow-100 mb-2">
                  Qual prato irá levar?
                </label>
                <input
                  type="text"
                  id="foodType"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  placeholder="Digite o prato que irá levar"
                  value={formData.foodType}
                  onChange={(e) => setFormData(prev => ({ ...prev, foodType: e.target.value }))}
                />
              </div>
            )}

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