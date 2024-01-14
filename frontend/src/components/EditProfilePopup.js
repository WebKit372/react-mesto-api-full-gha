import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";
function EditProfilePopup({isOpened,onClose,onUpdateUser}){
  const currentUser = React.useContext(CurrentUserContext)
  const[name,setName] = React.useState('');
  const[description,setDescription] = React.useState('');
  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  React.useEffect(()=>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser,isOpened])

  return( 
  <PopupWithForm title='Редактировать профиль' name='edit' isOpened={isOpened} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
    <label className="popup__form-input">
        <input type="text" id='name-input' value={name} onChange={handleNameChange} className="popup__text popup__text_name" placeholder='' name="name" required minLength="2" maxLength="40"/>
        <span className="name-input-error popup__form-input-error">Необходимо заполнить это поле</span>
    </label>
    <label className="popup__form-input">
        <input className="popup__text popup__text_hobby" value={description ?? ''} onChange={handleDescriptionChange} id='hobby-input' placeholder='' type="text" name="hobby" required minLength="2" maxLength="200"/>
        <span className="hobby-input-error popup__form-input-error">Необходимо заполнить это поле</span>
    </label>
  </PopupWithForm>
  )
}
export default EditProfilePopup