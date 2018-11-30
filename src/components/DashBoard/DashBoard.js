/* global google */
import React from 'react'
import API from '../../API'
import './DashBoard.css'

import { Polygon } from 'react-google-maps';

import MapWithADrawingManager from '../Map/Map'
import Modal from './Modal/Modal'
import BroadCast from '../BroadCast/BroadCast'
import decodeGeoCode from '../HelperFunctions/decodeGeoCode'


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
            getLastBroadCast: false,
            renderNewMessages: false,
            currentBroadcastPolygons: null,
            polygons: [],
            polygonsCoords: [],
            editModal: false,
            editText: "",
            messageToEdit: null,
            renderEditedMessages: false,
          };
    }

    componentDidMount() {

        API.getLastbroadcast()
            .then(broadcast => {
                if (broadcast) {
                    if (broadcast.saved === false ) {
                        this.setState({
                            currentBroadcast: broadcast,
                            newBroadCastMessages: broadcast.messages,
                            polygons: this.getGeoFencesFromBroadCast(broadcast)
                        })
                    } else {
                        this.setState({ currentBroadcast: null })
                    }
                }
                           
            }) 

    }


    getGeoFencesFromBroadCast = (broadcast) => {
        console.log("getGeoFencesFromBroadCast")
        let geofenceArray = []
        broadcast.messages.map(message => geofenceArray = [...geofenceArray, message.geofence])
        console.log("HELLO FROM GET GEOFENCES:", geofenceArray)
        this.makePolygons(geofenceArray)
      }

    
    makePolygons = (geofenceArray) => {
        geofenceArray.map(geofence => {
            const decodedGeofence = decodeGeoCode(geofence)
            // console.log("DECODED GEO-FENCE:", decodedGeofence)
            this.setState({
            polygonsCoords: [...this.state.polygonsCoords, decodedGeofence]
            })
        })
    }

    renderPolygonsOnMap = () => {

        const formattedPolygons = this.state.polygonsCoords.map((poly, idx) => {
            return poly.map(coord => 
                { return { lat: coord.latitude, lng: coord.longitude } })
        }
        )

        return formattedPolygons.map((coords, idx) => 
        (    <Polygon
                path={coords}
                key={idx}
                options={{
                    fillColor: "#000",
                    fillOpacity: 0.4,
                    strokeColor: "#4c75c2",
                    strokeOpacity: 1,
                    strokeWeight: 1
                }}
            />
            )
        )
          
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
                    currentBroadcast: broadcast,

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
            .then(message => this.setState({
                messageText: "",
                fence: null,
                showModal: false,
                renderNewMessages: true,
                newBroadCastMessages: [...this.state.newBroadCastMessages, message]
            }, console.log("HELLO FROM INSIDE ADD MESSAGE:", this.state.newBroadCastMessages)))

        // this.setState({
        //     messageText: "",
        //     fence: null,
        //     showModal: false,
        // })
    }

    saveBroadcast = () => {
        API.saveBroadCast(this.state.currentBroadcast.id)
            .then(this.setState({ currentBroadcast: null }))
    }

    cancelBroadcast = () => {
        API.deleteBroadcast(this.state.currentBroadcast.id)
            .then(this.setState({ currentBroadcast: null }))   
    }

    removeMessage = (message) => { 
        const msgs = this.state.newBroadCastMessages.filter(msg => msg.id !== message.id)
        this.setState({ newBroadCastMessages: msgs })
        API.removeMessage(message.id)
    }

    editMessage = (message) => {

        console.log("INSIDE EDIT MESSAGE:", message)

        this.setState({ 
            editModal: true,
            editText: message.content, 
            messageToEdit: message
        })  
    }

    handleMessageSubmitEdit = () => {

        const messages = this.state.newBroadCastMessages
        const idx = messages.findIndex(msg => msg.id === this.state.messageToEdit.id);
        API.editMessage(this.state.editText, this.state.messageToEdit.id)
            .then(message => 

                this.setState({
                    newBroadCastMessages: [...messages.slice(0, idx), message, ...messages.slice(idx + 1)],
                    editModal: false,
                    editText: "",
                    messageToEdit: null,
                    renderEditedMessages: true,
                })
                
        )

    }
        

    render () {

        // console.log("RENDER:", this.state.polygonsCoords)
        // console.log(this.state.showBroadcastModal)
        // console.log("RENDER:", this.state.newBroadCastMessages)
        console.log("EDITED MESSAGES?", this.state.renderEditedMessages)

        const {user, userObject} = this.props
        const {renderPolygonsOnMap,
                renderNewMessages,
                currentBroadcast,
                renderMap,
                showModal,
                newBroadCastPin,
                showBroadcastModal,
                center,
                content,
                messageText,
                newBroadCastMessages,
                newBroadCastName, 
                editText,
                editModal,
                renderEditedMessages,
            } = this.state


        return (

            <div className="main-container"> 

                <div className="map-section">

                    { showModal || showBroadcastModal ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

                    <button onClick={() => this.createNewBroadcast()}
                    className={'create-new-broadcast' + (currentBroadcast ? '-hide' : "")}
                    >Create new Broadcast</button>

                    {
                        currentBroadcast && 
                        <div className="map-container-parent" >
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
                                polygons={this.state.polygons}
                                renderPolygonsOnMap={this.renderPolygonsOnMap}
                            />
                        </div>
                    }
                    
                    <Modal
                        className="modal"
                        showMessageModal={showModal}
                        showBroadcastModal={showBroadcastModal}
                        showEditModal={editModal}
                        close={this.closeModalHandler}
                        handleMessageSubmit={this.handleMessageSubmit}
                        handleBroadcastSubmit={this.handleBroadcastSubmit}
                        handleMessageSubmitEdit={this.handleMessageSubmitEdit}
                    >

                        {
                            showModal &&
                            <form id="message-form" className="message-form">
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
                            <form className="broadcast-form-el">
                                <div>
                                    <label>Name your broadcast</label>
                                    <input
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
                                        name="newBroadCastPin"
                                        type="number"
                                        value={newBroadCastPin}
                                        onChange={this.handleChange}
                                        required 
                                    />
                                </div>
                            </form>
                        }

                        {
                            editModal &&
                            <form className="edit-form">
                                <div>
                                    <textarea
                                        name="editText"
                                        onChange={this.handleChange}
                                        required 
                                        value={editText}
                                    >
                                    {editText && editText}
                                    </textarea>
                                </div>
                            </form>
                        }
                                       
				    </Modal>

                </div>

                {
                    currentBroadcast && 
                        <BroadCast
                            newBroadCastMessages={newBroadCastMessages}
                            renderNewMessages={renderNewMessages}
                            saveBroadcast={this.saveBroadcast}
                            currentBroadcast={currentBroadcast}
                            cancelBroadcast={this.cancelBroadcast}
                            removeMessage={this.removeMessage}
                            editMessage={this.editMessage}
                            renderEditedMessages={renderEditedMessages}
                        />
                }
                
              
            
            </div>
        )
    }

}

export default DashBoard