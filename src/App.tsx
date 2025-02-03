import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Sparkles, Music, Calendar, MapPin, Clock, Star } from 'lucide-react';
import RSVPForm from './pages/RSVPForm';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white">
      {/* Background with opacity overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639528096799-e36d29271c52?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* Content */}
      <div className="relative min-h-screen container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <img 
              src="https://cdn.pixabay.com/photo/2018/12/07/08/47/castle-3861025_960_720.png" 
              alt="Disney Castle"
              className="w-48 h-auto mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300">
              Carnaval Mágico Disney
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-yellow-100">
              Você está convidado para nossa festa encantada!
            </p>
            <div className="flex items-center justify-center space-x-2 text-yellow-200">
              <Music className="w-5 h-5" />
              <p className="text-lg">Onde a magia encontra a folia</p>
            </div>
          </div>

          <div className="space-y-6 text-center">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Data</h2>
                <p>Sábado, 10 de Fevereiro de 2024</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Horário</h2>
                <p>Das 20h às 4h</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 md:col-span-2">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Local</h2>
                <p>Salão Mágico do Reino</p>
                <p>Rua das Fadas, 123 - Jardim Encantado</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
                <ul className="space-y-2 text-left max-w-md mx-auto">
                  <li>• Venha fantasiado como seu personagem Disney favorito</li>
                  <li>• Prêmio para a melhor fantasia</li>
                  <li>• Música, dança e muita diversão</li>
                  <li>• Open bar e buffet completo</li>
                  <li>• Espaço para fotos temático</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => navigate('/confirmar')}
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-8 rounded-full transform transition hover:scale-105"
              >
                Confirmar Presença
              </button>
            </div>

            <p className="text-sm mt-6 text-yellow-100">
              Para mais informações, entre em contato: (11) 99999-9999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/confirmar" element={<RSVPForm />} />
    </Routes>
  );
}

export default App;