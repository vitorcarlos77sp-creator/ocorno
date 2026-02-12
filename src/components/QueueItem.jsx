import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';



function MyComponent() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates one step back in the history stack
  };

  return (
    <button onClick={handleGoBack}>Go Back</button>
  );
}

function QueueItem({ queue_data }) {
    console.log(`chegamo QueueItem com ${JSON.stringify(queue_data)}  ${typeof queue_data}`);
    console.log(`${queue_data.length}`);
    if (!queue_data || queue_data.length === 0 || !queue_data.response) {
        return <p className="text-gray-500 text-center mt-4">Nenhum resultado encontrado.</p>;
    }
    const colunas = Object.keys(queue_data.response);
    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
            <p><strong>CC:</strong> {queue_data.cc}</p>
            <p><strong>CardBIN:</strong> {queue_data.response?.raw}</p>
            <p><strong>Status:</strong> {queue_data.response?.result_code}</p>
            <p><strong>description:</strong> {queue_data.response?.message}</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#08121c', borderBottom: '2px solid #ddd' }}>
                        {colunas.map(col => (
                            <th key={col} style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>
                                {col.toUpperCase().replace('_', ' ')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                    {Object.values(queue_data.response).map((row, index) => (
                        <td key={index} style={{ padding: '10px', fontSize: '13px' }}>
                            {/* Se o valor for um objeto, vira string, se não, exibe normal */}
                            {typeof row === 'object' ? JSON.stringify(row) : String(row)}
                        </td>
                    ))}
                    </tr>
                </tbody>
            </table>
            <MyComponent />
        </div>
    );
}





function QueueItemss({ queue_data, jsondata }) {
    console.log(`sim ta passando aki ${JSON.stringify(queue_data)}`)
    if (!queue_data || queue_data.length === 0) {
        return <p className="text-gray-500 text-center mt-4">Nenhum resultado encontrado.</p>;
    }
    const rows = Object.keys(queue_data);
    console.log(`rows ${rows} --------- ${JSON.stringify(queue_data)}`)
    if (rows.length === 0){
        return <p className="text-gray-500 text-center mt-4">Nenhum resultado encontrado.</p>;
    }
    var use_object = queue_data[rows[0]].response;
    var has_response = true;
    if(!use_object){
        use_object = queue_data[rows[0]];
        has_response = false;
    }else{
        var coluunas = []
        for(var i=0;i<rows.length;i++){
            console.log('buceta');
            var item = queue_data[rows[i]];
            if(!item.response)
                var colunas_item = Object.keys(item)
            else
                var colunas_item = Object.keys(item.response);
            for(var y=0;y<colunas_item.length;y++){
                var yitem = colunas_item[y];
                if(coluunas.indexOf(yitem)==-1)
                    coluunas.push(yitem);
            }
        }
        console.log(Object.values(coluunas));
    }
    // const colunas = Object.keys(queue_data[rows[0]].response);

    // const colunas = Object.keys(use_object);

    const colunas = (has_response ? coluunas : Object.keys(use_object));

    return (
        <div>
            <div className="bg-black p-4 rounded-lg shadow-sm border">
                <p><strong>CC:</strong> {jsondata.data?.status}</p>
                <p><strong>CardBIN:</strong> {Object.keys(jsondata.data?.items).length}</p>
                <p><strong>Status:</strong> {queue_data.response?.result_code}</p>
                <p><strong>description:</strong> {queue_data.response?.message}</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#08121c', borderBottom: '2px solid #ddd' }}>
                        {colunas.map(col => (
                            <th key={col} style={{ padding: '10px', textAlign: 'left', fontSize: '12px' }}>
                                {col.toUpperCase().replace('_', ' ')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                            {colunas.map(col => (
                                <td key={col} style={{ padding: '10px', fontSize: '13px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {has_response ? queue_data[row].response ? typeof queue_data[row].response[col] === 'object' ? JSON.stringify(queue_data[row].response[col]) : String(queue_data[row].response[col]) : "" : queue_data[row][col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <MyComponent />
        </div>
    );
}



QueueItem.propTypes = {
    queue_data: PropTypes.shape({
        cc: PropTypes.string,
        card_bin: PropTypes.string,
        status: PropTypes.string,
        response: PropTypes.object,
        description: PropTypes.string,
    }).isRequired,
};

export {QueueItem, MyComponent, QueueItemss};
//export default MyComponent;