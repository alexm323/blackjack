import React,{useState} from 'react'
import parseCardValue from '../helpers'
import DeckAPI from '../api'


const PlayerHand = ({deck}) => {
    const [playerValue,setPlayerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const [aces,setAces] = useState(0)


    const handleClick = async() => {
        const res = await DeckAPI.drawCard(deck)
        let imgURL = res.cards[0].image
        setCurrentCards([...currentCards,imgURL])
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
            alert('21!')
        }else{
            setPlayerValue(playerValue + val)
            alert('You busted!')
        }
    }
    return (
        <div>
            <p>Playa Score</p>
            <p>{playerValue}</p>
            <button onClick={handleClick}>Hit me</button>
            {currentCards.map((card) => {
                return <img src={card} alt="" />
            })}
        </div>
    )
}

export default PlayerHand