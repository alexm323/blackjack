import React,{useState,useEffect,useCallback} from 'react'
import axios from 'axios'
import Game from './Game'


const BlackjackTable = () => {
    const [deckId,setDeckId] = useState('')
    const fetchDeck = useCallback(async() => {
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      setDeckId(res.data.deck_id)
      
    },[]) 
  
    useEffect(() => {
      fetchDeck()
    },[fetchDeck])
    
    return (
      <div style={styles.container}>
        <h1>This is our table</h1>
        <Game deckId={deckId}/>
      </div>
    );

    
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'grey'
    }
}
export default BlackjackTable;
