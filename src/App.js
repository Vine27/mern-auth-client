import React from 'react';
import Layout from './core/Layout.jsx';


const App = () => {
  return (
    <Layout>
      <div className= "col-md-6 offset-md-3 text-center">
        <h1 className='p-5'>React Node MongoDB Authentication Boilerplate</h1>
        <h2>MERN STACK</h2>
        <hr/>
        <p className="lead">
          MERN Stack is a Javascript Stack that is used for easier and faster deployment of full-stack web applications. 
          MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node.js. 
          
        </p>
       <h5>  MERN stack login register system with account activation, forgot password, reset password, login
                    with facebook and google as well as private and protected routes for authenticated user and users
                    with the role of admin.
                    </h5>
      </div>
    </Layout>
  )
}

export default App;
