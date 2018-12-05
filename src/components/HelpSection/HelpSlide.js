import React from "react";

import './HelpSlide.css'
 
const HelpSlide = ({visible, toggleMenu}) => {

    var visibility = "hide";
 
    if (visible) {
      visibility = "show";
    }

    return (
      <div
      id="slider"
      onMouseDown={toggleMenu} 
      className={visibility}      
      >
        <div className="instructions-div">
          <div className="instructions">
            <h3>Welcome to Locali</h3>

            <p>Please take a moment to read the follwoing instructions to get started
              using the Broadcast Manager.</p>

            <div><p>1. To start a new broadcast, either click 'create new broadcast' or save
              the current broadcast and then click 'create new broadcast'</p></div>

            <div><p>2. Give your broadcast a "Name" and a 6 character "Code".<br /><strong>IMPORTANT:</strong> please remember the code otherwise you and your users will
              not be able to access broadcast!!</p></div>

            <div><p>3. Draw a geofence by clicking on the polygon drawing tool icon,
              located next to the hand icon at the top of the map.</p></div>
            
            <div><p>4. Once you have finsihed drawing your geofence,
              a message box will appear for you to right your message.</p></div>
            
            <div><p>5. Enter submit and your message will be added to your broadcast.</p></div>
            
            <div><p>6. You have options to edit an remove your messages.</p></div>

            <div><p>7. Click 'save' to finalise your broadcast or 'cancel to delete it
              permenantly.</p></div>

            
            <p><strong>Additional Notes:</strong></p>
            
            <div><p>If you make a mistake drawing your polygon, please refresh the page and redraw the polygon.</p></div>
            <div><p>When you delete a message, please refresh the page and the polygon will dissapear from the map</p></div>
            <div><p>To see which polygon belongs to which message, refresh the page and select the 'HAND ICON', hover of the polygon and
              on the broadcast panel on the RHS, the related message will glow yellow.</p></div>
   
          </div>
        </div>
      </div>
    );
  
}
 
export default HelpSlide