import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes de página
import HomePage from './pages/Home';
import CharacterPage from './pages/CharacterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
