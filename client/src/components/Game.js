import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'
// load a game with the 
function Game({deckId}) {
    const [loadingCards,setIsLoadingCards] = useState(false)
    const [playerQueue,setPlayerQueue] = useState([])
    const trackPlayerValue = (val) => {
        setPlayerQueue([...playerQueue,val])
    }
    const [playerState, setPlayerState] = useState([])
    const [dealerState, setDealerState] = useState([])
    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(2 + players*2))
        let cardsArr = (res.cards)
        let initialDraw = initializeCardData(cardsArr,players)
        setPlayerState([...initialDraw[1]])
        setDealerState([...initialDraw[0]])
        setIsLoadingCards(true)

    },[])
    console.log(dealerState)
    return (
        !loadingCards ? 
        <div>
            <p>Loading</p>
            <button onClick={() => handleSetup(deckId,2)}>Start Game</button>
        </div>
        
        :
        <div style={styles.game}>
            <p>This is our Game component</p>
            {/* <button onClick={() => handleSetup(deckId,1)}>Start Game</button> */}
            {playerQueue.map(num => <p>{num}</p>)}
            <DealerHand initialCards={dealerState}/>
            {/* console.log(playerStart) */}
            <p>{playerState.length}</p>

            {/* card objects need to be passed down, and number values handled in the reduce. This will allow robust handling of the ace.*/}
        {   playerState.map((cardArr) => {
                
            return <PlayerHand initialCards={cardArr} trackPlayerValue={trackPlayerValue} deck={deckId}/>
            })}

            
            
        </div>
    )
}

const styles = {
    game:{
        backgroundColor:'green',
        fontSize:'36px'
    }
}

export default Game
