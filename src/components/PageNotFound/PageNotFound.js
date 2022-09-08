import React from 'react';
import { useHistory } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__description">Страница не найдена</p>
      <button className="button page-not-found__back-button"
              onClick={
        () => history.goBack()
      }
              type="button">Назад
      </button>
    </section>
  )
}

export default PageNotFound;
