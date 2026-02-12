import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [displayStyle, setDisplayStyle] = useState('');
  return (
    <div id="cornomanso" className="fixed top-0 left-0 h-full w-64 text-white p-4" style={{ backgroundColor: '#121212', display: displayStyle }}>
      <h2 className="text-2xl font-bold mb-6">BIN Lookup</h2>
      <button
        onClick={(e)=>{console.log("vooo");console.log("ee");setDisplayStyle('none');}}
        className="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        botao
      </button>
      <h2 onClick={console.log("vai nao")} className="text-2xl font-bold mb-6">clica aki meu</h2>
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
            }`
          }
        >
          Consulta de BIN
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
            }`
          }
        >
          Consultar Transacoes
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
            }`
          }
        >
          Sobre
        </NavLink>
        {/* Espaço para futuras páginas, ex.: gerenciar filas */}
        <NavLink
          to="/queue"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
            }`
          }
        >
          Fila de Consultas
        </NavLink>
        <NavLink
          to="/qqueue"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700'
            }`
          }
        >
          Fila de Consultas2
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;