import * as React from 'react';
import './style.css';

export default function Ad({ troll }) {
  return (
    <div className="ad__container">
      {!!troll && (
        <div className="ad__content ad__content--troll">
          <img src="https://www.totalenergies.fr/typo3conf/ext/de_site_package/Resources/Public/Dist/Images/Logo/totalenergies--vertical.svg" />
          <p>
            Changer pour un fournisseur d'énergie écologique et qui agit contre
            le blackout
          </p>
          <a href="https://www.totalenergies.fr/" target="_blank">
            Découvrez les offres
          </a>
        </div>
      )}
      {!troll && (
        <div className="ad__content ad__content--center">
          <p>Vous souhaitez afficher votre pub ici ?</p>
          <a href="https://google.fr" target="_blank">
            Contactez-nous
          </a>
        </div>
      )}
    </div>
  );
}
