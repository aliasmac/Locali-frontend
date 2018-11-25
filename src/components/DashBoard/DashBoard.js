/* global google */
import React from 'react'
import API from '../../API'
import './DashBoard.css'

import MapWithADrawingManager from '../Map/Map'
import Modal from './Modal/Modal'
import BroadCast from '../BroadCast/BroadCast'


const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8`;

class DashBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            center: {
              // Flatiron School
              lat: 51.520534,
              lng: -0.087613
            },
            renderMap: false,
            polygon: null,
            fence: null,
            watchID: null,
            lastFetched: null,
            showModal: false,
            showBroadcastModal: false,
            messageText: "",
            newBroadCastName: "",
            newBroadCastPin: "",
            newBroadCastMessages: [],
            currentBroadcast: null,
            getLastBroadCast: false
          };
    }

    componentDidMount() {

        API.getLastbroadcast()
            .then(broadcast => {
                if (broadcast) {
                    if (broadcast.saved === false ) {
                        this.setState({ currentBroadcast: broadcast })
                    } else {
                        this.setState({ currentBroadcast: null })
                    }
                }
                           
            }) 

    }

    createNewBroadcast = () => {
        this.setState({ showBroadcastModal: true })
    }

  
	closeModalHandler = () => {
		this.setState({
            showModal: false,
            showBroadcastModal: false
		});
    }

    doneDrawing = polygon => {        
        // if (this.state.polygon) {
        //     this.state.polygon.setMap(null);
        //   }
        this.setState({ polygon })
        this.setState({ fence: polygon.getPath() })
        this.setState({ showModal: true })
    }

    handleChange = e => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBroadcastSubmit = () => {
 
    const broadcast = {
                name: this.state.newBroadCastName,
                pin: this.state.newBroadCastPin,
                broadcaster_id: this.props.user.id
            }

        API.newBroadCast(broadcast)
            .then(broadcast => {
                this.setState({
                    // renders map component and broadcast RHS column
                    renderMap: true,
                    showBroadcastModal: false,
                    currentBroadcast: broadcast
                }) 
            })

         
            
    }

    handleMessageSubmit = e => {
        // messageWithPolygon
        const encodedFence = google.maps.geometry.encoding.encodePath(this.state.fence);
        const broadcastMessage = {
            message: this.state.messageText,
            geofence: encodedFence,
            broadcast_id: this.state.currentBroadcast.id
        }

        API.addMessage(broadcastMessage)

        this.setState({
            messageText: "",
            fence: null,
            showModal: false,
        })
    }

    saveBroadcast = () => {
        API.saveBroadCast(this.state.currentBroadcast.id)
            .then(this.setState({ currentBroadcast: null }))
    }

    render () {

        const {user, userObject} = this.props
        const {currentBroadcast, renderMap, showModal, newBroadCastPin, showBroadcastModal, center, content, messageText, newBroadCastMessages, newBroadCastName} = this.state


        return (
            <div className="dashboard"> 
                <div className="map-section">

                    { showModal || showBroadcastModal ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                    <h1>Hi {user.username}, welcome to your dashboard</h1>

                    <h3>Instructions:</h3>
                    <p> 1. Click 'Start' to begin a new broadcast</p>
                    <p> 2. Select a location from the map below</p>
                    <p> 3. Add a message</p>
                    <p> 4. Save it to your broadcast</p>

                    <button onClick={() => this.createNewBroadcast()}
                    disabled={currentBroadcast}
                    >Create new Broadcast</button>

                    {
                        currentBroadcast && 
                        <div>
                            <p>
                            {/* Last fetched: <Moment interval={10000} fromNow>{this.state.lastFetched}</Moment> */}
                            </p>
                            <MapWithADrawingManager
                                googleMapURL={googleMapURL}
                                loadingElement={    <div style={{ height: `100%` }}/>   }
                                containerElement={  <div className="map-container" />  }
                                mapElement={    <div style={{ height: `100%` }} />  }
                                center={center}
                                content={content}
                                doneDrawing={this.doneDrawing}
                            />
                        </div>
                    }

                    
                    <Modal
                        className="modal"
                        showMessageModal={showModal}
                        showBroadcastModal={showBroadcastModal}
                        close={this.closeModalHandler}
                        handleMessageSubmit={this.handleMessageSubmit}
                        handleBroadcastSubmit={this.handleBroadcastSubmit}
                    >

                        {
                            showModal &&
                            <form id="message-form">
                                <div>
                                    <textarea
                                        name="messageText"
                                        form="message-form"
                                        onChange={this.handleChange}
                                        required 
                                        value={messageText}
                                    >
                                    Enter your message here
                                    </textarea>
                                </div>
                            </form>
                        }


                        {
                            showBroadcastModal &&
                            <form id="broadcast-form">
                                <div>
                                    <label>Name your broadcast</label>
                                    <input
                                        form="broadcast-form"
                                        name="newBroadCastName"
                                        type="text"
                                        value={newBroadCastName}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Give your broadcast a 4 digit PIN</label>
                                    <input
                                        form="broadcast-form"
                                        name="newBroadCastPin"
                                        type="number"
                                        value={newBroadCastPin}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                            </form>
                        }
                                       
				    </Modal>

                </div>

                {
                    currentBroadcast && 
                        <BroadCast
                            newBroadCastMessages={newBroadCastMessages}
                            saveBroadcast={this.saveBroadcast}
                            currentBroadcast={currentBroadcast}
                        />
                }
                
              
            
            </div>
        )
    }

}

export default DashBoard