import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function TabelaResult({ linhas }){
  const LinkQueue = (tourl, text) => {
    return <Link to={tourl} className="text-blue-600">{text}</Link>
  }
  const colunas = ["card_bin","card_bank","card_category","card_country","card_type","card_brand","card_networks","product_type","processor_responses"];
  if(!linhas || linhas.length === 0){
    return <p className="text-gray-500 text-center mt-4">Sem Resultados</p>
  }
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'colapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#08121c', borderBottom: '2px solid #ddd' }}>
            { colunas.map((coluna, index) => (
              <th key={ index } style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>
                {coluna.toUpperCase().replace('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              {colunas.map((coluna, cindex) => (
                <td key={cindex} style={{ padding: '10px', fontSize: '13px' }}>
                  {cindex === 0 ? LinkQueue(`/bin/${linha[coluna]}`, linha[coluna]) : linha[coluna]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


const BinoResult = ({ result }) => {
  if (!result || !result.data) {
    return <div style={{ padding: '20px' }}>Aguardando dadossss...</div>;
  }

  // Pegamos todos os processadores (Endurance, Checkout, etc) dinamicamente
  // Object.entries nos dá um array de [nome, conteúdo] -> ['binlookupEndurance', {responses: ...}]
  const processors = Object.entries(result.data);
  const rrows = [];
  processors.map(([processorName, processorContent]) => {
    const linhas_no_processador = processorContent.responses ? Object.values(processorContent.responses) : [];
    const nomes_linhas = Object.values(linhas_no_processador);
    for(var i=0;i<nomes_linhas.length;i++){
      var nome_item = nomes_linhas[i];
      console.log(nome_item);
      rrows.push(nome_item)

    }
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard AutomáticooOOu</h1>
      <TabelaResult linhas={rrows} />
      
    </div>
  );
};

// Como agora é tudo dinâmico, o PropType fica genérico (aceita qualquer objeto no data)
BinoResult.propTypes = {
  result: PropTypes.shape({
    data: PropTypes.object
  }).isRequired
};

export default BinoResult;
