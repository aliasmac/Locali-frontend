import React from 'react';
import './MessageCard.css'

import decodeGeoCode from '../../HelperFunctions/decodeGeoCode'

const MessageCard = ({highlight, message, num, removeMessage, editMessage, polygonsCoords}) => {

    // polygonsToDelete.filter(poly => poly.id !== )
    // console.log("HELLO FROM MESSAGE CARD:", polygonsCoords)
    // console.log(message)

    // const msgCoords = decodeGeoCode(message.geofence)
    

    // const getcord = () => {
    //     polygonsCoords.map(coords => {
    //         console.log("HEELLLLLO", coords)
    //     })
    
    // }

   

    return (    
        <div className={'message-div' + (highlight === message.id ? "-show" : "") } >
            <p>{num}. {message.content}</p>
            <button onClick={() => removeMessage(message)} >remove</button>
            <button onClick={() => editMessage(message)} >edit</button>
        </div>
    )
}

export default MessageCard;

