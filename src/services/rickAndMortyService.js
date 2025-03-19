// src/services/rickAndMortyService.js

export const fetchCharacters = async (page = 1, name = '', status = '') => {
   const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${name}&status=${status}`;
   const response = await fetch(url);
   const data = await response.json();
   return data;
 };

 export const fetchCharacterDetails = async (id) => {
   const url = `https://rickandmortyapi.com/api/character/${id}`;
   const response = await fetch(url);
   const data = await response.json();
   return data;
 };
