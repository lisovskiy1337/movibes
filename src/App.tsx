import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import {
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePage from './pages/MoviePage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path=':videoType/:id' element={<MoviePage />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
