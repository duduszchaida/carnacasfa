import React, { useState, useMemo } from 'react';

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ') // Adiciona espaços a cada 4 dígitos
    .trim()
    .slice(0, 19); // Limita ao tamanho de um número de cartão
}

function formatExpiry(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{0,2})/, '$1/$2') // Adiciona a barra após dois dígitos
    .slice(0, 5); // Limita ao formato MM/YY
}

function formatCVV(value) {
  return value.replace(/\D/g, '').slice(0, 3); // Apenas números, máximo 3 dígitos
}

function Cartao() {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const isFormValid = useMemo(() => {
    return (
      formData.cardNumber.length === 19 && // Formato completo do cartão
      formData.name.trim() !== '' &&
      formData.expiry.length === 5 && // Formato completo MM/YY
      formData.cvv.length === 3 // CVV completo
    );
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Resultado Encontrado!</h2>
          <p className="text-gray-600 mb-6">Baseado na análise da nossa IA do seu cartão...</p>
          <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6 mb-6">
            <p className="text-xl mb-2">Você tem mais afinidade com:</p>
            <h3 className="text-4xl font-bold">JUCASFA</h3>
          </div>
          <button
            onClick={() => setShowResult(false)}
            className="text-slate-700 hover:text-slate-900 font-medium"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Descubra seu Grupo de Jovens Ideal</h1>
          <p className="text-gray-600 mt-2">Nossa análise é feita com a mais sofisticada das IAs (Davi)</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número do Cartão
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome no Cartão
            </label>
            <input
              type="text"
              placeholder="NOME"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Validade
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                value={formData.expiry}
                onChange={(e) => setFormData({...formData, expiry: formatExpiry(e.target.value)})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: formatCVV(e.target.value)})}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              isFormValid 
                ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:opacity-90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Descobrir Meu Grupo Ideal
          </button>
          <p className="text-xs text-gray-500 text-center mt-4">
            Funciona, pode confiar.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cartao;