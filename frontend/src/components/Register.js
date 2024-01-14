import React from "react";
import { Link } from "react-router-dom";
function Register({registration}){
  const [formValue, setFormValue] = React.useState({
    email:'',
    password:'',
  })
  function handleChange(e){
    const {name,value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    registration(formValue.email,formValue.password)
  }
  return(
    <section className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form className="authorization__form"  onSubmit={handleSubmit}>
        <label className="authorization__form-input-label">
          <input type="email" className="authorization__form-input" onChange={handleChange} placeholder='Email' name="email" required minLength="2" maxLength="40"/>
        </label>
        <label className="authorization__form-input-label">
          <input placeholder='Пароль' className="authorization__form-input" onChange={handleChange} type="password" name="password" required minLength="2" maxLength="200"/>
        </label>
        <button className="authorization__button" type="submit">Зарегистрироваться</button>
        <p className="authorization__text">Уже зарегистрированы? {<Link className="authorization__text" to='/sign-in'>Войти</Link>}</p>
      </form>
    </section>
  )
}
export default Register;