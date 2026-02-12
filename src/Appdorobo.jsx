import React, { useState, useEffect } from 'react';
//import BinResult from './BinResult'; // Importa o "molde" que criamos
import BinResult from './components/Roboresult'
function App() {
  // 1. Criamos um estado para guardar a resposta da API
  const [meusDados, setMeusDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 2. O useEffect é como o "if __name__ == '__main__':" do Python, roda ao iniciar
  useEffect(() => {
    fetch('URL_DA_SUA_API_AQUI') // Coloque o link da sua API
      .then(response => response.json())
      .then(json => {
        setMeusDados(json);    // Guarda o JSON no estado
        setCarregando(false);  // Avisa que terminou de carregar
      })
      .catch(err => console.error("Erro ao buscar dados:", err));
  }, []);

  // 3. Renderização
  return (
    <div className="App">
      <h1>Meu Dashboard de BINs</h1>
      
      {carregando ? (
        <p>Carregando dados da API...</p>
      ) : (
        /* Aqui você "chama" o componente e passa o JSON para dentro dele via prop 'result' */
        <BinResult result={meusDados} />
      )}
    </div>
  );
}

export default App;
