import React,{useState} from 'react'
import DeckAPI from '../api'


const DealerHand = ({deck}) => {
    const [dealerValue,setDealerValue] = useState(0)
    const handleClick = async() => {
        const res = await DeckAPI.drawCard(deck)
        console.log(res.card[0])
    }
    return (
        <div>
            <button onClick={handleClick}>Click to draw</button>
        </div>
    )
}

export default DealerHand