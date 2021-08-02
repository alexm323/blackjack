import axios from "axios";

class DeckAPI {
    static async drawCards(deckId,numOfCards=1){
            
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numOfCards}`)
            return res.data.cards          
    }
    static async hit(deckId){
            
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            return res.data.cards[0]          
    }
    
    
}

export default DeckAPI;