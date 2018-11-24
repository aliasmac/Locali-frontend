import React from 'react';

import './Modal.css';

const Modal = (props) => {

    console.log("HELLO FROM INSIDE MODAL")

    return (

        <div>
            <div className="modal-wrapper"

                style={{
                    transform: props.show ? 'translateY(-70vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>

                {
                    props.showMessageModal ?
                    <div>
                        <div className="modal-header">
                            <h3>Create new message</h3>
                            <span className="close-modal-btn" onClick={props.close}>×</span>
                        </div>
                        <div className="modal-body">
                                {props.children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={props.handleMessageSubmit} className="btn-continue">Submit</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="modal-header">
                        <h3>Create new broadcast</h3>
                        <span className="close-modal-btn" onClick={props.close}>×</span>
                        </div>
                        <div className="modal-body">
                                {props.children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={props.handleBroadcastSubmit} className="btn-continue">Submit</button>
                        </div>
                    </div>
                }

                
            

            </div>
        </div>
    )
}

export default Modal;