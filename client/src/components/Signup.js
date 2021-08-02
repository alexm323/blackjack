import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import FormField from './FormField';
import Button from './Button';

const styles ={
    hero:{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `100%`,
        padding: '1.777rem'
    },
    landing: {
        backgroundColor: `rgba(242,240,231, 1)`,
        display: `flex`,
        flexDirection: `row`,
        flexFlow: 'row wrap',
    },
    marginTop: {
        marginTop: '1.777rem'
    },
    form:{
        backgroundColor: `aliceblue`,
        width: `70%`,
        padding: '4.209rem',
        borderRadius: '1rem',
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
            <div style={styles.landing}>
                <div style={styles.hero}>
                    <form   style={styles.form}
                            onSubmit={handleSubmitFile}
                    >
                        <div style={styles.marginTop}>
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
                        </div>
                        <div style={styles.marginTop}>
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
                        </div>
                        <div style={styles.marginTop}>
                            
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
                        </div>
                        <div style={styles.marginTop}>
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
                        </div>
                        <div style={styles.marginTop}>    
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
                        </div>
                        <div style={styles.marginTop}>
                        <button type='submit' className='navBtns'>
                            Sign up!
                        </button>
                    </div>
                    </form>
                </div>
            </div>  
            )
        }
}
export default Signup