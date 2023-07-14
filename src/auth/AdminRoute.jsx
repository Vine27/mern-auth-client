import React from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { isAuth } from './Helpers';


const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={
        props => isAuth() && isAuth().role === "admin" ?  <Component {...props} /> : <Redirect to ={{
            pathname: '/signin',
            state: {from:props.location}
        }} />
    }>

    </Route>
  
  )
}

export default AdminRoute;
