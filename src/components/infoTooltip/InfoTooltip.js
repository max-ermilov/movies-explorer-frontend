import React from 'react';
import './InfoTooltip.css';
import errorImg from '../../images/error.svg';

function InfoTooltip({isOpen, onClose, status}) {
// const isOpen = true
  const closeClickOverlay = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose()
    }
  }

  React.useEffect(() => {
    const closeClickEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener('keyup', closeClickEsc);
    return () => {
      document.removeEventListener('keyup', closeClickEsc);
    }
  }, []);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={closeClickOverlay}>
      <div className="popup__container">
        <img className="popup__image" src={errorImg} alt=""/>
        <p className="popup__text">
          {status}
        </p>
        <button className="button popup__close-button" type="button" onClick={onClose}
                aria-label="Закрыть информационное сообщение"></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
