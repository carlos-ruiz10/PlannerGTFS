//Componente App
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MapView from './components/MapView';
import Docs from "./components/Docs";
import Autores from "./components/Autores";
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='contenedor'>
      <BrowserRouter>

        <Navbar></Navbar>
        <Routes>

          <Route path='/' element={<MapView></MapView>}></Route>
          <Route path='/docs' element={<Docs></Docs>}></Route>
          <Route path='/autores' element={<Autores></Autores>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
