import React from 'react';  

import './Modal.css';

// class Modal extends React.Component {

    

//     showForms = () => {
//         if (this.props.showMessageModal) {
//             return <div className="modal-container" >
//                         <div className="modal-header">
//                             <h3>Create new message</h3>
//                             <span className="close-modal-btn" onClick={this.props.close}>×</span>
//                         </div>
//                         <div className="modal-body">
//                                 {this.props.children}
//                         </div>
//                         <div className="modal-footer">
//                             <button onClick={this.props.handleMessageSubmit} className="btn-submit">Submit</button>
//                         </div>
//                     </div>
//         } 
        
//         if (this.props.showBroadcastModal) {
//             return <div className="modal-container"  >
//                     <div className="modal-header">
//                     <h3>Create new broadcast</h3>
//                     <span className="close-modal-btn" onClick={this.props.close}>×</span>
//                     </div>
//                     <div className="modal-body">
//                             {this.props.children}
//                     </div>
//                     <div className="modal-footer">
//                         <button onClick={this.props.handleBroadcastSubmit} className="btn-submit">Submit</button>
//                     </div>
//         </div>

//         } 
        
//         if (this.props.showEditModal) {
//             return <div className="modal-container"  >
//                     <div className="modal-header">
//                     <h3>Edit Message</h3>
//                     <span className="close-modal-btn" onClick={this.props.close}>×</span>
//                     </div>
//                     <div className="modal-body">
//                             {this.props.children}
//                     </div>
//                     <div className="modal-footer">
//                         <button onClick={this.props.handleMessageSubmitEdit} className="btn-submit">Submit</button>
//                     </div>
//                 </div>
//         }

//     }

    
//     render() {

//         const {
//             close,
//             children,
//             showMessageModal,
//             showBroadcastModal,
//             showEditModal,
//             handleMessageSubmit,
//             handleBroadcastSubmit,
//             handleMessageSubmitEdit,
//         } = this.props


//         return (
//             <div>
//             <div className="modal-wrapper"

//                 style={{
//                     transform: showMessageModal || showBroadcastModal || showEditModal  ? 'translateY(-60vh)' : 'translateY(-100vh)',
//                     opacity: showMessageModal || showBroadcastModal || showEditModal ? '1' : '0'
//                 }}>

//                 {
//                     showMessageModal || showBroadcastModal || showEditModal && this.showForms()
//                 }


//             </div>
//         </div>

//         )
//     }

// }

// export default Modal;



const Modal = (props) => {


    const {
        close,
        children,
        showMessageModal,
        showBroadcastModal,
        showEditModal,
        handleMessageSubmit,
        handleBroadcastSubmit,
        handleMessageSubmitEdit,
    } = props

    return (

        <div>
            <div className="modal-wrapper"

                style={{
                    transform: showMessageModal || showBroadcastModal || showEditModal  ? 'translateY(-60vh)' : 'translateY(-100vh)',
                    opacity: showMessageModal || showBroadcastModal || showEditModal ? '1' : '0'
                }}>
                

                {   
                    showMessageModal &&
                    <div className="modal-container" >
                        <div className="modal-header">
                            <h3>Create new message</h3>
                            <span className="close-modal-btn" onClick={close}>×</span>
                        </div>
                        <div className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleMessageSubmit} className="btn-submit">Submit</button>
                        </div>
                    </div>

                }

                {
                    showBroadcastModal &&
                    <div className="modal-container"  >
                        <div className="modal-header">
                        <h3>Create new broadcast</h3>
                        <span className="close-modal-btn" onClick={close}>×</span>
                        </div>
                        <div className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleBroadcastSubmit} className="btn-submit">Submit</button>
                        </div>
                    </div>
                }

                {
                    showEditModal && 
                    <div className="modal-container"  >
                        <div className="modal-header">
                        <h3>Edit Message</h3>
                        <span className="close-modal-btn" onClick={close}>×</span>
                        </div>
                        <div className="modal-body">
                                {children}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleMessageSubmitEdit} className="btn-submit">Submit</button>
                        </div>
                    </div>
                }

                
            

            </div>
        </div>
    )
}

export default Modal;