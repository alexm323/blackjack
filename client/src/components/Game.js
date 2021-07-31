import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'

function Game({deckId}) {
    const [playerQueue,setPlayerQueue] = useState([])
    const trackPlayerValue = (val) => {
        setPlayerQueue([...playerQueue,val])
    }
    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(2 + players*2))
        console.log(res)
    },[])
    return (
        <div style={styles.game}>
            <p>This is our Game component</p>
            <button onClick={() => handleSetup(deckId,1)}>Start Game</button>
            {playerQueue.map(num => <p>{num}</p>)}
            {/* <Hand deck={deck}/> */}
            <PlayerHand trackPlayerValue={trackPlayerValue} deck={deckId}/>
            
        </div>
    )
}

const styles = {
    game:{
        backgroundColor:'green',
        
    }
}

export default Game
