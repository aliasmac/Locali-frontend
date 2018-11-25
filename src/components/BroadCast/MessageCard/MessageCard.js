import React from 'react';

const MessageCard = (props) => {
    return (
        <div className="message-div">
            <p>{props.message.content}</p>
        </div>
    )
}

export default MessageCard;