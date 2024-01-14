import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({isOpened,onClose,onUpdateAvatar}){
  const inputRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  } 

  return(
    <PopupWithForm title='Обновить аватар' name='avatar' isOpened={isOpened} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <label className="popup__form-input">
          <input ref={inputRef} className="popup__text popup__text_avatar" id='avatar-url-input' placeholder='Ссылка на картинку' type="url" name="avatar-link" required/>
          <span className="avatar-url-input-error popup__form-input-error">Необходимо заполнить это поле</span>
      </label> 
    </PopupWithForm>
  )
}
export default EditAvatarPopup