// Página "Sobre"
function About() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Sobre o Consultor de BIN</h1>
      <p className="text-gray-700">
        Esta é uma aplicação para consultar informações de BINs de cartões. Digite os 6 primeiros
        dígitos de um cartão na página de consulta para ver detalhes como emissor, tipo de cartão,
        bandeira e mais.
      </p>
      <p className="text-gray-700 mt-2">
        A aplicação se conecta a uma API FastAPI que retorna dados de um banco SQLite, incluindo
        informações sobre emissores, redes e produtos associados ao BIN.
      </p>
    </div>
  );
}

export default About;