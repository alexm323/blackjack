import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../App.css'


const Landing = () => {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6
    `
    const [deckId, setDeckId] = useState(null)
    const [cards, setCards] = useState(null)

    useEffect(() => {
        axios.get(url)
        .then(res =>{
            // console.log(res)
            setDeckId(res.data.deck_id)
        })
    }, [])

    const drawACard = () => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2
        `)
        .then(res => {
            // console.log(res.data.cards)
            setCards(res.data.cards)
        })
    }

    console.log(cards)
    if(deckId){

        return(
            <div className="table">
                    <h1>BLACKJACK</h1>
                    <button type='submit' onClick={drawACard}>Draw a card</button>
                    {cards && cards.map(card =>{
                        return <img src={card.image}></img>
                    })}
            </div>    
    
                
        )
    }else{
        return (
            <div><h1>Loading...</h1></div>
        )
    }
}



export default Landing