import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Button from './Button'

const styles = {
    landing: {
        minHeight: '100vh',
        backgroundColor: `rgba(242,240,231, 1)`,
        display: `flex`,
        flexDirection: `row`
    },
    smallDiv:{
        width: `30%`,
        border: `solid 1px white`
    },
    largeDiv:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `70%`
    },
    h1: {
        color:`rgba(9, 7, 11, 1)`,
    },
    buttonsDiv: {
        display: 'flex',
        flexDirection: 'row'
    }
}

const arrow = <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.25V4.75"></path>
</svg>


const Landing = () => {
    return (
        <div style={styles.landing}>
            <div style={styles.largeDiv}>
                <h1 style={styles.h1}>Welcome to MintJack!</h1>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <div style={styles.buttonsDiv}>
                <Link to='/'>
                    <Button 
                    buttonClass='padding'
                    buttonText='Rules'
                    svg={arrow}
                    />
                </Link>
                <Link to='/signup'>
                    <Button 
                    buttonClass='padding'
                    buttonText='Sign up!'
                    />
                </Link>
                <Link to='/login'>
                    <Button 
                    buttonClass='padding'
                    buttonText='Login'
                    />
                </Link>
            </div>
            </div>
            <div style={styles.smallDiv}>
                <h2>hey</h2>
            </div>
        </div>
    )
}



export default Landing