import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({isOpened,onClose,onAddCard}){
  const nameRef = React.useRef();
  const urlRef = React.useRef();
  function handleAddPlaceSubmit(e){
    e.preventDefault();
    onAddCard({
      cardName : nameRef.current.value,
      cardURL : urlRef.current.value,
    })
  }
  React.useEffect(()=>{
    setTimeout(()=>{
      nameRef.current.value = '';
      urlRef.current.value='';
    },500)
  },[isOpened])
  return(
    <PopupWithForm title='Новое место' name='add' isOpened={isOpened} onClose={onClose} onSubmit={handleAddPlaceSubmit} buttonText='Добавить'>
      <label className="popup__form-input">
          <input ref={nameRef} type="text" id="pic-name-input" className="popup__text popup__text_add popup__text_pic-name" placeholder='Название' name="name"  required minLength="2" maxLength="30"/>
          <span className="pic-name-input-error popup__form-input-error">Необходимо заполнить это поле</span>
      </label>
      <label className="popup__form-input">
          <input ref={urlRef} id ="url-input" className="popup__text popup__text_add popup__text_pic" placeholder='Ссылка на картинку' type="url" name="link" required/>
          <span className="url-input-error popup__form-input-error">Необходимо заполнить это поле</span>
      </label>        
    </PopupWithForm>
  )
}
export default AddPlacePopup;