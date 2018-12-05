import React from 'react'

const Book = ({title, pages}) => {
    return(
        <div>
            <h2>{title}</h2>
            <h3>{pages}</h3>
        </div>
    )
}

export default Book