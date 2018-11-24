import React from 'react';

const MessageCard = (props) => {
    return (
        <div className="message-div">
            <p>{props.message.message}</p>
        </div>
    )
}

export default MessageCard;