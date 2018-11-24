import React from 'react';

import MessageCard from './MessageCard/MessageCard'

const BroadCast = (props) => {
    return (
        <div className="broadcast-section">
            {
                props.broadcast.map((msg, idx) =>  <MessageCard key={idx} message={msg} /> )
            }

            <button onClick={props.saveBroadcast}>Save Broadcast</button>    
        </div>
    )
}

export default BroadCast