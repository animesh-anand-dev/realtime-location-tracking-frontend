import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Initialize the Google Maps API Loader
        let map;
        const loader = new Loader({
            apiKey: 'AIzaSyC7DtKqWoAtgKFmYtUu-PceyA7bV1Y9NTU', // Replace with your Google Maps API key
            version: 'weekly',
        });

        // Load the Google Maps API and initialize the map
        // loader.load().then(() => {
        //     const map = new window.google.maps.Map(mapContainerRef.current, {
        //         center: { lat: 12.9138678, lng: 77.57824 }, // Initial center of the map
        //         zoom: 8, // Initial zoom level
        //     });

        //     // You can customize the map further here, such as adding markers, shapes, etc.
        // });

        loader.load().then(async () => {
            const { Map } = await window.google.maps.importLibrary("maps");
          
            var googlePos = { lat :-34.397, lng: 150.644};
    console.log(googlePos)
    var mapOptions = {
      zoom: 16,
      center: googlePos,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
            map = new Map(mapContainerRef.current, mapOptions);

            var icon = { // car icon
				path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
				scale: 0.6,
				fillColor: "#32a852", //<-- Car Color, you can change it 
				fillOpacity: 1,
				strokeWeight: 1,
				anchor: new window.google.maps.Point(0, 5),
			};

            var markerOpt = {
				map: map,
				position: { lat: -34.397, lng: 150.644 },
				title: 'Hi , I am here',
				icon: icon,
				//rotation: googlePos.heading //<-- Car angle
			};

            var googleMarker = new window.google.maps.Marker(markerOpt);


          });


        // Cleanup function
        return () => {
            // Optionally, perform any cleanup operations when the component unmounts
        };
    }, []);

    return <div id='map' ref={mapContainerRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default GoogleMap;
