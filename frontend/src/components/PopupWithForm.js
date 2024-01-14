import React from "react";
import CloseIcon from '../images/CloseIcon.svg'
class PopupWithForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      name: ''
    }
  }
  render(){  
    return (
      <section className={`popup popup_${this.props.name} ${this.props.isOpened && 'popup_active'}`}>
          <div className="popup__page">
              <h2 className={`popup__edit-title popup__edit-title_${this.props.name}`}>{this.props.title}</h2>
              <form className={`popup__form popup__form_${this.props.name}`} name={`popup-form-${this.props.name}`} onSubmit={this.props.onSubmit}>
                  {this.props.children}
                  <button type='submit' className="popup__save">
                      {this.props.buttonText}
                  </button>
              </form>
              <button className={`popup__close popup__close_${this.props.name}`} type="button">
              <img className="popup__close-icon" src={CloseIcon} alt="Закрыть" onClick={this.props.onClose}/>
              </button>
          </div>
      </section>
    )
  }
}
export default PopupWithForm;