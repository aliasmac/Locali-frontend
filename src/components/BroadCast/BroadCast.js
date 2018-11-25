import React from 'react';

import MessageCard from './MessageCard/MessageCard'

const BroadCast = ({newBroadCastMessages, saveBroadcast, userObject, currentBroadcast}) => {

    console.log("Hello from broadcast", userObject)

    // const broadcast = userObject.broadcasts[userObject.broadcasts.length - 1]

    console.log(currentBroadcast)

    return (
        <div className="broadcast-section">

            {
                currentBroadcast &&    
                <div> 
                    <h1>{currentBroadcast.name}</h1>
                    <div>
                        { currentBroadcast.messages.map((msg, idx) =>  <MessageCard key={idx} message={msg} />) }
                    </div>            
                </div>
            }
            <button onClick={saveBroadcast}>Save Broadcast</button>    
        </div>
    )
}

export default BroadCast