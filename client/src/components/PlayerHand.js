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
<<<<<<< HEAD
        const newCard = await DeckAPI.hit(deck);      
        setCurrentCards([...currentCards,newCard]) /// All cards in player hand: [{...},{...}]
        let newCardValue = parseCardValue(newCard.value) //  Value of next card, NOT initial card values: 11
        // check if hand has an ace
        if(currentCards.some(card => card.value === "ACE")){
            setAces((prevAceCount) => prevAceCount + 1)
            // console.log('we have an ace ',aces)
        }
        // if values > 21, adjust for aces
        if((playerValue + newCardValue) > 21 && aces > 1){
            setPlayerValue((prevValue) => (prevValue + newCardValue - 10))
            setAces((prev) => prev - 1)
        } else if (playerValue < 21){
            setPlayerValue((prevValue) => prevValue + newCardValue)
        }
=======
        // console.log(initialCards) // [{...},{...}]

        const nextCard = await drawCard();      

        setCurrentCards([...currentCards,nextCard]) /// All cards in player hand: [{...},{...}]

        let nextCardValue = parseCardValue(nextCard.value) //  Value of next card, NOT initial card values: 11       

        console.log('all aces: ',numOfAces(),' initial aces: ',numOfInitialAces())

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
                console.log('we have an ace ',aces)
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
            console.log('we have an initial ace ',aces)
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
        // if values > 21, adjust for aces
        // if((playerValue + nextCardValue) > 21 && aces){
        //     setPlayerValue((prevValue) => prevValue + nextCardValue - (10 * aces))
        //     setAces((prev) => prev - 1)
        // } else if (playerValue < 21){
        //     setPlayerValue((prevValue) => prevValue + nextCardValue)
        // }
        
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
>>>>>>> e421ffedf8bd4b3f3cb66f83c9ee29e37bf50491
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
<<<<<<< HEAD
        if((playerValue) > 21 && aces){
            setPlayerValue((prevValue) => prevValue - (10 * aces))
            setAces((prev) => prev - 1)
        }
        // console.log('playerValue: ',playerValue)
        // console.log('aces: ',aces)
        if (playerValue > 21){
            // alert('You busted!')
            console.log('busted!')
        } else if (playerValue === 21) {
            // alert('21!')
            console.log('21!')
=======

        checkWin(playerValue)
        function checkWin (playerValue) {
            if (playerValue > 21){
                alert('You busted!')
                console.log('busted!')
            } else if (playerValue === 21) {
                alert('21!')
                console.log('21!')
            }
>>>>>>> e421ffedf8bd4b3f3cb66f83c9ee29e37bf50491
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