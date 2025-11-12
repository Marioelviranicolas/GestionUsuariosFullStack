// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Register from './components/autentication/RegisterForm';



export default function App() {
  return (
    <BrowserRouter>
    <div>
      <Register/>
    </div>
    </BrowserRouter>
  );
}
