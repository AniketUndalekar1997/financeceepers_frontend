import React from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './Components/Nav';
import Home from './pages/Home';
import FilePosts from './Components/FilePosts';
import InfinitePostLoader from './Components/InfinitePostLoader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<InfinitePostLoader />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
