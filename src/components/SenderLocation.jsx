import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader';
import {postData} from '../services/apiConnector';

const SenderLocation = () => {

  var watchId = null;
  function geoloc() {
    if (navigator.geolocation) {
      var optn = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
      };
      watchId = navigator.geolocation.watchPosition(showPosition, showError, optn);
    } else {
      alert('Geolocation is not supported in your browser');
    }
  } 

  function showPosition(position) {

    const data = {
      name : "Animesh", 
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude, 
      heading: position.coords.heading
    };
    const res = postData("https://realtime-location-tracking.onrender.com/location", data);
    console.log(res);
    // Initialize the Google Maps API Loader
    let map;
    const loader = new Loader({
        apiKey: 'AIzaSyC7DtKqWoAtgKFmYtUu-PceyA7bV1Y9NTU', // Replace with your Google Maps API key
        version: 'weekly',
    });

    // Load the Google Maps API and initialize the map
    loader.load().then(async () => {
      const { Map } = await window.google.maps.importLibrary("maps");
      
    var googlePos = { lat :position.coords.latitude, lng: position.coords.longitude, heading: position.coords.heading};
    console.log(googlePos)
    var mapOptions = {
      zoom: 16,
      center: googlePos,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
    var mapObj = document.getElementById('mapdiv');
      map = new Map(mapObj, mapOptions);
      var icon = { // car icon
        path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
        scale: 0.6,
        fillColor: "#32a852", //<-- Car Color, you can change it 
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new window.google.maps.Point(0, 5),
      };
      var icon2 = { // car icon
        path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
        scale: 0.6,
        fillColor: "#fc0362", //<-- Car Color, you can change it 
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new window.google.maps.Point(0, 5),
      };
  
      var markerOpt = {
        map: map,
        position: googlePos,
        title: 'Hi , I am here',
        icon: icon,
        rotation: googlePos.heading //<-- Car angle
      };

      var markerOpt2 = {
        map: map,
        position: {lat: 12.971599, lng: 77.594566, heading: 30},
        title: 'Hi , I am here',
        icon: icon2,
        rotation: 40 //<-- Car angle
      };
      console.log(googlePos)
  
      var googleMarker1 = new window.google.maps.Marker(markerOpt);
      var googleMarker2 = new window.google.maps.Marker(markerOpt2);

    });

    

  }

  function showError(error) {
    var err = document.getElementById('mapdiv');
    switch (error.code) {
      case error.PERMISSION_DENIED:
        err.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        err.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        err.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        err.innerHTML = "An unknown error occurred."
        break;
    }
  };

  useEffect(() => {
    geoloc();
    // Prevent page reload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      navigator.geolocation.clearWatch(watchId);
      // You can also provide a message to display to the user before they leave the page
      event.returnValue = ''; // Some browsers require this to be set
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Clean up function
  return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Clear the watch position when the component unmounts
      navigator.geolocation.clearWatch(watchId);
  };
  },[])

  return (
    <div id='mapdiv' style={{ width: '100wh', height: '100vh' }} >

    </div>
  )
}

export default SenderLocation