import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import qualaurlcorno from '../importaaipraver';
import { Link } from 'react-router-dom';
import BinItem from './BinItemCollapse';
import BinFormTrans from './BinFormTrans';


function OieItem({ data }){
  console.log(`chegou OieItem ${data.length} ${data}`);
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhum resultado encontrado.</p>;
  }
  const card_data = data.cards;
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
      <p><strong>ID:</strong> {data.response}</p>
      <p><strong>ID:</strong> {data.amount}</p>
      <p><strong>ID:</strong> {data.status}</p>
      <h3 className="text-md font-semibold mt-4">CC:</h3>
      <p><strong>CC:</strong> {card_data.card_number}</p>
      <p><strong>m:</strong> {card_data.card_exp_month}</p>
      <p><strong>y:</strong> {card_data.card_exp_year}</p>
      <p><strong>cvv:</strong> {card_data.card_cvv}</p>
      <BinItem bin={card_data.bin_data[0]} />
    </div>
  );
}


function Oie(){
  const [queueItems, setQueueItems] = useState([]);
  const [message, setMessage] = useState('');
  const [bin, setBin] = useState('1045');
  const fetchQueue = async (idToLoad) => {
    const voucarregar_id = bin || idToLoad;
    console.log(`voucarregar_id === ${voucarregar_id}`);
    try {
      const response = await fetch(`${qualaurlcorno()}/transactions/list_query?limit=3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: voucarregar_id }),
      });
      const json = await response.json();
      console.log(json.data.data);
      setQueueItems(json.data.data);
    } catch (err) {
      console.log(`erro ${err}`)
      setMessage('Erro ao carregar a fila');
    }
  };
  useEffect(() => {
    fetchQueue();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Consultor de Transs</h1>
      <BinFormTrans status={bin} setBin={setBin} handleSearch={fetchQueue} />
      {queueItems.length > 0 ? (
        <div className="space-y-4">
          {queueItems.map(item => (
            <OieItem key={item.id} data={item} />
          ))}
        </div>
      ) : ( 
        <>
          <OieItem
            data={queueItems}
          />
        </>
      )}
    </div>
  );
}

var networksShape = PropTypes.shape({
  date_created: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string
});

//React.PropTypes.shape({
OieItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    Gateways: PropTypes.shape({
      accepted_brands: PropTypes.string,
      date_created: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.bool
    }),
    amount: PropTypes.string,
    cards: PropTypes.shape({
      bin_data: PropTypes.arrayOf(PropTypes.shape({
        binIssuers: PropTypes.shape({
          country: PropTypes.string,
          date_created: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          name_alternative: PropTypes.string
        }),
        bin_information: PropTypes.arrayOf(PropTypes.shape({
          cvc_mandatory: PropTypes.bool,
          date_created: PropTypes.string,
          has_cvc: PropTypes.bool,
          id: PropTypes.number,
          id_bin: PropTypes.number
        })),
        bin_networks: PropTypes.arrayOf(PropTypes.shape({
          date_created: PropTypes.string,
          id: PropTypes.number,
          id_bin: PropTypes.number,
          id_network: PropTypes.number,
          networks: networksShape
        })),
        card_bin: PropTypes.string,
        card_category: PropTypes.string,
        card_type: PropTypes.string,
        cvc_mandatory: PropTypes.bool,
        date_created: PropTypes.string,
        id: PropTypes.number,
        id_issuer: PropTypes.number,
        product_category: PropTypes.string,
        products: PropTypes.arrayOf(PropTypes.shape({
          date_created: PropTypes.string,
          id: PropTypes.number,
          id_bin: PropTypes.number,
          id_product: PropTypes.number,
          products: networksShape
        }))
      })),
      card_bin: PropTypes.string,
      card_cvv: PropTypes.string,
      card_exp_month: PropTypes.string,
      card_exp_year: PropTypes.string,
      card_number: PropTypes.string,
      date_created: PropTypes.string,
      id: PropTypes.string,
      last_gateway_id: PropTypes.string,
      last_status: PropTypes.string,
      source: PropTypes.string
    }),
    currency: PropTypes.string,
    date_created: PropTypes.string,
    id: PropTypes.string,
    id_card: PropTypes.string,
    id_gateway: PropTypes.string,
    response: PropTypes.string,
    response_raw: PropTypes.string,
    status: PropTypes.string
  }))
};

export default Oie;