import React, { useState } from 'react'
import axios from 'axios'
import {Redirect} from "react-router-dom";
import FormField from './FormField';
import Button from './Button';

const Signup = () => {
    const [values, setValues] = useState({
    userName: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
    })
    const [uploading, setUploading] = useState(false)
    const [redirect, setRedirect] = useState(false)

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
    setUploading(true)
}

const createAccount = () => {

        axios.post('http://localhost:3000/post/signup', values)
            .then(({data}) => {
            console.log('hello')
            console.log(data)
            setUploading(false)
            setRedirect(true)
        })
}
    if(!redirect){
        return(
            <div>
                <form   className=""
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
    }else if(uploading){
        return(
            <div>
                <h1>Creating user...</h1>
            </div>  
        )
    }else if(redirect){

        return(
            
            <Redirect to='/table' />
    
        )
    }
}
export default Signup

// const [values, setValues] = useState({
//     userName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
// })
// const [fileInputState, setFileInputState] = useState('')
// const [uploading, setUploading] = useState('')
// const [redirect, setRedirect] = useState(false)

// function updateValue(e){
//     const {name, value} = e.target
//     setValues({
//         ...values,
//         [name]: value
//     })
// }

// const handleFileInputChange = (e) => {
//     const file = e.target.files[0]
//     setFileInputState(file)
// }

// const handleSubmitFile = (e) => {
//     e.preventDefault()
//     if(!fileInputState) return
//     createAccount(fileInputState)
//     setUploading(true) 
// }

// const createAccount = async (file) => {
    
// const formData = await new FormData()
// formData.append('file', file)
// formData.append('userName', values.userName)
// formData.append('email', values.email)
// formData.append('password', values.password)
// formData.append('confirmPassword', values.confirmPassword)
// formData.append('instagram', values.instagram)
// formData.append('twitter', values.twitter)
// formData.append('soundcloud', values.soundcloud)


// console.log(file, values)


// axios.post('http://localhost:3000/post/signup', formData)
// .then(({data}) => {
//     console.log(data)
//     setUploading(false)
//     setRedirect(true)
//     })


// }
// if(!redirect){

//     return(

//         <div className="stream signupStream radius margin-bottom">

//             <div className="stream audioAndArt index radius">

//                 <h1 className="darkGrey margin-top2">Create an account</h1>

//                     <form   className="uploadForm"
//                             onSubmit={handleSubmitFile}
//                         >
//                         <PostField  
//                             for='userName'
//                             label='User Name'
//                             inputClass='padding-top padding-bottom'
//                             inputType='text'
//                             inputId='userName'
//                             inputName='userName'
//                             value={values.username}
//                             onChange={(e) => updateValue(e)}
                                 
//                         />
//                         <PostField  
//                             for='email'
//                             label='Email'
//                             inputClass='padding-top padding-bottom'
//                             inputType='email'
//                             inputId='email'
//                             inputName='email'
//                             value={values.email}
//                             onChange={(e) => updateValue(e)}
                                 
//                         />
//                         <div className="postField margin-top passwordField">
//                             <PasswordField  
//                                 for='password'
//                                 label='Password'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='password'
//                                 inputId='password'
//                                 inputName='password'
//                                 value={values.password}
//                                 onChange={(e) => updateValue(e)}
                                    
//                             />
//                             <PasswordField  
//                                 for='confirmPassword'
//                                 label='Confirm Password'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='password'
//                                 inputId='confirmPassword'
//                                 inputName='confirmPassword'
//                                 value={values.confirmPassword}
//                                 onChange={(e) => updateValue(e)}
                                    
//                             />
//                         </div>
//                         <PostField  
//                                 for='instagram'
//                                 label='Instagram'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='instagram'
//                                 inputId='instagram'
//                                 inputName='instagram'
//                                 value={values.instagram}
//                                 onChange={(e) => updateValue(e)}
                                    
//                         />
//                         <PostField  
//                                 for='twitter'
//                                 label='Twitter'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='twitter'
//                                 inputId='twitter'
//                                 inputName='twitter'
//                                 value={values.twitter}
//                                 onChange={(e) => updateValue(e)}
                                    
//                         />
//                         <PostField  
//                                 for='soundcloud'
//                                 label='Soundcloud'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='soundcloud'
//                                 inputId='soundcloud'
//                                 inputName='soundcloud'
//                                 value={values.soundcloud}
//                                 onChange={(e) => updateValue(e)}
                                    
//                         />
//                         <PostField  
//                                 for='cashAppLink'
//                                 label='Cash App Link'
//                                 inputClass='padding-top padding-bottom'
//                                 inputType='cashAppLink'
//                                 inputId='cashAppLink'
//                                 inputName='cashAppLink'
//                                 value={values.cashAppLink}
//                                 onChange={(e) => updateValue(e)}
                                    
//                         />
//                         <PostField  
//                                 for='profilePicture'
//                                 inputClass='chooseFile'
//                                 inputType='file'
//                                 inputId='profilePicture'
//                                 inputName='file'
//                                 onChange={handleFileInputChange}
//                         />
//                         <div class="postField margin-top2 margin-bottom2">
//                             <button type="submit" 
//                                     class="trackBtn padding-top padding-bottom" 
//                                     value="Upload">Sign Up
//                             </button>
//                         </div> 

//                     </form> 

//             </div>
//         </div>
 
//     )
// } else if(uploading){
//     return(
//         <div><h2>Creating profile...</h2></div>
//     )
// }
// else if(redirect){
//     return (
//         <Redirect to='/feed' />
//     )
// }