import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/publicas/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Agrega tus rutas a futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
