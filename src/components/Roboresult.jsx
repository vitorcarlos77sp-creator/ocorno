// import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DynamicTable from './DynamicTable'
import SelectDinamico from './ProcessorSelect'


const BinResult = ({ result, colunas }) => {
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [oogay, setOogay] = useState([]);
  if (!result || !result.data) {
    return <div style={{ padding: '20px' }}>Aguardando dadossss...</div>;
  }

  

  // Pegamos todos os processadores (Endurance, Checkout, etc) dinamicamente
  // Object.entries nos dá um array de [nome, conteúdo] -> ['binlookupEndurance', {responses: ...}]
  const processors = Object.entries(result.data);
  const processors_names = [];
  const rrows = [];
  let total_processors = 0;
  processors.map(([processorName, processorContent]) => {
    const linhas_no_processador = processorContent.responses ? Object.values(processorContent.responses) : [];
    const nomes_linhas = Object.values(linhas_no_processador);
    // var p_check = {'id': total_processors.toString(), 'name': processorName}
    var p_check = {'id': processorName, 'name': processorName}
    if(processors_names.indexOf(p_check)===-1){
      console.log(p_check);
      processors_names.push(p_check);
      total_processors += 1;
      // processors_names[total_processors] = processorName;
    }
    for(var i=0;i<nomes_linhas.length;i++){
      var nome_item = nomes_linhas[i];
      console.log(nome_item);
      rrows.push(nome_item)

    }
  });
  const handleSelectChange = (valor) => {
    setValorSelecionado(valor);
    console.log("O usuário escolheu o ID:", valor);
  };
  //console.log(processors_names);
  //processors_names.map(item=>(console.log(`${item.id} == ${item.name}`)))
  // setOpcoes(processors_names);
  
  // setOogay(rrows);
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Automáticosss UAI SO {valorSelecionado}</h1>
      <SelectDinamico aoMudar={handleSelectChange} opcoes={processors_names} />
      <DynamicTable colunas={colunas} linhas={rrows} />
      
    </div>
  );
};

// Como agora é tudo dinâmico, o PropType fica genérico (aceita qualquer objeto no data)
BinResult.propTypes = {
  result: PropTypes.shape({
    data: PropTypes.object
  }).isRequired
};

export default BinResult;
