import React from 'react'

export const Message = ({ msg, currentUser }) => {
    const isOwn = msg.uid == currentUser
    return (
        <div className={`message ${isOwn ? "own" : ""}`}>
            <img src={msg.photoURL} alt="" />
            <div className='msgBubble'>
                <h5>{msg.displayName}</h5>
                <p>{msg.text}</p>
            </div>
        </div>
    )
}