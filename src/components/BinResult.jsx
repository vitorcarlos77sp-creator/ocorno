import { useState } from 'react';
import PropTypes from 'prop-types';
import BinItem from './BinItemCollapse';

// Componente para exibir a lista de BINs
function BinResult({ result }) {
  const [allExpanded, setAllExpanded] = useState(false);
  const [filterNetwork, setFilterNetwork] = useState('');
  // Se não houver resultados, não renderiza nada
  if (!result || result.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhum resultado encontrado.</p>;
  }

  // Extrai todas as bandeiras únicas para o dropdown
  const uniqueNetworks = [
    ...new Set(
      result.flatMap(bin => bin.bin_networks.map(network => network.networks.name))
    ),
  ];

  // Filtra os BINs com base na bandeira selecionada
  const filteredResults = filterNetwork
    ? result.filter(bin =>
        bin.bin_networks.some(network => network.networks.name === filterNetwork)
      )
    : result;
  
  // result é um array de BINs, usamos map para renderizar cada um
  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold mb-2">Resultados ({filteredResults.length}):</h2>
      <div className="flex justify-between items-center mb-4">
        {/* Botão para expandir/colapsar todos */}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setAllExpanded(!allExpanded)}
        >
          {allExpanded ? 'Colapsar todos' : 'Expandir todos'}
        </button>
        {/* Dropdown para filtro de bandeira */}
        <select
          value={filterNetwork}
          onChange={e => setFilterNetwork(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas as bandeiras</option>
          {uniqueNetworks.map(network => (
            <option key={network} value={network}>
              {network}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {/* Iterando sobre o array result para renderizar cada BIN */}
        {filteredResults.map(bin => (
          <BinItem key={bin.id} bin={bin} allExpanded={allExpanded} />
        ))}
      </div>
    </div>
  );
}

// Define os tipos esperados da prop result
BinResult.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      card_bin: PropTypes.string,
      card_type: PropTypes.string,
      card_category: PropTypes.string,
      product_category: PropTypes.string,
      cvc_mandatory: PropTypes.bool,
      id_issuer: PropTypes.number,
      date_created: PropTypes.string,
      binIssuers: PropTypes.shape({
        country: PropTypes.string,
        name: PropTypes.string,
        name_alternative: PropTypes.string,
        id: PropTypes.number,
        date_created: PropTypes.string,
      }),
      bin_networks: PropTypes.arrayOf(
        PropTypes.shape({
          id_bin: PropTypes.number,
          id_network: PropTypes.number,
          id: PropTypes.number,
          date_created: PropTypes.string,
          networks: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.number,
            date_created: PropTypes.string,
          }),
        })
      ),
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id_bin: PropTypes.number,
          id_product: PropTypes.number,
          id: PropTypes.number,
          date_created: PropTypes.string,
          products: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.number,
            date_created: PropTypes.string,
          }),
        })
      ),
      bin_information: PropTypes.arrayOf(
        PropTypes.shape({
          has_cvc: PropTypes.bool,
          cvc_mandatory: PropTypes.bool,
          id_bin: PropTypes.number,
          id: PropTypes.number,
          date_created: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default BinResult;