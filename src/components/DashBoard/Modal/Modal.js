import React from 'react';  

import './Modal.css';

const Modal = (props) => {


    const {showMessageModal, showBroadcastModal, close, handleMessageSubmit, handleBroadcastSubmit, children} = props

    return (

        <div>
            <div className="modal-wrapper"

                style={{
                    transform: showMessageModal || showBroadcastModal ? 'translateY(-70vh)' : 'translateY(-100vh)',
                    opacity: showMessageModal || showBroadcastModal ? '1' : '0'
                }}>

                {
                    showMessageModal ?
                    <div>
                        <div className="modal-header">
                            <h3>Create new message</h3>
                            <span className="close-modal-btn" onClick={close}>×</span>
                        </div>
                        <div className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleMessageSubmit} className="btn-continue">Submit</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="modal-header">
                        <h3>Create new broadcast</h3>
                        <span className="close-modal-btn" onClick={close}>×</span>
                        </div>
                        <div className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleBroadcastSubmit} className="btn-continue">Submit</button>
                        </div>
                    </div>
                }

                
            

            </div>
        </div>
    )
}

export default Modal;