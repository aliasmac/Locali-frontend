import React from 'react';
import './BroadCast.css'

import MessageCard from './MessageCard/MessageCard'
var _ = require('lodash');

const BroadCast = (
    {renderDeletedMessage,
        highlight,
        renderEditedMessages,
        newBroadCastMessages,
        saveBroadcast,
        userObject,
        currentBroadcast,
        cancelBroadcast,
        renderNewMessages,
        removeMessage,
        editMessage,
        polygonsCoords,
    }) => {

    // console.log("Hello from broadcast", userObject)

    // const broadcast = userObject.broadcasts[userObject.broadcasts.length - 1]

    // console.log(currentBroadcast)

    return (
        <div className="broadcast-section">

            {
                currentBroadcast && renderNewMessages ?
                <div> 
                    <h1>{_.capitalize(currentBroadcast.name)}</h1>
                    <div className="broadcast-messages">
                        { newBroadCastMessages.map((msg, idx) =>  <MessageCard num={idx + 1} 
                                                                        key={idx}
                                                                        message={msg}
                                                                        removeMessage={removeMessage}
                                                                        editMessage={editMessage}
                                                                        highlight={highlight}
                                                                        polygonsCoords={polygonsCoords}
                                                                    />) }
                    </div>            
                </div> : null
                
            }

            {
                currentBroadcast && renderEditedMessages ?
                <div> 
                    <h1>{currentBroadcast.name}</h1>
                    <div className="broadcast-messages">
                        { newBroadCastMessages.map((msg, idx) =>  <MessageCard num={idx + 1} 
                                                                            key={idx} message={msg}
                                                                            removeMessage={removeMessage}
                                                                            editMessage={editMessage}
                                                                            highlight={highlight}
                                                                            polygonsCoords={polygonsCoords}
                                                                            />) }
                    </div>            
                </div> : null
            }

            {
                currentBroadcast && renderDeletedMessage ?
                <div> 
                    <h1>{currentBroadcast.name}</h1>
                    <div className="broadcast-messages">
                        { newBroadCastMessages.map((msg, idx) =>  <MessageCard num={idx + 1} 
                                                                            key={idx} message={msg}
                                                                            removeMessage={removeMessage}
                                                                            editMessage={editMessage}
                                                                            highlight={highlight}
                                                                            polygonsCoords={polygonsCoords}
                                                                            />) }
                    </div>            
                </div> : null
            }

            {
                currentBroadcast && !renderNewMessages && !renderEditedMessages && !renderDeletedMessage ?
                <div> 
                <h1>{currentBroadcast.name}</h1>
                    <div className="broadcast-messages">
                        { currentBroadcast.messages.map((msg, idx) =>  <MessageCard num={idx + 1} 
                                                                            key={idx} message={msg}
                                                                            removeMessage={removeMessage}
                                                                            editMessage={editMessage}
                                                                            highlight={highlight}
                                                                            polygonsCoords={polygonsCoords}
                                                                            />) }
                    </div>            
                </div> : null
            }

            


            <div className="broadcast-buttons" >
                <button className='save' onClick={saveBroadcast}>Save Broadcast</button>    
                <button className='cancel' onClick={cancelBroadcast} >Cancel</button>
            </div>
        </div>
    )
}

export default BroadCast