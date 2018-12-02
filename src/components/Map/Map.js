/*global google*/
// import React from 'react';
// import {
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   withScriptjs,
//   Polygon
// } from 'react-google-maps';
// const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

// const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8`;


// const MapWithADrawingManager = withScriptjs(withGoogleMap(props => (
  
//   <GoogleMap
//     defaultZoom={15}
//     center={props.center}
//   >
//     <DrawingManager
//       defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
//       defaultOptions={{
//         drawingControl: true,
//         drawingControlOptions: {
//           position: google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: [
//             google.maps.drawing.OverlayType.POLYGON,
//           ],
//         },
//         polygonOptions: {
//           fillColor: '#4c75c2',
//           fillOpacity: 0.3,
//           strokeWeight: 2,
//           clickable: false,
//           editable: true,
//           zIndex: 1
//         }
//         ,
//       }}
//       onPolygonComplete={props.doneDrawing}
//     />

//     {props.center.lat && props.center.lng && 
//       <Marker position={props.center} />       
//     }
//     {props.renderPolygonsOnMap()}
//   </GoogleMap>
// )));

// export default MapWithADrawingManager


import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

// const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8`;
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8&v=3.exp&libraries=geometry,drawing,places"

const MapWithADrawingManager= compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }}/>,
    containerElement: <div className="map-container" /> ,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 51.520534, lng: -0.087613
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search locations"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
          ],
        },
        polygonOptions: {
          fillColor: '#4c75c2',
          fillOpacity: 0.3,
          strokeWeight: 2,
          clickable: false,
          editable: true,
          zIndex: 1
        }
        ,
      }}
      onPolygonComplete={props.doneDrawing}
    />
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
    {
      console.log("HELLO FROM MAP:", )
    }

  
  {props.renderPolygonsOnMap()}
  </GoogleMap>
);

export default MapWithADrawingManager



