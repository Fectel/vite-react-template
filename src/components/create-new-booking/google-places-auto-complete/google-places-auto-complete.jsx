import React, {useState} from "react";
import "./google-places-auto-complete.styles.scss"
import  {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
const GooglePlacesAutoComplete = ({

                                      displayAddress,
                                      setDisplayAddress,
                                      address,
                                      setAddress,


}) => {
    const [coordinates, setCoordinates ] = useState({
        lat: 33.4484,
        lng: -112.0740
    });
    const [customZoom, setCustomZoom] = useState(9)


    const containerStyle = {
        width: '80vw',
        height: '250px',
        margin: "auto",
    };

    const center = {
        lat: coordinates.lat,
        lng: coordinates.lng
    };



    const handleSelect = async (value ) => {

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng)
        setCustomZoom(17)
        setDisplayAddress(true)
    };



    return(<div style={{
        height: "30em"
    }}>
    {/*    <Intro*/}

    {/*/>*/}

    </div>)
    // return (
    //     <div className="google-places-autocomplete-container-div">
    //         {displayAddress && (
    //             <div style={{display: "flex", flexDirection: "column"}}>
    //                 <div className="address-display-google">
    //                     {address}
    //                 </div>
    //
    //             </div>
    //         )}
    //
    //
    //
    //
    //             <div>
    //                 <PlacesAutocomplete
    //                     value={address}
    //                     onChange={setAddress}
    //                     onSelect={handleSelect}>
    //
    //                     {({getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    //                         <div >
    //
    //
    //                             <input className="type-address-input"
    //                                    {...getInputProps({placeholder: "Type address"})}/>
    //
    //                             <div>
    //                                 {/*{loading ? <div>...loading</div>: null}*/}
    //
    //
    //                                 {suggestions.map(suggestion => {
    //
    //                                     const style = {
    //                                         backgroundColor: suggestion.active ? "#490411" : "#fff",
    //                                         color: suggestion.active ? "#fff" : "black",
    //                                         cursor: "pointer"
    //                                     }
    //
    //                                     return <div {...getSuggestionItemProps(suggestion, {style})}>
    //                                         {suggestion.description}
    //                                     </div>;
    //                                 })}
    //                             </div>
    //                         </div>
    //                     )}
    //
    //
    //                 </PlacesAutocomplete>
    //
    //                 <div className="google-map-container-div">
    //                     <GoogleMap
    //                         mapContainerStyle={containerStyle}
    //                         center={center}
    //                         zoom={customZoom}
    //                         defaultOptions={{
    //                             mapTypeId: "satellite",
    //
    //                         }}
    //
    //
    //
    //
    //                     >
    //                         <Marker position={{ lat: coordinates.lat, lng: coordinates.lng}}/>
    //                     </GoogleMap>
    //                 </div>
    //
    //             </div>
    //
    //
    //
    //
    //
    //
    //     </div>
    // )
}

export default GooglePlacesAutoComplete;