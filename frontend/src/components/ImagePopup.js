import React from "react"
import CloseIcon from '../images/CloseIcon.svg'
function ImagePopup(props){
  return(
    <section className={`popup popup_img ${props.isOpened && 'popup_active'}`}>
      <div className="popup__page popup__page_img">
          <img className="popup__card" alt={props.card.name} src={props.card.link}/>
          <h2 className="popup__text popup__text_img">{props.card.name}</h2>
          <button className='popup__close popup__close_img' type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={CloseIcon} alt="Закрыть"/>
          </button>
      </div>
    </section>
  )
}
export default ImagePopup;