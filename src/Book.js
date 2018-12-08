import React from 'react'
import './Book.css'

const Book = ({title, author, snippet}) => {
    return(
            <div className='bg-washed-blue br3 pa1 bw2 ma2 shadow-5 tc grow dib card'>
                <div>
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                </div>
                <div>
                    <p> Snippets: {snippet} </p>
                </div>
            </div>
    )
}

export default Book