import * as React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Naviguation = () => {
  const location = useLocation();
  console.log(location);

  return (
    <nav className="nav">
      <ul className="nav__container">
        <li className={`nav__item`}>
          <Link to="/quizz">Ecoquizz</Link>
        </li>
        <li className={`nav__item`}>
          <Link to="/simulation">Simulation</Link>
        </li>
        <li className={`nav__item`}>
          <Link to="/duel">Duel</Link>
        </li>
        <li className={`nav__item`}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Naviguation;
