import React from 'react'
import PlayerHand from './PlayerHand'

function Game({deckId}) {

    
    return (
        <div style={styles.game}>
            <p>This is our Game component</p>
            {/* <Hand deck={deck}/> */}
            <PlayerHand deck={deckId}/>
            
        </div>
    )
}

const styles = {
    game:{
        backgroundColor:'green',
        
    }
}

export default Game
