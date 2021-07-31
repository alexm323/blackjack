import axios from "axios";

class DeckAPI {
    static async drawCard(deckId,numOfCards=1){
            
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numOfCards}`)
            return res.data          
    }
    
    
}

export default DeckAPI;