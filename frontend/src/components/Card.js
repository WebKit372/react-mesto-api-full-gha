import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";
function Card({card,onCardClick,onCardLike,onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `elements__button ${isLiked && 'elements__button_active'}`;
  function handleCardDelete(){
    onCardDelete(card)
  }
  function handleLikeClick(){
    onCardLike(card)
  }
  function handleClick(){
    onCardClick(card);
  }
  return (
    <div className="elements__element">
      <button className="elements__image-button" onClick={handleClick}>
        <div className="elements__image" style={{
          backgroundImage: `url(${card.link})`
        }}/>
      </button>
      <div className="elements__description">
          <h2 className="elements__text">{card.name}</h2>
          <div className="elements__like-block">
              <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
              </button>
              <p className="elements__likes-count">{card.likes.length}</p>
          </div>
      </div>
      {isOwn &&
      <button className="elements__trash" type="button" onClick={handleCardDelete}>
      </button>
      }
    </div> 
  )
}
export default Card;