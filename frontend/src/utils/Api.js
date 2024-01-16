import { apiOptions } from "./constants";
class Api {
    constructor(options) {
      this._URL = options.URL;
      this._token = options.token;
    //   this._callback = callback;
    }
    _getJSON(res){
        if(res.ok){
            return res.json() 
        }
        else{
            return Promise.reject(res.status)
        }
    }
    deleteCard(cardId){
      return fetch(`${this._URL}/cards/${cardId}`,{
        method:"DELETE",
        credentials: 'include',
        // headers:{
        //     authorization:this._token}
        })
        .then((res)=> {
          return this._getJSON(res)
      })
    }
    getMyInfo(){
        return fetch(this._URL,{
            // headers:{
            //     authorization:this._token
            // },
            credentials: 'include',
            })
        .then((res)=> {
            return this._getJSON(res)
        })
    }
    getInitialCards() {
      return fetch(`${this._URL}/cards`,{
        // headers:{
        //   authorization:this._token
        // },
        credentials: 'include',
      })
      .then((res)=>{
        return this._getJSON(res);
    })
    }
    getProfileInfo(){
        return fetch(`${this._URL}/users/me`,{
            // headers:{
            //     authorization:this._token
            // },
            credentials: 'include', 
        })
        .then((res)=>{
            return this._getJSON(res);
        })
    }
    updateProfileInfo(userInfo) {
        return fetch(`${this._URL}/users/me`,{
            method:'PATCH',
            headers:{
                // authorization:this._token,
                "Content-Type":'application/json'
            },
            credentials: 'include', 
            body:JSON.stringify({
                name:userInfo.name,
                about:userInfo.hobby
            })
        })
        .then(res=>{return this._getJSON(res)})
    }
    updateProfileAvatar(URL) {
      return fetch(`${this._URL}/users/me/avatar`,{
        method:'PATCH',
        headers:{
            // authorization:this._token,
            "Content-Type":'application/json'
        },
        credentials: 'include', 
        body:JSON.stringify({
          avatar:URL
        })
    })
    .then(res=>{return this._getJSON(res)})
    }
    addLike(cardId){
      return fetch(`${this._URL}/cards/${cardId}/likes`,{
        method: "PUT",
        credentials: 'include', 
        // headers:{
        //   authorization:this._token
        // }
      })
      .then((res)=>{
        return this._getJSON(res);
      })
    }
    deleteLike(cardId){
      return fetch(`${this._URL}/cards/${cardId}/likes`,{
        method: "DELETE",
        credentials: 'include', 
        // headers:{
        //   authorization:this._token
        // }
      })
      .then((res)=>{
        return this._getJSON(res);
    })
    }
    changeLike(cardId,isLiked){
      if(isLiked){
        return this.deleteLike(cardId)
      }
      else{
        return this.addLike(cardId)
      }
    }
    addCard(cardInfo){
        return fetch(`${this._URL}/cards`,{
            method: "POST",
            headers: {
                // authorization:this._token,
                "Content-type":"application/json"        
            },
            credentials: 'include', 
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
        .then(res=> {return this._getJSON(res)})
    }
    // другие методы работы с API
  }
const apiInfo = new Api(apiOptions)
export default apiInfo