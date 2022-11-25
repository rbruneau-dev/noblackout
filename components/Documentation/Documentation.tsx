import * as React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Documentation() {
  return (
    <div className="documentation__bg">
      <div className="container">
        <div className="documentation">
          <div className="documentation__item documentation__item--big">
            <div className="documentation__title">
              Qu'est-ce qu'un blackout ?
            </div>
            <p>
              Un <strong>blackout</strong> est un effondrement de la totalité du
              réseau électrique qui peut être la conséquence d’une pénurie
              s’étant aggravée ou d'un problème technique imprévu.​
            </p>
            <p>
              Lors d'un <strong>black-out</strong> il se peut donc que la
              demande d'électricité dépasse l'offre. On parle alors d'un{' '}
              <strong>déséquilibre</strong> entre production et consommation.​
            </p>
            <p>
              Ce déséquilibre est dangereux, car il pourrait entraîner
              l'effondrement du réseau d'électricité belge – et même européen.
              Il serait alors question d'un <strong>black-out</strong> - ce qui
              est le scénario du pire.
            </p>
          </div>
          <div className="documentation__item documentation__item--style documentation__item--box_dark">
            <p>
              <span>Production Maximum</span>
              <div>
                {` `}
                <span className="big primary">85</span>
                {` `}
                <span className="small primary">MegaWatt</span>
              </div>
            </p>
          </div>
          <Link
            to="quizz"
            className="documentation__item documentation__item--box_dark documentation__item--massive"
          >
            <div className="documentation__title">EcoQuizz</div>
            <p>
              Répondez à notre questionnaire afin d'obtenir des conseils
              vis-à-vis du BlackOut
            </p>
          </Link>

          <div>
            <div className="documentation__item documentation__item--box_primary documentation__item--style">
              <p>
                <div className="big">17%</div>
                <span className="small">gaz importé de Russie en 2021</span>
              </p>
            </div>
            <div className="documentation__item documentation__item--style">
              <p>
                <div className="big primary">52%</div>
                <span className="small primary">
                  du parc nucléaire français à l'arrêt
                </span>
              </p>
            </div>
          </div>
          <div className="documentation__item documentation__item--box_light documentation__item--big">
            <div className="documentation__title">Pourquoi cette année ?</div>
            <p>
              L’éventualité d’un blackout électrique inquiétait déjà les
              Français il y a six mois à peine.
            </p>
            <p>
              En décembre dernier, 17 réacteurs étaient à l’arrêt pour raison de
              maintenance. Mais le 28 mai dernier, ils étaient 29 en pause sur
              les 56 en exploitation.
            </p>
            <p>
              De plus, les fournitures de gaz par la Russie, totalement
              interrompues depuis le 15 juin dernier, font peser un risque sur
              la disponibilité des centrales au gaz.​
            </p>
            <p>
              De quoi nourrir des craintes réelles en matière de coupure de
              courant à l’approche de l’hiver prochain.
            </p>
          </div>
          <div className="documentation__item">
            <div className="documentation__title">
              Que se passe t-il si la production n'est pas suffisante ?
            </div>
            <p>
              Si la consommation des français s'approche trop de la capacité de
              production alors des coupures intermittentes seront mise en place
              afin d'équlibrer le réseau.
            </p>
          </div>
          <div className="documentation__item">
            <div className="documentation__title">
              Comment je peux soulager le réseau ?
            </div>
            <p>
              En deplaçant l'utilisation de certains appareils énergivore tel
              que le <strong>lave-vaiselle</strong>, le{' '}
              <strong>lave-linge</strong> et le <strong>sèche-linge</strong>
            </p>
          </div>
          <Link
            to="/duel"
            className="documentation__item documentation__item--box_dark"
          >
            <div className="documentation__title">Simulation</div>
            <p>
              Notre outil pour simuler la consommation éléctrique de vos
              appareils et l'énergie necessaire si chaque Français se comporte
              comme vous
            </p>
          </Link>
          <Link
            to="/duel"
            className="documentation__item documentation__item--box_dark"
          >
            <div className="documentation__title">Duel</div>
            <p>
              Saurez-vous estimer la consommation de vos appareils éléctriques ?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
