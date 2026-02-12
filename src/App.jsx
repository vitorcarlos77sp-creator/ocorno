import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BinSearchIssuer from './pages/BinSearch';
import BinSearchQuery from './pages/BinSearchQuery';
import About from './pages/About';

// Componente principal que configura as rotas
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">about</Link>
      </nav>
      <div className="min-h-screen bg-gray-100">
        {/* Menu de navegação */}
        <Navbar />
        {/* Define as rotas da aplicação */}
        <Routes>
          <Route path="/" element={<BinSearchQuery />} />
          <Route path="/about" element={<About />} />
          <Route path="/bin/:bin" element={<BinSearchQuery />} />
          <Route path="/bin/issuer" element={<BinSearchIssuer />} />
          <Route path="/bin/issuer/:bin" element={<BinSearchIssuer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;