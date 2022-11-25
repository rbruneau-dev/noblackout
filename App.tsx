import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Duel from './components/Duel/Duel';
import Simulation from './components/Simulation/Simulation';
import Quizz from './components/Quizz';
import Documentation from './components/Documentation/Documentation';
import Ad from './components/Ad/Ad';
import About from './components/About/About';
import Naviguation from './Nav';
import './style.css';

export default function App() {
  return (
    <React.Fragment>
      <Router basename="/">
        <header className="header">
          <Link to="/" className="header__logo">
            <div className="header__logo__inner">NoBlackout</div>
          </Link>
          <Naviguation />
        </header>
        <Routes>
          <Route exact path="/" element={<Documentation />}></Route>
          <Route exact path="/simulation" element={<Simulation />}></Route>
          <Route exact path="/duel" element={<Duel />}></Route>
          <Route exact path="/quizz" element={<Quizz />}></Route>
          <Route exact path="/about" element={<About />}></Route>
        </Routes>
      </Router>
      <Ad troll />
    </React.Fragment>
  );
}
