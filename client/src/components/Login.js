import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import FormField from './FormField';
import Button from './Button';


const Login = () => {

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
        email: '',
        password: '',
        })


    function updateValue(e){
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        loginToAccount()
    }

    const loginToAccount = () => {
        console.log('hey')
        axios.post('http://localhost:3000/post/login', values)
        .then((res) => {
        console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
                console.log(loggedInUserContext)
            }
        })
    }


if(loggedInUserContext){
    
    return(
            
        <Redirect to='/table' />

    )

} else{

    return (
        <div >
            <form
                onSubmit={handleSubmitFile}
            >
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
                    for='password'
                    label='Password'
                    inputClass=''
                    inputType='password'
                    inputId='password'
                    inputName='password'
                    value={values.password}
                    onChange={(e) => updateValue(e)}
                />
                <Button 
                    buttonDivCLass=''
                    buttonClass=''
                    buttonText='Login'
                />
            </form>
        </div>  
        )
}

}

export default Login