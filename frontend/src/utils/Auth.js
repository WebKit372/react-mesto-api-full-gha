import { authentificationOptions } from "./constants";
class Authentification{
  constructor(options){
    this.URL = options.URL;
  }
  _getJSON(res){
    if(res.ok){
        return res.json()
    }
    else{
        return Promise.reject(res.status)
    }
  }
  login(email,password){
    return fetch(`${this.URL}/signin`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        "password":password,
        "email":email
      }),
      credentials: 'include',
    })
    .then(res=> this._getJSON(res))
  }
  register(email,password){
    return fetch(`${this.URL}/signup`,{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        "password":password,
        "email":email
      })
    })
    .then(res=> this._getJSON(res))
  }
  loginViaToken(JWT){
    return fetch(`${this.URL}/users/me`,{
      // headers:{
      //   "Content-Type" : "application/json",
      //   "Authorization": `Bearer ${JWT}`
      // },
      credentials: 'include',
    })
    .then(res=> this._getJSON(res))
  }
}
const Authorization = new Authentification(authentificationOptions);
export default Authorization;
