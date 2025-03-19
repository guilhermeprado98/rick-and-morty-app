import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTerm, setStatusTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allData = [];
      let currentPage = 1;

      while (true) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await response.json();
        allData = [...allData, ...data.results];

        if (currentPage >= data.info.pages) break;
        currentPage++;
      }

      setAllCharacters(allData);
      setFilteredCharacters(allData);
      setTotalPages(Math.ceil(allData.length / charactersPerPage));
    };

    fetchAllCharacters();
  }, [charactersPerPage]);


  useEffect(() => {
    const filtered = allCharacters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      character.status.toLowerCase().includes(statusTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
    setTotalPages(Math.ceil(filtered.length / charactersPerPage));
  }, [searchTerm, statusTerm, allCharacters]);


  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className="home-container">
      <h1 className="home-title">Personagens de Rick and Morty</h1>

      {/* Total de personagens filtrados */}
      <p className="total-characters">Total de personagens encontrados: {filteredCharacters.length}</p>

      {/* Barra de pesquisa de nome */}
      <input
        type="text"
        className="search-input"
        placeholder="Pesquise por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Barra de pesquisa de status */}
      <input
        type="text"
        className="search-input"
        placeholder="Pesquise por status (Alive ou Dead)..."
        value={statusTerm}
        onChange={(e) => setStatusTerm(e.target.value)}
      />

      {/* Lista de personagens */}
      <div className="characters-grid">
        {currentCharacters.map((character) => (
          <div key={character.id} className="character-card">
           <Link to={`/character/${character.id}?page=${currentPage}`}>
            <img className="character-image" src={character.image} alt={character.name} />
            <div className="character-info">
              <h3>{character.name}</h3>
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
