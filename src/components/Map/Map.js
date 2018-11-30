/*global google*/
import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
  Polygon
} from 'react-google-maps';
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8`;


const MapWithADrawingManager = withScriptjs(withGoogleMap(props => (
  
  <GoogleMap
    defaultZoom={15}
    center={props.center}
  >
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

    {props.center.lat && props.center.lng && 
      <Marker position={props.center} />       
    }
    {props.renderPolygonsOnMap()}
  </GoogleMap>
)));

export default MapWithADrawingManager









// const { compose, withProps } = require("recompose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } = require("react-google-maps");
// const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


// const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDXHHDfZvn2QHX42Uwacjmo1PuVfjBsjI8`;

// const MapWithADrawingManager = compose(
//   withProps({
//     googleMapURL: googleMapURL,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     defaultZoom={8}
//     center={props.center}
//     stuff={console.log(props)}
//   >
//     <DrawingManager
//       defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
//       defaultOptions={{
//         drawingControl: true,
//         drawingControlOptions: {
//           position: google.maps.ControlPosition.TOP_CENTER,
//           drawingModes: [
//             // google.maps.drawing.OverlayType.CIRCLE,
//             google.maps.drawing.OverlayType.POLYGON,
//             // google.maps.drawing.OverlayType.POLYLINE,
//             // google.maps.drawing.OverlayType.RECTANGLE,
//           ],
//         },
//         circleOptions: {
//           fillColor: `#ffff00`,
//           fillOpacity: 1,
//           strokeWeight: 5,
//           clickable: false,
//           editable: true,
//           zIndex: 1,
//         },
//       }}
//       onPolygonComplete={props.doneDrawing}
//     />
//     {props.center.lat && props.center.lng && (
//       <Marker position={props.center} />
//     )}
//   </GoogleMap>
// );

// export default MapWithADrawingManager