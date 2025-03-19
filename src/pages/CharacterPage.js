// src/pages/CharacterPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import CharacterDetails from '../components/CharacterDetails';

const CharacterPage = () => {
  const { id } = useParams();

  return (
    <div>

      <CharacterDetails id={id} />
    </div>
  );
};

export default CharacterPage;
