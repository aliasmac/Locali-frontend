import React from 'react'
import API from '../../API'
import './DashBoard.css'

import MapWithADrawingManager from '../Map/Map'

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
            content: 'Getting position...',
            insideFence: false,
            previousPolygon: null,
            fence: null,
            watchID: null,
            lastFetched: null,
          };

    }


    doneDrawing(polygon) {
        console.log("Hello from inside", polygon)
        /* 
        - When the method is called, call another function that add a modal to the screen
        - The modal should be a form and have field for a message 
        - on submit, that message and the polygon data should be added to a broadcasts array and appear as a list item in the RHS
        - then on submit, another modal should appear that prompts the user to add a pin to the broadcast, then another
          confirm button should persist the broadcast to the database with a post request 


        Mobile side
        - A user add a broadcast by submitting a pin 
        - then I need to fetch the brodcast from the server where the pin matches using find method
        - then i need to iterate over the response, and display all the positions in the broadcast on the map, in radial format?
        - I then need to set methods that listens form a user position via the phones GPS tracking   

        */

        // if (this.state.previousPolygon) {
        //   this.state.previousPolygon.setMap(null);
        // }
    
        // this.setState({previousPolygon: polygon});
    
        // this.setState({
        //   fence: new google.maps.Polygon({
        //     paths: polygon.getPaths(),
        //   }),
        // });
    
        // this.checkGeofence();
      }
    

    render () {
        const {username, renderMap, renderMapInDashboard} = this.props
        return (
            <div> 
                <h1>Hi {username}, welcome to your dashboard</h1>
                <h3>Instructions:</h3>
                <p> 1. Click 'Start' to begin a new broadcast</p>
                <p> 2. Select a location from the map below</p>
                <p> 3. Add a message</p>
                <p> 4. Save it to your broadcast</p>
                <button onClick={() => renderMapInDashboard()}>Start</button>
                
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

            </div>
        )
    }

}

export default DashBoard