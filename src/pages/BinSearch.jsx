import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BinForm from '../components/BinForm';
import BinResult from '../components/BinResult';
import qualaurlcorno from '../importaaipraver';




// Página de consulta de BINs
function BinSearchIssuer() {
  const navigate = useNavigate();
  const { bin: binFromUrl } = useParams();
  // Estados para gerenciar o BIN, resultado (array), erro e carregamento
  const [bin, setBin] = useState(binFromUrl || '');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para consultar o BIN
  const handleSearch = async (binToSearch) => {
    // if (bin.length < 6) {
    //   setError('Por favor, insira um BIN válido (6 dígitos).');
    //   setResult([]);
    //   return;
    // }
    const searchBin = bin || binToSearch;
    navigate(`/bin/issuer/${searchBin}`);
    setLoading(true);
    setError('');

    try {
      // Substitua pela URL real do seu FastAPI
      const response = await fetch(`${qualaurlcorno()}/bin/list_bins_by_issuer/${bin}`);
      const json = await response.json();

      if (json.error) {
        setError(json.message || 'Erro ao consultar o BIN.');
        setResult([]);
        return;
      }

      setResult(json.data.data);
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique sua conexão ou tente novamente.');
      setResult([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (binFromUrl) {
      setBin(binFromUrl); // Atualiza o estado do formulário
      handleSearch(binFromUrl); // Chama a consulta automaticamente
    }
  }, [binFromUrl]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Consultor de Issuer</h1>
      <BinForm
        bin={bin}
        setBin={setBin}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
      />
      <BinResult result={result} />
    </div>
  );
}

export default BinSearchIssuer;