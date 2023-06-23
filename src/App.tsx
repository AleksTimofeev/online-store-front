import React from 'react';
import './app.css';
import {NavLink, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1>ONLINE-STORE</h1>
      <Routes>
        <Route path={''} element={<h2>Home page</h2>} />
      </Routes>
    </div>
  );
}

export default App;
