// src/components/CharacterCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} width="100" />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <Link to={`/character/${character.id}`}>Ver Detalhes</Link>
    </div>
  );
};

export default CharacterCard;
