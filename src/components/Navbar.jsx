import { NavLink } from 'react-router-dom';

// Componente de navegação (menu)
function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-2xl mx-auto flex space-x-4">
        {/* NavLink cria links com estilo ativo */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-white font-bold underline'
              : 'text-white hover:underline'
          }
        >
          Consulta de BIN
        </NavLink>
        <NavLink
          to="/bin/issuer"
          className={({ isActive }) =>
            isActive
              ? 'text-white font-bold underline'
              : 'text-white hover:underline'
          }
        >
          Consulta de ISSUER
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-white font-bold underline'
              : 'text-white hover:underline'
          }
        >
          Sobre
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;