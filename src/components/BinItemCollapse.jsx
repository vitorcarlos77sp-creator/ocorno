import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente para renderizar um único BIN como um item expansível
function BinItem({ bin, allExpanded }) {
  // Estado para controlar se o item está expandido
  const [isExpanded, setIsExpanded] = useState(allExpanded || false);

  useEffect(() => {
    setIsExpanded(allExpanded);
  }, [allExpanded]);

  // Função para alternar a expansão ao clicar
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Acessando objetos e arrays do objeto bin
  const issuer = bin.binIssuers || {}; // Objeto com dados do emissor
  const networks = bin.bin_networks || []; // Array de redes
  const products = bin.products || []; // Array de produtos
  const binInfo = bin.bin_information || []; // Array de informações do BIN

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border mb-2 text-black">
      {/* Item clicável que mostra apenas o BIN inicialmente */}
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={toggleExpand}
      >
        <p className="font-semibold text-black">
          <strong>BIN:</strong> {bin.card_bin}
        </p>
        <span className="text-blue-600">
          {isExpanded ? 'Ocultar detalhes' : 'Mostrar detalhes'}
        </span>
      </div>

      {/* Detalhes exibidos apenas quando isExpanded for true */}
      {isExpanded && (
        <div className="mt-4">
          {/* Propriedades diretas do objeto bin */}
          <p><strong>Tipo:</strong> {bin.card_type}</p>
          <p><strong>Categoria:</strong> {bin.card_category}</p>
          <p><strong>Categoria do Produto:</strong> {bin.product_types}</p>
          <p><strong>CVC Obrigatório:</strong> {bin.cvc_mandatory ? 'Sim' : 'Não'}</p>

          {/* Acessando o objeto binIssuers */}
          <h3 className="text-md font-semibold mt-4">Emissor:</h3>
          <p><strong>Nome:</strong> <Link to={`/bin/issuer/${issuer.id | 0}`} className="text-blue-600">{bin.card_bank || ""}</Link></p>
          <p><strong>País:</strong> {bin.card_country || ""}</p>
          <p>
            <strong>Nome Alternativo:</strong>{' '}
            {issuer.name_alternative ?? 'Não disponível'}
          </p>

          {/* Acessando o array bin_networks */}
          <h3 className="text-md font-semibold mt-4">Redes:</h3>
          {networks.length > 0 ? (
            <ul className="list-disc pl-5">
              {networks.map(network => (
                <li key={network.id}>
                  {network.networks.name}
                  {network.networks.description && ` (${network.networks.description})`}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma rede encontrada.</p>
          )}

          {/* Acessando o array products */}
          <h3 className="text-md font-semibold mt-4">Produtos:</h3>
          {products.length > 0 ? (
            <ul className="list-disc pl-5">
              {products.map(product => (
                <li key={product.id}>
                  {product.products.name}
                  {product.products.description && ` (${product.products.description})`}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}

          {/* Acessando o array bin_information */}
          <h3 className="text-md font-semibold mt-4">Informações do BIN:</h3>
          {binInfo.length > 0 ? (
            <ul className="list-disc pl-5">
              {binInfo.map(info => (
                <li key={info.id}>
                  <span>Possui CVC: {info.has_cvc ? 'Sim' : 'Não'}</span>,{' '}
                  <span>CVC Obrigatório: {info.cvc_mandatory ? 'Sim' : 'Não'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma informação adicional encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Define os tipos esperados da prop bin
BinItem.propTypes = {
  bin: PropTypes.shape({
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
  }).isRequired,
  allExpanded: PropTypes.bool.isRequired,
};

export default BinItem;