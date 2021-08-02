import React,{useState,useEffect,useCallback} from 'react'
import {calculateValue, parseCardValue} from '../helpers'
import DeckAPI from '../api'
import Card from './Card'


const PlayerHand = ({deck,trackPlayerValue,initialCards}) => {
    const [loadedCards,setLoadedCards] = useState(false)
    const [playerValue,setPlayerValue] = useState(0)
    const [currentCards,setCurrentCards] = useState([])
    const [aces,setAces] = useState(0)

    const handleHit = async() => {
        // console.log(initialCards) // [{...},{...}]

        const nextCard = await drawCard();      

        setCurrentCards([...currentCards,nextCard]) /// All cards in player hand: [{...},{...}]

        let nextCardValue = parseCardValue(nextCard.value) //  Value of next card, NOT initial card values: 11       

        // console.log('all aces: ',numOfAces(),' initial aces: ',numOfInitialAces())

        // TODO: resolve edge case of if there are two initial aces, and a hit results in > 21, or if there are 3+ aces in a hand
        setPlayerValue((prev) => {
            let current;
            if((hasAce() || nextCard.value === 'ACE') && (prev + nextCardValue) > 21){
                //distinguish between initial ace and next card ace
                let aceCase = 1;
                // if initial ace, and next Ace
                if(hasInitialAce() && nextCard.value === 'ACE'){
                    if ((prev + aceCase) > 21){ // make both aces value of one
                        current = prev + aceCase - 10
                        tagAnAce()
                        tagAnAce()
                    } else { // make next ace value of one
                        current = prev + aceCase
                        tagAnAce()
                    }

                // if no initial ace and next is ace
                } else if ((!hasInitialAce()) && nextCard.value === 'ACE'){
                    current = prev + aceCase; // make next ace value of one
                    tagAnAce()
                // if initial ace and no next ace
                } else if (hasInitialAce() && nextCard.value !== 'ACE'){
                    current = prev + nextCardValue - (10 * numOfUntaggedAces()) // make an initial ace value of one
                    tagAnAce()
                }
            } else {
                current = prev + nextCardValue
            }
            return current;
        })

        


        // check if hand has an ace, and return num of aces if yes
        function numOfAces () {           
                // console.log('we have an ace ',aces)
                return currentCards.reduce((acc,{value}) => {
                    if (value === 'ACE'){
                        acc++
                    }
                    return acc;
                } ,0)            
        }
        function hasAce () {
            return currentCards.some(card => card.value === "ACE");
        }

        function hasInitialAce () {
            return initialCards.some(card => card.value === "ACE")
        }
        function numOfInitialAces(params) {
            // console.log('we have an initial ace ',aces)
                return initialCards.reduce((acc,{value}) => {
                    if (value === 'ACE'){
                        acc++
                    }
                    return acc;
                } ,0) 
        }
        function tagAnAce () {
            let nextAce = currentCards.find(card => card.value === 'ACE')
            if (nextAce) nextAce.found = true;            
        }
        function untagAnAce () {
            let nextAce = currentCards.find(card => card.value === 'ACE')
            if (nextAce) nextAce.found = false;  
        }
        function numOfUntaggedAces () {
            if (numOfAces() === numOfInitialAces()){ // if state has actually updated
                if (currentCards.some(card => card.value === "ACE" && !card.found)){
                    return currentCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                }
            } else {
                if ( initialCards.some(card => card.value === "ACE" && !card.found) || currentCards.some(card => card.value === "ACE" && !card.found)){
                    let current = currentCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                    let initial = initialCards.reduce((acc,{value, found}) => {
                        if (value === 'ACE' && !found){
                            acc++
                        }
                        return acc;
                    } ,0)
                    return current + initial;
                }
            }
            return 0;
        }

    }

    const handleStay = () => {
        console.log('Stay! Dealer\'s turn now')
        trackPlayerValue(playerValue)
    }

    const loadCards = useCallback(() => {
        let val = calculateValue(initialCards)
        setPlayerValue(val)
        setCurrentCards(initialCards)
    },[])

    useEffect(() => {
        loadCards()
        setLoadedCards(true)
    },[])

    useEffect(() => {
        //TODO: diable user actions on win or bust
        checkWin(playerValue)
        function checkWin (playerValue) {
            if (playerValue > 21){
                alert('You busted!')
                console.log('busted!')
                handleStay(playerValue)
                
            } else if (playerValue === 21) {
                alert('21!')
                console.log('21!')
                handleStay(playerValue)
            }
        }
        
    },[playerValue])

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