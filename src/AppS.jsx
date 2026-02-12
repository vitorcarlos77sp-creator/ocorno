import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Atualizado para Sidebar
import BinSearchIssuer from './pages/BinSearch';
import BinSearchQuery from './pages/BinSearchQuery';
import TransactionsSearchQuery from './pages/TransactionsSearchQuery';
import About from './pages/About';
import Queue from './pages/Queue';
import QueueItem from './components/QueueItem';
import Oie from './components/oie';


function AppS() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex desgraca text-white" style={{ backgroundColor: '#030712' }}>
        {/* Sidebar ocupa a esquerda */}
        <Sidebar />
        {/* Conteúdo principal com margem para evitar sobreposição */}
        <div className="flex-1 ml-64 p-6 bg-black">
          <Routes>
            <Route path="/" element={<BinSearchQuery />} />
            <Route path="/bin/:bin" element={<BinSearchQuery />} />
            <Route path="/transactions/" element={<TransactionsSearchQuery />} />
            <Route path="/transactions/:bin" element={<TransactionsSearchQuery />} />
            <Route path="/about" element={<Oie />} />
            <Route path="/bin/issuer" element={<BinSearchIssuer />} />
            <Route path="/bin/issuer/:bin" element={<BinSearchIssuer />} />
            <Route path="/queue" element={<div>Página de Fila (a ser implementada)</div>} />
            <Route path="/qqueue" element={<Queue />} />
            <Route path="/qqueue/:id" element={<Queue />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AppS;
