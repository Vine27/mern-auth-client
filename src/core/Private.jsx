import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, isAuth, signout, updateUser } from '../auth/Helpers';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const Private = ({history}) => {
    const [values, setValues] = useState({
        role: "",
        name: 'Vine',
        email: 'vine@gmail.com',
        password: '1234',
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile()
    }, []);


    const loadProfile = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('PROFILE UPDATE', response);
            const {role, name, email} = response.data
            setValues({...values, role, name, email})
        })
        .catch(error => {
            console.log("PROFILE UPDATE ERROR", error.response.data.error)
            if(error.response.status === 401){
                signout(() => {
                    history.push('/')
                })
            }
        })
    }

    const {role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                if (response && response.data && response.data.message) {
                    setValues({ ...values,  buttonText: 'Submitted' });
                    toast.success("PROFILE UPDATED SUCCESSFULLY");
                }else {
                    toast.error('An error occurred');
                }                   
                })
            })
            .catch(error => {
                console.log('PROFILE UPDATE ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('An error occurred');
                }
            });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input defaultValue={role} type="text" className="form-control" disabled/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input defaultValue={email} type="email" className="form-control" disabled/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
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
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {isAuth()? <Redirect to= "/" /> : null}
                <h1 className="p-5 text-center">Private</h1>
                <h4 className="p-5 text-center">Profile Update</h4>
                {updateForm()}
            </div>
        </Layout>
    );


    

};

export default Private;
