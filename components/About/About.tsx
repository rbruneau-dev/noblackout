import * as React from 'react';
import './style.css';

export default function About() {
  return (
    <div className="documentation__bg">
      <div className="container">
        <div className="documentation">
          <div className="documentation__item documentation__item--big">
            <div className="documentation__title">NoBlackout, kesako ?</div>
            <p>
              C'est une application de sensibilisation pour réduire la
              consommation d'énergie à fin d'éviter le <strong>Blackout</strong>
              .
            </p>
            <p>
              <strong>NoBlackout</strong> est développée par :
            </p>
            <div className="images_wrap">
              <div className="photo rudy"></div>
              <div className="photo seif"></div>
              <div className="photo samir"></div>
              <div className="photo ianis"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
