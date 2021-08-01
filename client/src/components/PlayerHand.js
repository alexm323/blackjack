import React,{useState,useEffect,useCallback} from 'react'
import {parseCardValue} from '../helpers'
import DeckAPI from '../api'
import Card from './Card'


const PlayerHand = ({deck,trackPlayerValue,initialCards}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [playerValue,setPlayerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const [aces,setAces] = useState(0)

    const handleHit = async() => {
        console.log(initialCards)
        const res = await DeckAPI.drawCard(deck)
        let cardData = res.cards[0]
        setCurrentCards([...currentCards,cardData])
        let val = parseCardValue(res.cards[0].value)
        // console.log('card val',val)
        // console.log('aceCount val',aces)
        if(val === 11){
            setAces(aces + 1)
        }
        if(playerValue + val > 21 && aces > 0){
            setPlayerValue(playerValue - 10 + val)
            setAces(aces - 1)
        }else if(playerValue + val < 21){
            setPlayerValue(playerValue + val)
        }else if(playerValue + val === 21){
            setPlayerValue(playerValue + val)
            // console.log('21!')
        }else{
            setPlayerValue(playerValue + val)
            // alert('You busted!')
        }
    }
    const handleStay = async() => {
        console.log('Stay! Dealer\'s turn now')
        trackPlayerValue(playerValue)
    }
    const loadCards = useCallback(() => {
        let val = initialCards.reduce((a,c) => a + parseCardValue(c.value),0)
        setPlayerValue(val)
        setCurrentCards(initialCards)
    },[])
    useEffect(() => {
        // setCurrentCards((currentCards) => currentCards.concat(initialCards))
        loadCards()
        setLoadedCards(true)
    },[])


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