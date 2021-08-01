import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'

function Game({deckId}) {
    const [loadingCards,setIsLoadingCards] = useState(true)
    const [playerQueue,setPlayerQueue] = useState([])
    const trackPlayerValue = (val) => {
        setPlayerQueue([...playerQueue,val])
    }
    let playerStart = []
    let dealerStart = []
    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(2 + players*2))
        let cardsArr = (res.cards)
        let initialDraw = initializeCardData(cardsArr,players)
        // console.log(initialDraw[0],'dealer')
        dealerStart.push(...initialDraw[0])
        playerStart.push(...initialDraw[1])
        setIsLoadingCards(false)
        console.log(playerStart[0])
    },[])

    return (
        loadingCards ? 
        <div>
            <p>Loading</p>
            <button onClick={() => handleSetup(deckId,1)}>Start Game</button>
        </div>
        
        :
        <div style={styles.game}>
            <p>This is our Game component</p>
            {/* <button onClick={() => handleSetup(deckId,1)}>Start Game</button> */}
            {playerQueue.map(num => <p>{num}</p>)}
            <DealerHand initialCards={dealerStart}/>
            {/* console.log(playerStart) */}
            <PlayerHand initialCards={[
    {
      "code": "QH",
      "image": "https://deckofcardsapi.com/static/img/QH.png",
      "images": {
        "svg": "https://deckofcardsapi.com/static/img/QH.svg",
        "png": "https://deckofcardsapi.com/static/img/QH.png"
      },
      "value": "QUEEN",
      "suit": "HEARTS"
    },
    {
      "code": "6D",
      "image": "https://deckofcardsapi.com/static/img/6D.png",
      "images": {
        "svg": "https://deckofcardsapi.com/static/img/6D.svg",
        "png": "https://deckofcardsapi.com/static/img/6D.png"
      },
      "value": "6",
      "suit": "DIAMONDS"
    }
  ]} trackPlayerValue={trackPlayerValue} deck={deckId}/>
            
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
