import React from 'react';

import MessageCard from './MessageCard/MessageCard'

const BroadCast = ({newBroadCastMessages, saveBroadcast}) => {
    return (
        <div className="broadcast-section">
            {
                newBroadCastMessages.map((msg, idx) =>  <MessageCard key={idx} message={msg} /> )
            }

            <button onClick={saveBroadcast}>Save Broadcast</button>    
        </div>
    )
}

export default BroadCast