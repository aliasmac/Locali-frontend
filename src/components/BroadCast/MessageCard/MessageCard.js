import React from 'react';
import './MessageCard.css'

const MessageCard = ({highlight, message, num, removeMessage, editMessage}) => {

    return (    
        <div className={'message-div' + (highlight === message.id ? '-show' : "") } >
            <p>{num}. {message.content}</p>
            <button onClick={() => removeMessage(message)} >remove</button>
            <button onClick={() => editMessage(message)} >edit</button>
        </div>
    )
}

export default MessageCard;

