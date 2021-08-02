import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import FormField from './FormField';
import Button from './Button';

const styles = {
    signupDiv: {
        minHeight: '100vh',
        backgroundColor: 'rgb(9, 7, 11)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupForm: {
        backgroundColor: 'rgb(242, 240, 231)',
    }
}
const Signup = () => {

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)
    
    // checks for logged in user and redirects to table if it finds one
    useEffect(()=>{
        axios.get('http://localhost:3000/loggedInUser')
        .then(res => {
            console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
            }
        })
    }, [])
    
    const [values, setValues] = useState({
    userName: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
    })

    function updateValue(e){
        const {name, value} = e.target
        setValues({
        ...values,
        [name]: value
        })
    }
    const handleSubmitFile = (e) =>{
        e.preventDefault()
        createAccount()
        // setUploading(true)
    }   

    const createAccount = () => {

        axios.post('http://localhost:3000/post/signup', values)
            .then(({data}) => {
            console.log(data)
            setLoggedInUserContext(true)
        })
    }

    console.log(loggedInUserContext)
    if(loggedInUserContext){
        return(
                
        <Redirect to='/table' />
            
        )
    } else if(!loggedInUserContext){

        return(
            <div style={styles.signupDiv}>
                    <form   style={styles.signupForm}
                            onSubmit={handleSubmitFile}
                    >
                        <FormField
                            for='userName'
                            label='User Name'
                            inputClass=''
                            inputType='text'
                            inputId='userName'
                            inputName='userName'
                            value={values.username}
                            onChange={(e) => updateValue(e)} 
                        />
                        <FormField
                            for='email'
                            label='Email'
                            inputClass=''
                            inputType='email'
                            inputId='email'
                            inputName='email'
                            value={values.email}
                            onChange={(e) => updateValue(e)}
                        />
                        <FormField
                            for='country'
                            label='Country'
                            inputClass=''
                            inputType='country'
                            inputId='country'
                            inputName='country'
                            value={values.country}
                            onChange={(e) => updateValue(e)}
                        />
                        <FormField
                            for='password'
                            label='Password'
                            inputClass=''
                            inputType='password'
                            inputId='password'
                            inputName='password'
                            value={values.password}
                            onChange={(e) => updateValue(e)}
                        />
                        <FormField
                            for='confirmPassword'
                            label='Confirm Password'
                            inputClass=''
                            inputType='password'
                            inputId='confirmPassword'
                            inputName='confirmPassword'
                            value={values.confirmPassword}
                            onChange={(e) => updateValue(e)}
                        />
                        <Button 
                            buttonDivCLass=''
                            buttonClass=''
                            buttonText='Sign up!'
                        />
                    </form>
                </div>  
            )
        }
}
export default Signup