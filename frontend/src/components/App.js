import '../index.css';
import Header from './Header';
import React from 'react';
import Main from './Main';
import { Route,Routes, useNavigate} from 'react-router-dom';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import apiInfo from '../utils/Api';
import CurrentUserContext from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import Authorization from '../utils/Auth';
import InfoToolTip from './InfoToolTip';
function App() {
    const navigate = useNavigate()
    const[email,setEmail] = React.useState('')
    const[cards,setCards] = React.useState([]);
    const[loggedIn,setLoggedIn] = React.useState(false)
    const[currentUser,setcurrentUser] = React.useState({
        name:'',
        description:''
    })
    const[isEditProfilePopupOpen,setIsEditProfilePopupOpen] = React.useState(false);
    const[isAddPlacePopupOpen,setIsAddPlacePopupOpen] = React.useState(false);
    const[isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = React.useState(false);
    const[isImagePopupOpen,setIsImagePopupOpen] = React.useState(false);
    const[infoToolTipInfo,setInfoToolTipInfo] = React.useState({
        isOpened:false,
        isSuccessed:false,
    });
    const[selectedCard,setSelectedCard] = React.useState({});

    React.useEffect(()=>{
        if(loggedIn){
            Promise.all([apiInfo.getProfileInfo(),apiInfo.getInitialCards()])
            .then((result)=>{
                setcurrentUser(result[0])
                setCards(result[1])
            })
            .catch(err=>console.log(err))
        }
    },[loggedIn])

    React.useEffect(()=>{
        tokenCheck()
    },[])

    function authorize(){
        setLoggedIn(true)
    }

    function updateHeaderEmail(email){
        setEmail(email)
    }

    const closeAllPopups = () =>{
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsImagePopupOpen(false)
        setInfoToolTipInfo({
            ...infoToolTipInfo,
            isOpened:false
        })
    }

    function handleEditAvatarClick(){
        setIsEditAvatarPopupOpen(true)
      }

    function handleCardClick(card){
        setIsImagePopupOpen(true)
        setSelectedCard(card)
    }

    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(true)
      }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true)
      }

    function handleCardDelete(card){
        apiInfo.deleteCard(card._id)
        .then(()=>{
            setCards((state)=> state.filter(i => i._id !== card._id))
        })
        .catch(err=> console.log(err))
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        console.log(isLiked);
        console.log(currentUser._id);
        apiInfo.changeLike(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err=>console.log(err));
    } 

    function handleUpdateUser(userInfo){
        apiInfo.updateProfileInfo({
            name: userInfo.name,
            hobby: userInfo.about
        })
        .then(result=> {
            setcurrentUser(result)
            closeAllPopups()
        })
        .catch(err=> console.log(err))
    }

    function handleUpdateAvatar(avatarInfo){
        apiInfo.updateProfileAvatar(avatarInfo.avatar)
        .then(result =>{
            setcurrentUser(result)
            closeAllPopups()
        })
        .catch(err=> console.log(err))
    }

    function handleAddCard(cardInfo){
        apiInfo.addCard({
            name:cardInfo.cardName,
            link:cardInfo.cardURL
        })
        .then(result=>{
            setCards([result,...cards])
            closeAllPopups()
        })
        .catch(err=>console.log(err))
    }

    function registration(email,password){
        Authorization.register(email,password)
        .then(res=>{
            navigate('/sign-in',{replace: true})
            setInfoToolTipInfo({
                ...infoToolTipInfo,
                isOpened: true,
                isSuccessed: true,
            })
        })
        .catch(err=>{
            setInfoToolTipInfo({
                isOpened: true,
                isSuccessed: false,
            })
            console.log(err)})
    }

    function login(email,password){
        Authorization.login(email,password)
        .then(res=>{
            if(res._id){
                authorize()
                navigate('/',{replace:true})
                updateHeaderEmail(email)
                localStorage.setItem('token',res._id)
            }
        })
        .catch(err =>{
            console.log(err)
            setInfoToolTipInfo({
                isOpened: true,
                isSuccessed: false,
            })
        })
    }

    function tokenCheck(){
        if(localStorage.getItem('token')){
            Authorization.loginViaToken()
            .then(res=>{
                setLoggedIn(true);
                setEmail(res.email);
                navigate('/',{replace:true});
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    function logOut(){
        localStorage.removeItem('token');
        navigate('/sign-in',{replace:true})
    }
  return (  
    <CurrentUserContext.Provider value = {currentUser}>
    <div className = 'root'>
        <div className="page">
            <Header email={email} logOut={logOut}/>
            <Routes>
                <Route path="/" 
                element={               
                <ProtectedRouteElement
                    element={Main}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards = {cards}
                    onCardDelete = {handleCardDelete}
                    loggedIn={loggedIn}
                    />
                }
                    />
                <Route path="*" element={
                    <ProtectedRouteElement
                    element={Main}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards = {cards}
                    onCardDelete = {handleCardDelete}
                    loggedIn={loggedIn}
                    />
                }/>
                <Route path='/sign-up' element={<Register registration={registration}/>}/>
                <Route path='/sign-in' element={<Login login={login}/>}/>
            </Routes>
            {window.location.pathname ==='/' && <Footer/>}
            <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
            <ImagePopup card={selectedCard} isOpened={isImagePopupOpen} onClose={closeAllPopups}/>
            <PopupWithForm title='Вы уверены?' name='del'/>
            <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
            <InfoToolTip onClose={closeAllPopups} isOpened={infoToolTipInfo.isOpened} isSuccessed={infoToolTipInfo.isSuccessed}/>
        </div>
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
