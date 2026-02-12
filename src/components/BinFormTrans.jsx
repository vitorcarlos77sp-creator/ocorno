import PropTypes from 'prop-types';

// Componente para o formulário de entrada do BIN
function BinFormTrans({ status, setBin, handleSearch }) {
  const loading = false;
  const error = null;
  // Função para atualizar o estado do BIN
  const handleInputChange = (e) => {
    setBin(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={status}
        onChange={handleInputChange}
        placeholder="Last Status"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`mt-2 w-full p-2 text-white rounded ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Consultando...' : 'Consultar'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

// Define os tipos esperados das props (boa prática para evitar erros)
BinFormTrans.propTypes = {
  status: PropTypes.string,
  setBin: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default BinFormTrans;