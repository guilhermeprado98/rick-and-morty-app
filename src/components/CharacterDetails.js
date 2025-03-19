import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CharacterDetails.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {

    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do personagem:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="character-detail-container">
      <Link to="/" className="back-link">Voltar para a pesquisa</Link>

      <div className="character-detail">
        <div className="character-image-details">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="character-info">
          <h2>{character.name}</h2>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Espécie:</strong> {character.species}</p>
          <p><strong>Gênero:</strong> {character.gender}</p>
          <p><strong>Localização:</strong> {character.location.name}</p>
          <p><strong>Total de Episódios:</strong> {character.episode.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
