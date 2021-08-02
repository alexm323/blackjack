import React,{useState,useEffect,useCallback, useContext} from 'react'
import { UserContext } from '../Context/UserContext'
import {Redirect, Link} from "react-router-dom";  
import axios from 'axios'
import Game from './Game'
// fetch the deck and pass it down as a prop to the game component
import CardContext from './Context/CardContext'

const BlackjackTable = () => {

    const [deckId,setDeckId] = useState('')
    const [loggedInUser,setLoggedInUser] = useState()
    const {loggedInUserContext, setLoggedInUserContext} = useContext(UserContext)

    const fetchDeck = useCallback(async() => {
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
      setDeckId(res.data.deck_id)
      
    },[]) 
  
    useEffect(() => {
      fetchDeck()
      axios.get('http://localhost:3000/loggedInUser')
      .then(res => {
      console.log(res.data)  
      setLoggedInUser(res.data)
    })
},[fetchDeck])

    const logout = () => {
                
      axios.get(`http://localhost:3000/logout`)
      .then(res => {
        setLoggedInUserContext(false)
      })
      .catch(() => console.log('failed to fetch from url'))

    }

    if(loggedInUserContext){
      return (
        <div style={styles.container}>
            <nav style={styles.nav}>
              <ul style={styles.ul}>
                  <li>               
                  <Link to='/'>Home</Link>
                  </li>
                  <li>               
                  <Link to='/'>
                          <a href='/' onClick={logout}>Logout</a>
                  </Link>         
                  </li>
              </ul>
            </nav>
          <h1>This is our table</h1>
          
          <Game deckId={deckId}/>
        </div>
      );
    } else{
        return (
          <Redirect to='/' />
        )
    }

    
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'grey'
    }
}
export default BlackjackTable;
