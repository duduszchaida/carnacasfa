import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RSVPForm from './pages/RSVPForm';
import AdminDashboard from './pages/AdminDashboard';
import Cartao from './pages/Cartao';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-blue-500 to-purple-800 text-white">
      {/* Background with opacity overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639528096799-e36d29271c52?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      
      {/* Disney Characters */}
   
      
      {/* Content */}
      <div className="relative min-h-screen container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <img 
              src="https://imgur.com/H8bIQHt.jpg" 
              alt="Disney Castle"
              className="w-48 h-auto mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-300">
              Carnacasfa Mágico na Disney
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-yellow-100">
              Você está convidado para nossa festa encantada!
            </p>
            <div className="flex items-center justify-center space-x-2 text-yellow-200">
              
              <p className="text-lg">Prepara sua fantasia e chame seus amigos</p>
            </div>
          </div>

          <div className="space-y-6 text-center">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" className="w-10 h-10 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Data</h2>
                <p>Sábado, 15 de março de 2024</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <img src="https://res.cloudinary.com/dirlqtqgk/image/upload/v1741630159/mcvrvtkw7oqfhekyocvc.png" className="w-10  mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Horário</h2>
                <p>A partir das 17h</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10 md:col-span-2">
                <img src="https://images.vexels.com/content/192938/preview/treasure-map-detailed-drawing-illustration-5df87e.png" className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-2">Local</h2>
                <p>Sede da família Blum</p>
                <p>Rua Ana Martins Smaha, 202</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <img src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-minnie-mouse-ears-with-bow-icon-vector-illustration-%C3%A7izi-clipart-png-image_12245561.png" className="w-16 h-16 mx-auto mb-2 text-yellow-300" />
                <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
                <ul className="space-y-2 text-left max-w-md mx-auto">
                  <li>• Venha fantasiado como seu personagem favorito</li>
                  <li>• Prêmio para a melhor fantasia Individual</li>
                  <li>• Prêmio para a melhor fantasia em grupo (limite de 5 pessoas)</li>
                  <li>• Não esqueça do prato de comida e/ou o valor da entrada </li>
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
              Para mais informações, entre em contato com a coordenação do Carnacasfa
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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/cartao" element={<Cartao />} />
    </Routes>
  );
}

export default App;