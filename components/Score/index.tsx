import * as React from 'react';
import './style.css';

export default function Score({ score }) {
  const levels = [
    { label: 'A', scoreMax: 20 },
    { label: 'B', scoreMax: 40 },
    { label: 'C', scoreMax: 60 },
    { label: 'D', scoreMax: 80 },
    { label: 'E', scoreMax: 100 },
    { label: 'F', scoreMax: 120 },
    { label: 'G', scoreMax: 1000 },
  ];

  return (
    <div className="jauge__container">
      {levels.map(({ label, scoreMax }) => (
        <div
          className={`jauge__item jauge__item--${label} ${
            score <= scoreMax && 'jauge__item--current'
          }`}
        >
          <div className="jauge__background">{label}</div>
        </div>
      ))}
    </div>
  );
}
