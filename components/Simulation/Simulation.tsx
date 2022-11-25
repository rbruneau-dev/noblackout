import * as React from 'react';
import { useState } from 'react';
import './style.css';

import { appareils } from '../shared/data.json';

const DAY_TIME_START = 9;
const DAY_TIME_END = 24;
const RATIO_HOUSE = 0.8;

const PRODUCTION_MEGA_WATT = 85_000;
const NUMBER_OF_HOUSES = 33_000_000;
const MAX_USAGE_PER_HOUSE =
  (85_000 * 1_000_000) / NUMBER_OF_HOUSES / RATIO_HOUSE;

export default function Simulation() {
  const [usages, setUsages] = useState(
    appareils.map((appareil) => ({
      ...appareil,
      quantity: appareil.defaultQuantity ?? 0,
    }))
  );

  const modifyUsage = (id, action) => {
    setUsages((prevUsages) => {
      const newUsages = [...prevUsages];
      const index = newUsages.findIndex((u) => u.id === id);
      const quantityStep = newUsages[index].quantityStep ?? 1;

      if (action === 'decrease' && newUsages[index].quantity > 0) {
        newUsages[index].quantity -= quantityStep;
      }

      if (action === 'increase') {
        newUsages[index].quantity += quantityStep;
      }

      return newUsages;
    });
  };

  // Stats
  const currentUsage = usages.reduce(
    (total, usage) => usage.powerWatt * usage.quantity + total,
    0
  );

  const usageForEveryHouse = currentUsage * NUMBER_OF_HOUSES;
  const usageForEveryHouseMegaWatt =
    (usageForEveryHouse / 1_000_000) * RATIO_HOUSE;

  const deltaUsage =
    ((usageForEveryHouseMegaWatt - PRODUCTION_MEGA_WATT) * 1_000_000) /
    NUMBER_OF_HOUSES;

  const ratioUsage = (currentUsage / MAX_USAGE_PER_HOUSE) * 100;
  const currentHour = new Date().getHours();
  const isDayTime = currentHour > DAY_TIME_START && currentHour < DAY_TIME_END;

  return (
    <div className="container">
      <div className="me__usages__container">
        {usageForEveryHouseMegaWatt > PRODUCTION_MEGA_WATT && (
          <div className="me__usage_blackout">
            <div className="me__usage_blackout__title">Blackout</div>
            <div>
              Essayez de diminuer votre consommation de
              {` `}
              {Number(deltaUsage).toFixed(0)}W
            </div>
          </div>
        )}
        <div className="title">Simulateur</div>
        <div className="subtitle">Si 2/3 des foyers consomment comme vous</div>
        <div className="me__usages__summary">
          <div
            className="me__usages__summary__progress"
            style={{
              width: ratioUsage + '%',
            }}
          />
          <div className="me__usages__summary__item">
            🧑 Ma consommation {currentUsage} w
          </div>
          <div className="me__usages__summary__item">
            ⚡ {usageForEveryHouseMegaWatt.toFixed()} Mw /{' '}
            {PRODUCTION_MEGA_WATT} Mw
          </div>
        </div>
        <div className="me__usages">
          {usages.map((usage) => (
            <div
              className={`me__usage ${usage.quantity > 0 && `me__usage--on`} 
            ${usage.preferNight && `me__usage--prefer_night`}
            ${
              usage.quantity > 0 &&
              isDayTime &&
              usage.preferNight &&
              `me__usage--wrong`
            }`}
            >
              <div className="me__usage__quantity">
                <span
                  className="me__usage__quantity__minus"
                  onClick={() => modifyUsage(usage.id, 'decrease')}
                >
                  -
                </span>
                <span className="me__usage__quantity__value">
                  {usage.quantity} {usage.unit}
                </span>
                <span
                  className="me__usage__quantity__plus"
                  onClick={() => modifyUsage(usage.id, 'increase')}
                >
                  +
                </span>
              </div>
              <span className="me__usage__name">{usage.name}</span>
              <span className="me__usage__power">{usage.powerWatt}W</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
