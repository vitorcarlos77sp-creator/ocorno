import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BinForm from '../components/BinForm';
//import BinResult from '../components/BinResult';
// import BinResult from '../components/Roboresult'
import qualaurlcorno from '../importaaipraver';
import BinItem from '../components/BinItemCollapse';
import BinoResult from '../components/BinoResult';

// function About() {
//   const [networks, setNetworks] = useState([]);
//   useEffect(() => {
//     fetch('http://sua-api.com/networks')
//       .then(res => res.json())
//       .then(data => setNetworks(data.data))
//       .catch(err => console.error('Erro:', err));
//   }, []);


// Página de consulta de BINs
function BinSearchQuery() {
  const navigate = useNavigate();
  const { bin: binFromUrl } = useParams();
  // Estados para gerenciar o BIN, resultado (array), erro e carregamento
  const [bin, setBin] = useState(binFromUrl || '');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Função para consultar o BIN
  const handleSearch = async (binToSearch) => {
    console.log(`${bin} ----- ${binToSearch} ---first`)
    const searchBin = bin || binToSearch; // Usa o BIN fornecido ou o do estado
    console.log(`${bin} ----- ${searchBin}`)
    navigate(`/bin/${searchBin}`);
    if (searchBin.length < 1) {
      setError('Por favor, insira um BIN válido (6 dígitos).');
      setResult([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Substitua pela URL real do seu FastAPI
      const response = await fetch(`${qualaurlcorno()}/summary/binlookup/${searchBin}`);
      const json = await response.json();

      if (json.error) {
        setError(json.message || 'Erro ao consultar o BIN.');
        setResult([]);
        return;
      }

      setResult(json);
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique sua conexão ou tente novamente.');
      setResult([]);
    } finally {
      setLoading(false);
    }
  };
  // useEffect para chamar handleSearch quando o binFromUrl mudar
  useEffect(() => {
    if (binFromUrl) {
      setBin(binFromUrl); // Atualiza o estado do formulário
      handleSearch(binFromUrl); // Chama a consulta automaticamente
    }
  }, [binFromUrl]); // Executa quando binFromUrl muda
  // handleSearch();
  console.log(`alooo ${JSON.stringify(result)}`);
  var use_result = result;
  // if(!result.data || result.data.length <= 0){
  //   return (
  //     <div className="p-6">
  //       <h1 className="text-2xl font-bold mb-4 text-center">o corno</h1>
  //     </div>
  //   );
  // }else{
  if(result.data){
    var processors = Object.keys(result.data);
    if(processors.length>0){
      var response_id_first_processor = Object.keys(result.data[processors[0]].responses);
      use_result = result.data[processors[0]].responses[response_id_first_processor[0]];
      // use_result = result.data.binlookupCheckout.responses['62'];
    }
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Consultor de BIN</h1>
      <BinForm
        bin={bin}
        setBin={setBin}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
      />
      <BinItem bin={use_result} />
      <BinoResult result={result}/>
    </div>
  );
}

export default BinSearchQuery;