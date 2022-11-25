import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

import { appareils } from '../shared/data.json';

const generateRandomNumber = (min, max, step = 1) => {
  return (
    Math.floor(Math.floor(min + Math.random() * (max - min)) / step) * step
  );
};

const formatTime = (mins) => {
  if (mins >= 60) {
    return `${Math.floor(mins / 60)}h${Math.floor(mins % 60)
      .toString()
      .padStart(2, '0')}`;
  }

  return `${mins}mins`;
};

export default function Duel() {
  const contenders = appareils.filter((a) => !a.excludeFromDuel);

  const [answers, setAnswers] = useState([]);

  const [alpha, setAlpha] = useState();
  const [beta, setBeta] = useState();
  const [choice, setChoice] = useState();

  const validateChoice = (id) => {
    setChoice(id);

    const answer = alpha?.appareil.id === id ? alpha : beta;
    const otherAnswer = alpha?.appareil.id !== id ? alpha : beta;

    setAnswers((prev) => [...prev, answer?.power > otherAnswer?.power]);
  };

  const answer = alpha?.appareil.id === choice ? alpha : beta;
  const otherAnswer = alpha?.appareil.id !== choice ? alpha : beta;
  const isRightAnswer = answer?.power > otherAnswer?.power;

  const getRandomElement = (list) =>
    list[Math.floor(Math.random() * list.length)];

  const getRandomAppareil = (list) => {
    return {
      quantity: 1,
      appareil: getRandomElement(list),
      duration: 0,
      power: () => this.quantity * this.appareil.powerWatt * this.duration,
    };
  };

  const withUsage = (item) => {
    const itemWithUsage = item;

    itemWithUsage.duration = generateRandomNumber(15, 90, 15);

    if (itemWithUsage.appareil.multiple) {
      itemWithUsage.quantity = generateRandomNumber(2, 10);
    }

    if (
      !itemWithUsage.appareil.multiple &&
      itemWithUsage.appareil.powerWatt < 200
    ) {
      itemWithUsage.duration *= 3;
    }

    if (
      !itemWithUsage.appareil.multiple &&
      itemWithUsage.appareil.powerWatt < 100
    ) {
      itemWithUsage.duration *= 2;
    }

    itemWithUsage.power =
      (itemWithUsage.quantity *
        itemWithUsage.appareil.powerWatt *
        itemWithUsage.duration) /
      60;

    return itemWithUsage;
  };

  const initDuel = () => {
    const randomAppareilAlpha = getRandomAppareil(contenders);
    const randomAppareilBeta = getRandomAppareil(
      contenders.filter((a) => a.id !== randomAppareilAlpha.appareil.id)
    );

    let randomAppareilAlphaWithUsage = withUsage(randomAppareilAlpha);
    let randomAppareilBetaWithUsage = withUsage(randomAppareilBeta);

    let i = 0;
    while (
      i < 100 &&
      (randomAppareilAlphaWithUsage.power / randomAppareilBetaWithUsage.power >
        2 ||
        randomAppareilBetaWithUsage.power / randomAppareilAlphaWithUsage.power >
          2 ||
        randomAppareilBetaWithUsage.power /
          randomAppareilAlphaWithUsage.power ==
          1)
    ) {
      randomAppareilAlphaWithUsage = withUsage(randomAppareilAlpha);
      randomAppareilBetaWithUsage = withUsage(randomAppareilBeta);

      i++;
    }

    setChoice(null);
    setAlpha(randomAppareilAlphaWithUsage);
    setBeta(randomAppareilBetaWithUsage);
  };

  useEffect(() => {
    initDuel();
  }, []);

  const displayItem = (item) => {
    return (
      <div
        className="duel__item"
        onClick={() => validateChoice(item.appareil.id)}
      >
        <div>{`${item?.quantity} ${item?.appareil.name}`}</div>
        <div>{`pendant ${formatTime(item?.duration)}`}</div>
      </div>
    );
  };

  const displayItemCompute = (item) => {
    return (
      <div>
        {`${item?.quantity} ${item?.appareil.name}`}{' '}
        {`x ${item?.duration} mins`} = {item?.power} wh
      </div>
    );
  };

  return (
    <div className="duel__container">
      <div className="duel__title">Qui consomme le plus d'énergie&nbsp;?</div>
      <div className="duel__vs">VS</div>
      <div className="duel__quizz">
        <div className="duel__items">
          {alpha && displayItem(alpha)}
          {beta && displayItem(beta)}
        </div>
        {choice !== null && (
          <div
            onClick={() => initDuel()}
            className={`duel__choice ${
              isRightAnswer ? `duel__choice--right` : `duel__choice--wrong`
            }`}
          >
            <div className="duel__choice__content">
              {isRightAnswer ? 'Bravo' : 'Dommage'}
            </div>
            <div className="duel__choice__explaination">
              {displayItemCompute(answer)}
              {displayItemCompute(otherAnswer)}
            </div>
            <div className="duel__choice__button">Duel suivant</div>
          </div>
        )}
      </div>
      <div className="duel__stats">
        <div className="duel__score">
          {answers.filter((a) => a).length} / {answers.length}
        </div>
        <div className="duel__history__items">
          {answers.map((answer) => (
            <div
              className={`duel__history__item ${
                answer
                  ? 'duel__history__item--right'
                  : 'duel__history__item--wrong'
              }`}
            ></div>
          ))}
          <div className={`duel__history__item `}></div>
        </div>
      </div>
    </div>
  );
}
