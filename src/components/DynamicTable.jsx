import PropTypes from 'prop-types';

function DynamicTable({ colunas, linhas }){
  if(!linhas || linhas.length === 0){
    return <p className="text-gray-500 text-center mt-4">Nenhuma linha pra escrever</p>
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
                  {linha[coluna]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynamicTable;


