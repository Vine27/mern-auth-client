import React from 'react';
import cookie from "js-cookie";

//set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            expires: 1
        })
        
    }
}
//remove from cookie
export const removeCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.remove(key, value, {
            expires: 1
        })
        
    }
}
//get in cookie
export const getCookie = (key, value) => {
    if(window !== 'undefined'){
        return cookie.get(key);
    }
}
//set in localStorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
      localStorage.setItem(key, JSON.stringify(value));
        
    }
}
//remove in localStorage
export const removeLocalStorage = (key, value) => {
    if(window !== 'undefined'){
      localStorage.removeItem(key);
        
    }
}

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next();
};

//access user info from localstorage
export const isAuth = () => {
  if(window !== 'undefined'){
    const cookieChecked = getCookie('token')
    if(cookieChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem("user"))
      }else{
        return false;
      }      
    }

  }
}

export const signout = next => {
  removeCookie('token');
  removeLocalStorage("user");
  next();
}

export const updateUser = (res, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", res);
  if(typeof window !== 'undefined'){
    let auth = JSON.parse(localStorage.getItem('user'))
    auth = res.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
}


const Helpers = () => {
  return (
    <div>
      
    </div>
  )
}

export default Helpers
