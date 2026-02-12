import { useState, useEffect } from 'react';
import qualaurlcorno from '../importaaipraver';

function SelectDinamico({aoMudar, opcoes}) {
  // const [opcoes, setOpcoes] = useState([]);
  // const [selecionado, setSelecionado] = useState("");
  // const fetchQueue = async () => {
  //   try{
  //     const response = await fetch(`${qualaurlcorno()}/processors/`);
  //     const json = await response.json();
  //     setOpcoes(json.data.data || [])
  //   }catch(err){
  //     console.error('erro', err);
  //   }
  // };
  //useEffect(() => {
    // Busca os dados da API ao carregar o componente
    // await fetch(`${qualaurlcorno()}/processors/`)
    //   .then(response => response.json()?.data.data)
    //   .then(dados => setOpcoes(dados))
    //   .catch(erro => console.error("Erro ao carregar:", erro));
    //fetchQueue()
  //}, []); // Array vazio garante que execute apenas uma vez

  return (
    <select 
      onChange={(e) => aoMudar(e.target.value)}
      className="bg-black text-white"
      style={{ borderWidth: '1px', borderColor: 'white' }}
    >
      <option value="">Selecione uma opção</option>
      {opcoes.map(item => (
        <option key={item.id} value={item.id} name={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SelectDinamico;