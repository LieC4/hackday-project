import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 52.341049078492965,
  lng: 4.823559592780374
};



function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBu5AqEhZeDOrm4bi9m5vVjsxZ22iWrij4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

// /*global google*/
// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '30%'
// };

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false, // Hides or shows the InfoWindow
//     activeMarker: {}, // Shows the active marker upon click
//     selectedPlace: {},
//     markerName: "Vendor XYZ's Location",
//     center: {
//       lat: -1.2884,
//       lng: 36.8233
//     }
//   };

//   componentDidMount = () => {
    //Geocoding services
//     const geocoder = new google.maps.Geocoder();
//     const address = 'New York';
//     geocoder.geocode({ address: address }, (results, status) => {
//       if (status === 'OK') {  
//         this.setState({
//           center: results[0].geometry.location,
//           markerName: results[0].formatted_address
//         });
//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//       }
//     });
//   };
//   onMarkerClick = (props, marker, e) => {
//     console.log(props);
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
//   };

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={this.state.center}
//         center={this.state.center}
//       >
//         <Marker
//           position={this.state.center}
//           onClick={this.onMarkerClick}
//           name={this.state.markerName}
//         />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'YOUR_KEY'
// })(MapContainer);