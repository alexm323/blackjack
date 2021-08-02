import React,{useState,useEffect,useCallback} from 'react'
import DeckAPI from '../api'
import { parseCardValue } from '../helpers'
import Card from './Card'

const DealerHand = ({deck,initialCards}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [dealerValue,setDealerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const loadCards = useCallback(() => {
        let val = initialCards.reduce((a,c) => a + parseCardValue(c.value),0)
        setDealerValue(val)
        setCurrentCards(initialCards)
    },[])
    useEffect(() => {
        loadCards()
        setLoadedCards(true)
    },[])
    return (
        !loadedCards ? 
        <p>Loading</p>
        :
        <div>
            <p>Dealer Score</p>
            <p>{dealerValue}</p>
            {currentCards.map((card) => {
                return <Card key={card.code} cardName={card.code} cardImg={card.image}/>
            })}
        </div>
    )
}

export default DealerHand