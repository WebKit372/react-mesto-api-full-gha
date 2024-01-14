import React from "react";
import logo from '../images/Vector.svg';
import { Link,useLocation } from "react-router-dom";
function Header(props){
  const location = useLocation()
  const [link,setLink] = React.useState(window.location.pathname)
  React.useEffect(()=>{
    setLink(location.pathname === "/sign-up" ? "/sign-in" : "/sign-up" )
  },[location.pathname])
  return (
    <header className="header">
      <img className='header__logo' src={logo} alt="Логотип"/>
      {location.pathname ==='/' ? 
      <div className="header__email-block">
        <p className="header__text">{props.email}</p>
        <p className="header__text header__text_link" onClick={props.logOut}>Выйти</p>
      </div>:
      <Link className="header__text header__text_link" to={link}>
        {location.pathname === '/sign-up'? "Войти" : "Регистрация"}
      </Link>}
    </header>
  )
}
export default Header;