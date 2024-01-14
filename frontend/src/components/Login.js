 import React from "react";
 export default class Login extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        email: '',
        password: '',
      }
      this.onChange = this.handleChange.bind(this)
      this.onSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e){
      const {name,value} = e.target;
      this.setState({[name]:value})
    }
    handleSubmit(e){
      e.preventDefault();
      this.props.login(this.state.email,this.state.password)
    }
    render(){
      return(
        <section className="authorization">
          <h2 className="authorization__title">Вход</h2>
          <form className="authorization__form" onSubmit={this.onSubmit}>
            <label className="authorization__form-input-label">
              <input type="email" className="authorization__form-input" onChange={this.onChange}  placeholder='Email' name="email" required minLength="2" maxLength="40"/>
            </label>
            <label className="authorization__form-input-label">
              <input placeholder='Пароль' className="authorization__form-input" type="password" onChange={this.onChange}  name="password" required minLength="2" maxLength="200"/>
            </label>
            <button className="authorization__button" type="submit">Войти</button>
          </form>
        </section>
      )
    }
 }