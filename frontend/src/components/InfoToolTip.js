import React from "react";
import Success from '../images/success.svg'
import Error from '../images/error.svg'
import CloseIcon from '../images/CloseIcon.svg'
export default function InfoToolTip(props){
  return(
    <section className={`popup popup_authorizate-info ${props.isOpened && 'popup_active'}`}>
      <div className="popup__page popup__page_popup_authorizate-info">
          <img className="popup__info-icon" alt="Успешно" src={props.isSuccessed ?
            Success :
            Error
           }/>
          <h2 className="popup__text popup__text_authorizate-info">{props.isSuccessed ?
           "Вы успешно зарегистрировались!" :
           "Что-то пошло не так! Попробуйте ещё раз."
           }</h2>
          <button className='popup__close popup__close_img' type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={CloseIcon} alt="Закрыть"/>
          </button>
      </div>
    </section>
  )
}