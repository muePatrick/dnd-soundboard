import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import './App.css';
import Board from './soundboard/Board';
import Settings from './settings/Settings';


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Soundboard</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Board />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
