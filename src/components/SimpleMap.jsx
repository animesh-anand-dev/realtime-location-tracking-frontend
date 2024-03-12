import React from "react";
import GoogleMapReact from 'google-map-react';
import { useGeoLocation } from "../hooks/useGeolocation";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
    const { location, error, refresh } = useGeoLocation();
    if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!location) {
        return <div>Loading...</div>;
       }
  
  const defaultProps = {
    center: {
      lat: location.latitude,
      lng: location.longitude
    },
    zoom: 15
  };


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC7DtKqWoAtgKFmYtUu-PceyA7bV1Y9NTU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}