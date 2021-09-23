import {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long
    }))
 

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
       <ReactMapGL
       mapStyle="mapbox://styles/baralprabin/cktwgcoij0r3517m0deybyr49"
       mapboxApiAccessToken={process.env.mapbox_key}
       {...viewport}
       onViewportChange={(nextViewport) => setViewport(nextViewport)}>
           {searchResults.map(result => (
               <div key={result.long}>
                   <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-20}>
                        <p 
                           role="img"
                           aria-label="push-pin" 
                           onClick={()=> setSelectedLocation(result)} 
                           className="text-2xl animate-bounce cursor-pointer">📌</p>
                    </Marker>
                    {/* The popup that should show if we click on Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                         onClose={() => setSelectedLocation({})}
                         CloseOnClick={true}
                         latitude={result.lat}
                         longitude={result.long}>{result.title}</Popup>
                    ): (
                        false
                    )}
               </div>
           ))}

       </ReactMapGL>
    )
}

export default Map
