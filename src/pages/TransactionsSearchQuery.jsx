import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BinForm from '../components/BinForm';
//import BinResult from '../components/BinResult';
import BinResult from '../components/Roboresult'
import qualaurlcorno from '../importaaipraver';
import SelectDinamico from '../components/ProcessorSelect'

// function About() {
//   const [networks, setNetworks] = useState([]);
//   useEffect(() => {
//     fetch('http://sua-api.com/networks')
//       .then(res => res.json())
//       .then(data => setNetworks(data.data))
//       .catch(err => console.error('Erro:', err));
//   }, []);


// Página de consulta de BINs
function TransactionsSearchQuery() {
  const navigate = useNavigate();
  const { bin: binFromUrl } = useParams();
  // Estados para gerenciar o BIN, resultado (array), erro e carregamento
  const [bin, setBin] = useState(binFromUrl || '');
  const [resultCode, setResultCode] = useState('');
  const [result, setResult] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [oogay, setOogay] = useState([]);

  const handleSelectChange = (valor) => {
    setValorSelecionado(valor);
    console.log("O usuário escolheu o ID:", valor, valor);
    console.log(result.data);
    let novo = {'data': {valor: result.data[valor]}}
    console.log(novo)
    setResultData(novo)
  };


  // Função para consultar o BIN
  const handleSearch = async (binToSearch) => {
    console.log(`${bin} ----- ${binToSearch} ---first`)
    const searchBin = bin || binToSearch; // Usa o BIN fornecido ou o do estado
    console.log(`${bin} ----- ${searchBin}`)
    console.log({resultCode});
    navigate(`/transactions/${searchBin}`);
    if (searchBin.length < 1) {
      setError('Por favor, insira um BIN válido (6 dígitos).');
      setResultData([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Substitua pela URL real do seu FastAPI
      let use_url = `${qualaurlcorno()}/summary/transactions/${searchBin}`;
      if(resultCode){
        use_url += `?result_code=${resultCode}`;
      }
      const response = await fetch(use_url);
      const json = await response.json();

      if (json.error) {
        setError(json.message || 'Erro ao consultar o BIN.');
        setResultData([]);
        return;
      }
      console.log(`lixo inutil ${JSON.stringify(json.data)}`)
      let datanames = Object.keys(json.data);
      console.log(datanames);
      let dataogay = []
      datanames.map((item, index)=>{dataogay.push({'id': item, 'name': item})});
      // setOogay([{'id': '1', 'name': 'n1'}, {'id': '2', 'name': 'n2'}])
      setOogay(dataogay);
      setResultData(json);
      setResult(json);
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique sua conexão ou tente novamente.');
      setResultData([]);
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Consultor de Transacoes</h1>
      <BinForm
        bin={bin}
        setBin={setBin}
        handleSearch={handleSearch}
        loading={loading}
        error={error}
        resultCode={resultCode}
        setResultCode={setResultCode}
      />
      <SelectDinamico aoMudar={handleSelectChange} opcoes={oogay} />
      <BinResult result={resultData} colunas={["amount","currency","merchant_gateway","merchant_name","message","result_code","raw","nice_code"]} />
    </div>
  );
}

export default TransactionsSearchQuery;