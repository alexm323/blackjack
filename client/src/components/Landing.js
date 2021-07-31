import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const styles = {
    landing: {
        minHeight: '100vh',
        backgroundColor: `rgba(9, 7, 11, 1)`,
        display: `flex`,
        flexDirection: `row`
    },
    smallDiv:{
        width: `30%`,
        border: `solid 1px white`
    },
    largeDiv:{
        width: `70%`
    }
}

const Landing = () => {
    return (
        <div style={styles.landing}>
            <div style={styles.largeDiv}>
                <h1>Welcome to MintJack!</h1>
            <Link to='/signup'>
                <button>Sign up and play!</button>
            </Link>
            </div>
            <div style={styles.smallDiv}>
                <h2>hey</h2>
            </div>
        </div>
    )
}



export default Landing