import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate  } from 'react-router-dom';
import './CharacterDetails.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const location = useLocation();
  const history = useNavigate ();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get('page') || 1;

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
     <Link
      to={`/?page=${currentPage}`}
      className="back-link"
    >
      Voltar para a pesquisa
    </Link>
      <div className="character-detail">
        <div className="character-image-details">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="character-info">
          <h2>{character.name}</h2>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Localização:</strong> {character.location.name}</p>
          <p><strong>Total de Episódios:</strong> {character.episode.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
