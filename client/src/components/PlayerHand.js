import React,{useState,useEffect,useCallback} from 'react'
import {parseCardValue} from '../helpers'
import DeckAPI from '../api'
import Card from './Card'


const PlayerHand = ({deck,trackPlayerValue,initialCards}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [playerValue,setPlayerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const [aces,setAces] = useState(0)


    const drawCard = async () => {
        try {
            const res = await DeckAPI.drawCard(deck)
            let cardData = res.cards[0] // one card {...} 
            return cardData;            
        } catch (e) {
            console.error(e)
        }
    }
    const handleHit = async() => {
        // console.log(initialCards) // [{...},{...}]

        const nextCard = await drawCard();      

        setCurrentCards([...currentCards,nextCard]) /// All cards in player hand: [{...},{...}]

        let nextCardValue = parseCardValue(nextCard.value) //  Value of next card, NOT initial card values: 11
      
        // check if hand has an ace
        if(currentCards.some(card => card.value === "ACE")){
            setAces((prevAceCount) => prevAceCount + 1)
            console.log('we have an ace ',aces)
        }

        // if values > 21, adjust for aces
        if((playerValue + nextCardValue) > 21 && aces){
            setPlayerValue((prevValue) => prevValue + nextCardValue - (10 * aces))
            setAces((prev) => prev - 1)
        } else if (playerValue < 21){
            setPlayerValue((prevValue) => prevValue + nextCardValue)
        }
        
        // what if we check the win on each re-render? the useEffect hook? 

        // if(playerValue + nextCardValue > 21 && aces > 0){
        //     setPlayerValue((prevValue) => prevValue - 10 + nextCardValue)
        //     setAces((prevAceCount) => prevAceCount - 1)
        // }else if(playerValue + nextCardValue < 21){
        //     setPlayerValue((prevValue) => prevValue + nextCardValue)
        // }else if(playerValue + nextCardValue === 21){
        //     setPlayerValue((prevValue) => prevValue + nextCardValue)
        //     console.log('21!')
        // }else{
        //     setPlayerValue((prevValue) => prevValue + nextCardValue)
        //     console.log('busted!')
        //     // alert('You busted!')
        // }
    }

    const handleStay = () => {
        console.log('Stay! Dealer\'s turn now')
        trackPlayerValue(playerValue)
    }

    const loadCards = useCallback(() => {
        let val = initialCards.reduce((a,c) => a + parseCardValue(c.value),0)
        setPlayerValue(val)
        setCurrentCards(initialCards)
    },[])

    useEffect(() => {
        loadCards()
        setLoadedCards(true)
    },[])

    useEffect(() => {
        if((playerValue) > 21 && aces){
            setPlayerValue((prevValue) => prevValue - (10 * aces))
            setAces((prev) => prev - 1)
        }
        console.log('playerValue: ',playerValue)
        console.log('aces: ',aces)
        if (playerValue > 21){
            alert('You busted!')
            console.log('busted!')
        } else if (playerValue === 21) {
            alert('21!')
            console.log('21!')
        }
    },[playerValue, aces])

    return (
        !loadedCards ? 
        <p>Loading</p>
        :
        <div>
            <p>Playa Score</p>
            <p>{playerValue}</p>
            <button onClick={handleHit}>Hit me</button>
            <button onClick={handleStay}>Stay</button>
            {currentCards.map((card) => {
                return <Card key={card.code} cardName={card.code} cardImg={card.image}/>
            })}
        </div>
    )
}

export default PlayerHand