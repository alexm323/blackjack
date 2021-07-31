import React from 'react'

const Button = (props) => {
    return(
        <div className={props.buttonDivClass}>
        <button type="submit" 
                className={props.buttonClass} 
                >{props.buttonText}
        </button>
    </div> 
    )
}

export default Button