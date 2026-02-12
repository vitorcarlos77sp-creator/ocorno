import { useState, useEffect } from 'react';
import qualaurlcorno from '../importaaipraver';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { QueueItem, QueueItemss } from '../components/QueueItem';
import {TextInput, StyleSheet, Text} from 'react-native';
import SelectDinamico from '../components/ProcessorSelect'
import DynamicTable from '../components/DynamicTable'


function Queue() {
  const navigate = useNavigate();
  const { id: idFromUrl } = useParams();
  const [bin, setBin] = useState('');
  const [queueItems, setQueueItems] = useState([]);
  const [achoQueUmaVariavel, setAchoQueUmaVariavel] = useState({});
  const [message, setMessage] = useState('');
  const [text, onChangeText] = useState('Useless Text');
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  const handleSelectChange = (valor) => {
    setValorSelecionado(valor);
    console.log("O usuário escolheu o ID:", valor);
  };



  const LinkQueue = (tourl, text) => {
    return <Link to={tourl} className="text-blue-600">{text}</Link>
  }



  const fetchQueue = async (idToLoad) => {
    const voucarregar_id = false || idToLoad;
    try {
      const url_fetch = `${qualaurlcorno()}/processors/requests/${!voucarregar_id ? "?order_by=desc" : idToLoad }`;
      console.log(`vai vir de ${url_fetch} ---- ${voucarregar_id}`);
      const response = await fetch(url_fetch);
      const json = await response.json();
      const data_json = !voucarregar_id ? json.data.data : json.data.items;
      const is_with_id = !voucarregar_id ? false : true;
      console.log(`lala ${JSON.stringify(data_json)}`);
      setQueueItems(data_json || []);
      setAchoQueUmaVariavel(json || {})
    } catch (err) {
      setMessage('Erro ao carregar a fila');
    }
  };

  const fetchProcessors = async () => {
    try{
      const response = await fetch(`${qualaurlcorno()}/processors/`);
      const json = await response.json();
      setOpcoes(json.data.data || [])
    }catch(err){
      console.error('erro', err);
    }
  };

  // Chama ao carregar a página
  useEffect(() => {
    fetchProcessors();
    fetchQueue(idFromUrl);
  }, [idFromUrl]);


  // Adiciona um BIN à fila
  const handleAddToQueue = async () => {
    if (bin.length < 26) {
      setMessage('checar input');
      return;
    }
    try {
      var binsplited_lines = bin.split(/\r?\n|\r|\n/g);
      var ccs = [];
      for(var i=0;i<binsplited_lines.length;i++){
        var item = binsplited_lines[i];
        // var item_splited = item.split(/(\d+)/);
        ccs.push({raw: item})
        //     {
        //         cc: item_splited[0],
        //         month: item_splited[1],
        //         year: item_splited[2],
        //         cvv: item_splited[3],
        //     }
        // )
      }
      var bbody = {
        status: 'pending',
        id_processor: valorSelecionado || 'botTeste',
        name_source: 'botCLI',
        items: ccs
      }
      const response = await fetch(`${qualaurlcorno()}/processors/requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ card_bin: bin }),
        body: JSON.stringify(bbody),
      });
      const json = await response.json();
      setMessage(json.message);
      setBin('');
      fetchQueue(); // Atualiza a lista
    } catch (err) {
      setMessage('Erro ao adicionar à fila');
    }
  };

  const handleIdClickk = async (idToLoad) => {
    const voucarregar_id = false || idToLoad;
    try {
      const url_fetch = `${qualaurlcorno()}/processors/requests/${!voucarregar_id ? "" : idToLoad }`;
      console.log(`vai vir de ${url_fetch}`);
      const response = await fetch(url_fetch);
      const json = await response.json();
      console.log(`lele ${JSON.stringify(json.data.data.items)}`);
      setQueueItems(json.data.data.items || []);
    } catch (err) {
      setMessage('Erro ao carregar a fila');
    }
  };

  const handleIdClick = async () => {
    if (idFromUrl.length < 6) {
      setMessage('Insira um BIN válido (6 dígitos)');
      return;
    }
    try {
      const response = await fetch(`${qualaurlcorno()}/queue/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ card_bin: bin }),
      });
      const json = await response.json();
      setMessage(json.message);
      setBin('');
      fetchQueue(); // Atualiza a lista
    } catch (err) {
      setMessage('Erro ao adicionar à fila');
    }
  };

  const extrair_nome_opcao_by_id = (id, opcoes) => {
    for(var i=0;i<opcoes.length;i++){
      var item = opcoes[i]
      if(item.id == id){
        return item.name;
      }
    }
    return '';
  };

  const llinhas = [];
  for(var i=0;i<queueItems.length;i++){
    var item = queueItems[i];
    {/*item["processor_name"] = `<a href="/qqueue/${item.id}">${extrair_nome_opcao_by_id(item.id_processor, opcoes)}</a>`*/}
    item["processor_name"] = LinkQueue(`/qqueue/${item.id}`,extrair_nome_opcao_by_id(item.id_processor, opcoes));
    item["total_items"] = Object.keys(item.items).length;
    {/*llinhas.push(
      {
        id: item.id,
        id_processor: extrair_nome_opcao_by_id(item.id_processor, opcoes),
        status: item.status
      }
    )*/}
    llinhas.push(item);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Fila559900443355 dasses Consultfas</h1>
      <div className="mb-4">
        <TextInput
          multiline
          numberOfLines={5}
          style={styles.input}
          onChangeText={onChangeText}
          onChange={(e) => setBin(e.target.value)}
          value={bin}
          className="bg-black text-white"
        />
        <SelectDinamico aoMudar={handleSelectChange} opcoes={opcoes}/>
        {/*<TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text >{bodyText}</Text>
        </Text>
        <input
          type="text"
          value={bin}
          onChange={(e) => setBin(e.target.value)}
          placeholder="Digite o BIN (6 dígitos)"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          numberOfLines={5}
        />*/}
        <button
          onClick={handleAddToQueue}
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar à Fila
        </button>
      </div>
      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
      <h2 className="text-lg font-semibold mb-2">Itensssf na fila</h2>
      {queueItems.length > 0 ? (
        <>
        <DynamicTable colunas={['id', 'processor_name', 'status', 'date_created', 'total_items']} linhas={llinhas} />
        
        </>
      ) : ( 
        <>
          <QueueItemss queue_data={queueItems} jsondata={achoQueUmaVariavel} />
          {/*{Object.keys(queueItems).map(item => (console.log(`hey ${JSON.stringify(queueItems[item])}`)))}
          {Object.keys(queueItems).map(item => (<QueueItem queue_data={queueItems[item]} />))}
          {console.log(`oi ne ${Object.keys(queueItems)}`)}
          <QueueItem
            queue_data={queueItems}
          />*/}
        </>
      )}
    </div>
  );
}


const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    //height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
  },
});


export default Queue;









