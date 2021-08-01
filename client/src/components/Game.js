import React, {useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import PlayerHand from './PlayerHand'
import DealerHand from './DealerHand'
import {initializeCardData} from '../helpers'

function Game({deckId}) {
    const [loadingCards,setIsLoadingCards] = useState(false)
    const [playerQueue,setPlayerQueue] = useState([])
    const trackPlayerValue = (val) => {
        setPlayerQueue([...playerQueue,val])
    }
    const [playerState, setPlayerState] = useState([])
    // const loadInitialCards = async (deckId, players) => {
    //     const res = await DeckAPI.drawCard(deckId,(2 + players*2))
    //     return res.cards;
    // }
    let playerStart = []
    let dealerStart = []
    // const handleSetup = async(deckId,players) => {
    //         await loadInitialCards()
    //         let initialDraw = initializeCardData(cardsArr,players)
    //         console.log(initialDraw[0],'dealer')
    //         dealerStart.push(...initialDraw[0])
    //         // console.log(dealerStart)
    //         playerStart.push(...initialDraw[1])
    //         setIsLoadingCards(true)
    //         // console.log(playerStart)
    //     }
    const handleSetup = useCallback(async(deckId,players) => {
        const res = await DeckAPI.drawCard(deckId,(2 + players*2))
        let cardsArr = (res.cards)
        let initialDraw = initializeCardData(cardsArr,players)
        // console.log(initialDraw[0],'dealer')
        dealerStart.push(...initialDraw[0])
        console.log(dealerStart)
        // playerStart.push(...initialDraw[1])
        setPlayerState((playerState) => [...playerState, ])
        setIsLoadingCards(true)
        console.log(playerStart)
    },[])
    console.log(playerStart,'playerstart')
    
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
            <DealerHand initialCards={dealerStart}/>
            {/* console.log(playerStart) */}
            <p>{playerStart.length}</p>
            <PlayerHand initialCards={dealerStart} trackPlayerValue={trackPlayerValue} deck={deckId}/>
            {/* {playerStart.map(cards => {
                return <PlayerHand initialCards={dealerStart} trackPlayerValue={trackPlayerValue} deck={deckId}/>
            })} */}
            
            
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
