import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const Reset = ({match}) => {
    const [values, setValues] = useState({

        name: '',
        token: "",
        newPassword: "",
        buttonText: 'Reset rassword'
    });

    useEffect(() => {
        let token = match.params.token;
        if(token){
            setValues({...values, token})
        }
    }, [])
    const { name, token, newPassword, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {resetPasswordLink: token, newPassword}
        })
            .then(response => {
                console.log('RESET PASSWORD SUCCESS', response);
                 console.log('Response data', response.data);
                    toast.success(response.data.message);
                    setValues({...values, buttonText: "DONE"})
                            
            })

          .catch(error => {
                console.log('RESET PASSWORD ERROR', error.response.data);
                
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                    setValues({ ...values, buttonText: 'Reset password' });
                } else {
                    toast.error('An error occurred');
                }
            });
    };

    const passwordResetForm = () => (
        <form>
 

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange} value={newPassword} type="password" className="form-control" placeholder = "...type new password..." required/>
            </div>

            <div>
              <br/>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
           {/* {JSON.stringify(isAuth())} */}
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Hey, {name}, Type new Password</h1>
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default Reset;