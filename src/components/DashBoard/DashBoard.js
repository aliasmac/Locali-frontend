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
            // broadcast: [],
            // pin: "",
            // newBroadcastObject: {
            //     name: "",
            //     pin: null,
            //     broadcaster_id: null,
            //     messages: []
            // }
            newBroadCastName: "",
            newBroadCastPin: undefined,
            newBroadCastMessages: []
          };
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
            
        this.setState({
            // renders map component and broadcast RHS column
            renderMap: true,
            showBroadcastModal: false
        })
    }

    handleMessageSubmit = e => {
        // messageWithPolygon
        const encodedFence = google.maps.geometry.encoding.encodePath(this.state.fence);
        const broadcastMessage = {
            message: this.state.messageText,
            geoFence: encodedFence
        }
        const newBroadcastMessages = [...this.state.newBroadCastMessages, broadcastMessage]

        this.setState({
            messageText: "",
            fence: null,
            broadcast: newBroadcastMessages,
            showModal: false,
        })
    }

    render () {
        const {user} = this.props
        const {renderMap} = this.state
  
    


        return (
            <div className="dashboard"> 
                <div className="map-section">

                    { this.state.showModal || this.state.showBroadcastModal ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                    <h1>Hi {user.username}, welcome to your dashboard</h1>
                    <h3>Instructions:</h3>
                    <p> 1. Click 'Start' to begin a new broadcast</p>
                    <p> 2. Select a location from the map below</p>
                    <p> 3. Add a message</p>
                    <p> 4. Save it to your broadcast</p>

                    <button onClick={() => this.createNewBroadcast()}>Create new Broadcast</button>

                    {
                        renderMap && 
                            <div>
                            <p>
                            {/* Last fetched: <Moment interval={10000} fromNow>{this.state.lastFetched}</Moment> */}
                            </p>
                            <MapWithADrawingManager
                                googleMapURL={googleMapURL}
                                loadingElement={    <div style={{ height: `100%` }}/>   }
                                containerElement={  <div className="map-container" />  }
                                mapElement={    <div style={{ height: `100%` }} />  }
                                center={this.state.center}
                                content={this.state.content}
                                doneDrawing={this.doneDrawing}
                            />
                        </div>
                    }

                    
                    <Modal
                        className="modal"
                        showMessageModal={this.state.showModal}
                        showBroadcastModal={this.state.showBroadcastModal}
                        close={this.closeModalHandler}
                        handleMessageSubmit={this.handleMessageSubmit}
                        handleBroadcastSubmit={this.handleBroadcastSubmit}
                    >

                        {
                            this.state.showModal &&
                            <form id="message-form">
                                <div>
                                    <textarea
                                        name="message"
                                        form="message-form"
                                        onChange={this.handleChange}
                                        required 
                                        value={this.state.messageText}
                                    >
                                    Enter your message here
                                    </textarea>
                                </div>
                            </form>
                        }


                        {
                            this.state.showBroadcastModal &&
                            <form id="broadcast-form">
                                <div>
                                    <label>Name your broadcast</label>
                                    <input
                                        form="broadcast-form"
                                        name="newBroadCastName"
                                        type="text"
                                        value={this.state.newBroadCastName}
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
                                        value={this.state.newBroadCastPin}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                            </form>
                        }
                            
                        

                        
				    </Modal>

                </div>

                {
                    renderMap && 
                    <div>
                        <h1>Your Broadcasts</h1>
                        <BroadCast
                            newBroadCastMessages={this.state.newBroadCastMessages}
                            saveBroadcast={this.saveBroadcast}
                        />
                    </div>
                }
                
              
            
            </div>
        )
    }

}

export default DashBoard