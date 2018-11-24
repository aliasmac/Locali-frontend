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
            broadcast: [],
            broadcastName: "", 
            pin: ""
          };

    }


    createNewBroadcast = () => {
        this.setState({ showBroadcastModal: true })
    }

  
	closeModalHandler = () => {
		this.setState({
			showModal: false
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

    handleMessageSubmit = e => {
        // messageWithPolygon
        const encodedFence = google.maps.geometry.encoding.encodePath(this.state.fence);
        const broadcastMessage = {
            message: this.state.messageText,
            geoFence: encodedFence
        }
        const newBroadcastMessages = [...this.state.broadcast, broadcastMessage]
        this.setState({
            messageText: "",
            fence: null,
            broadcast: newBroadcastMessages,
            showModal: false,
        })
    }

    handleBroadcastSubmit = () => {

        const broadcast = {
            name: this.state.broadcastName,
            pin: this.state.pin,
            broadcaster_id: this.props.user.id
        }

        API.newBroadcast(broadcast)
            

        this.setState({
            renderMap: true,
            broadcastName: "", 
            pin: null
        })
    }


    render () {
        const {user} = this.props
        const {renderMap} = this.state
  
        console.log("INSIDE DASHBOARD", user)


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
                            this.state.showBroadcastModal ?
                            <form id="broadcast-form">
                                <div>
                                    <label>Name your broadcast</label>
                                    <input
                                        form="broadcast-form"
                                        name="broadcastName"
                                        type="text"
                                        value={this.state.broadcastName}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label>Give your broadcast a 4 digit PIN</label>
                                    <input
                                        form="broadcast-form"
                                        name="pin"
                                        type="number"
                                        value={this.state.pin}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                            </form> :
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
                            
                        

                        
				    </Modal>

                </div>

                {
                    renderMap && 
                    <div>
                        <h1>Your Broadcasts</h1>
                        <BroadCast
                            broadcast={this.state.broadcast}
                            saveBroadcast={this.saveBroadcast}
                        />
                    </div>
                }
                
              
            
            </div>
        )
    }

}

export default DashBoard