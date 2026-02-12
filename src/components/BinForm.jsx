import PropTypes from 'prop-types';

// Componente para o formulário de entrada do BIN
function BinForm({ bin, setBin, handleSearch, loading, error, resultCode, setResultCode }) {
  // Função para atualizar o estado do BIN
  const handleInputChange = (e) => {
    setBin(e.target.value);
  };

  const handleInputChangeResultCode = (e) => {
    setResultCode(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={bin}
        onChange={handleInputChange}
        placeholder="Digite o BINeth (6-12 dígitos)"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
        maxLength="16"
      />
      <input
        type="text"
        value={resultCode}
        onChange={handleInputChangeResultCode}
        placeholder="filtrar result_code"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
        maxLength="16"
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
BinForm.propTypes = {
  bin: PropTypes.string.isRequired,
  setBin: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default BinForm;