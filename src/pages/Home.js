import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTerm, setStatusTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      }
    };

    fetchCharacters();
  }, [currentPage]);


  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    character.status.toLowerCase().includes(statusTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="home-title">Personagens de Rick and Morty</h1>

      {/*total de personagens */}
      <p className="total-characters">Total de personagens: {characters.length}</p>

      {/*Pesquisa de Nome */}
      <input
        type="text"
        className="search-input"
        placeholder="Pesquise por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Pesquisa de Status */}
      <input
        type="text"
        className="search-input"
        placeholder="Pesquise por status (Alive ou Dead)..."
        value={statusTerm}
        onChange={(e) => setStatusTerm(e.target.value)}
      />

      {/* Lista de Personagens */}
      <div className="characters-grid">
        {filteredCharacters.map((character) => (
          <div key={character.id} className="character-card">
            <Link to={`/character/${character.id}`}>
              <img className="character-image" src={character.image} alt={character.name} />
              <div className="character-info">
                <h3>{character.name}</h3>
                <p>{character.species}</p>
                <p><strong>Status:</strong> {character.status}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Home;
