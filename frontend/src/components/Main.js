import React, { useEffect } from "react";
import pencilImage from '../images/karandash.svg';
import addLogo from '../images/add.svg';
import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main(props){
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main>
      <section className="profile">
          <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar} style={{
            backgroundImage: `url(${currentUser.avatar})`
          }}>
          </button>
          <div className="profile__info">
              <div className="profile__row">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                      <img className="profile__logo" src={pencilImage} alt="Карандаш"/>
                  </button>
              </div>
              <p className="profile__hobby">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
              <img className="profile__add-logo" src={addLogo} alt="Крестик"/>
          </button>
      </section>
      <section className="elements">
        {props.cards.map((element)=>(
          <Card card={element} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={element._id}/>   
        ))}
      </section>
    </main>
  )
}
export default Main;