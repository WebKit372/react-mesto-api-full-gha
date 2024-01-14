import { Navigate } from "react-router-dom";
import React from "react";
function ProtectedRouteElement({element: Component, ...props}){
  return(
    <div>
    {props.loggedIn && <Component {...props}/>}
    {props.loggedIn === false &&<Navigate to='/sign-in' replace/>}
    </div>
  )
}
export default ProtectedRouteElement;