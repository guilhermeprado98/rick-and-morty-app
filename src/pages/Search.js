// src/pages/Search.js
import React, { useState } from 'react';
import { fetchCharacters } from '../services/rickAndMortyService';
import CharacterCard from '../components/CharacterCard';

const Search = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = async () => {
    const data = await fetchCharacters(page, search, status);
    setCharacters(data.results);
  };

  return (
    <div>
      <h2>Pesquisar Personagens</h2>
      <input
        type="text"
        placeholder="Nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">Status</option>
        <option value="alive">Vivo</option>
        <option value="dead">Morto</option>
        <option value="unknown">Desconhecido</option>
      </select>
      <button onClick={handleSearch}>Pesquisar</button>

      <div>
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <p>Nenhum personagem encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
