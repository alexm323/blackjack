export default function parseCardValue(val){
    const faceCards = ['KING','QUEEN','JACK']
    const Ace = ['ACE']
    if (faceCards.includes(val)){
        return 10
    }else if(Ace.includes(val)){
        return 11
    }else{
        return parseInt(val)
    }

}

// export default function initializeCardData(cardArr){
// hello
// }