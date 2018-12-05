import React from "react";

import './HelpSlideSelector.css'
 
const HelpSlideSelector = ({ toggleMenu }) => {

    return (
      <div className="help-selector">
        {/* <button  >Help</button> */}
        <div onClick={toggleMenu} ><i class="far fa-question-circle far-7x"></i></div>
        
      </div>
    );
  
}
 
export default HelpSlideSelector