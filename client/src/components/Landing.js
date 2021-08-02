import React, {useState, useEffect, useContext} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { HashLink as LinkHash } from 'react-router-hash-link';
import '../App.css'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'


const styles = {
    landing: {
        backgroundColor: `rgba(242,240,231, 1)`,
        display: `flex`,
        flexDirection: `row`,
        flexFlow: 'row wrap'
    },
    smallDiv:{
        width: `30%`,
    },
    largeDiv:{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: `70%`
    },
    hero:{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: `100%`
    },
    h1: {
        color:`rgba(9, 7, 11, 1)`,
    },
    buttonsDiv: {
        display: 'flex',
        flexDirection: 'row'
    },
    ul: {
        display: 'flex'
    },
    nav: {
        position: 'fixed',
        backgroundColor: `rgba(242,240,231, 1)`,
        padding: '1.777rem',
        width: '100%'
    },
    marginTop: {
        marginTop: '4rem'
    }
}

const arrow = <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.25V4.75"></path>
</svg>

const Landing = () => {

    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    useEffect(()=>{
        axios.get('http://localhost:3000/loggedInUser')
        .then(res => {
            console.log(res.data)
            if(Object.keys(res.data).length > 0){
                setLoggedInUserContext(true)
            }
        })
    }, [])

    const logout = () => {
            
                axios.get(`http://localhost:3000/logout`)
                .then(res => {
                    setLoggedInUserContext(false)
                  })
                .catch(() => console.log('failed to fetch from url'))
    }
    if(loggedInUserContext){
       return(
            <Redirect to='/table' />
        )
    } else {

        return (
            <div style={styles.landing}>
                <nav style={styles.nav}>
                    <ul style={styles.ul}>
                        <li>
                            <Link to='/signup'>
                                <a href='/signup'>Create Account</a>
                            </Link>
                        </li>
                        <li>               
                            <Link to='/login'>
                                <a href='/login'>Login</a>
                            </Link>
                        </li>
                        <li>               
                            
                        <Link to='/'>
                                <a href='/' onClick={logout}>Logout</a>
                        </Link>         
                            
                        </li>
                    </ul>
                </nav>
                <div style={styles.hero}>
                    <h1 style={styles.h1}>Welcome to MintJack!</h1>
                    <h1>{loggedInUserContext}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum <LinkHash to="/#rules">rules</LinkHash> </p>
                </div>
    
                <div style={styles.smallDiv}>
                <a id='rules'></a>
                    <h1 style={styles.marginTop}>Rules</h1>
                </div>
                <div style={styles.largeDiv}>
                    <h2 style={styles.marginTop}>How to play</h2>
                    <p>Equally well known as Twenty-One. The rules are simple, the play is thrilling, and there is opportunity for high strategy. In fact, for the expert player who mathematically plays a perfect game and is able to count cards, the odds are sometimes in that player's favor to win.
    
                    But even for the casual participant who plays a reasonably good game, the casino odds are less, making Blackjack one of the most attractive casino games for the player. While the popularity of Blackjack dates from World War I, its roots go back to the 1760s in France, where it is called Vingt-et-Un (French for 21). Today, Blackjack is the one card game that can be found in every American casino. As a popular home game, it is played with slightly different rules. In the casino version, the house is the dealer (a "permanent bank"). In casino play, the dealer remains standing, and the players are seated. The dealer is in charge of running all aspects of the game, from shuffling and dealing the cards to handling all bets. In the home game, all of the players have the opportunity to be the dealer (a "changing bank").</p>
                </div>
            </div>
        )
    }
}



export default Landing