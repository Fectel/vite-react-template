import { useEffect, useState} from "react";
import React from "react";

import GooglePlacesAutoComplete from "../google-places-auto-complete/google-places-auto-complete.jsx";
import GoogleMapsAndDirections from "../google-maps-and-directions/google-maps-and-directions";

export default function Intro({addressConfirmed,  setAddressDistance, setAddressTravelTime,setAddressCont,setAddressConfirmed, setCurrentBookingStep, currentBookingStep}){

    const position = {lat: 33.494990, lng: -112.183880}


    const [address, setAddress ] = useState("")
    const [displayAddress, setDisplayAddress ] = useState("")
    const [coordinates, setCoordinates ] = useState({
        lat: 33.4484,
        lng: -112.0740
    });
    const [destination, setDestination ] = useState("")
    const [directionsArray, setDirectionsArray ] = useState([""])
    const [ mainLeg, setMainLeg ] = useState([]);


    let map1, map2;

    // async function initMap() {
    //     const { Map } = await window.google.maps.importLibrary("maps");
    //
    //     map1 = new Map(document.getElementById("map1"), {
    //         center: {   lat: 33.4484,
    //             lng: -112.0740 },
    //         zoom: 8,
    //     });
    //     map2 = new Map(document.getElementById("map2"), {
    //         center: {   lat: 33.4484,
    //             lng: -112.0740 },
    //         zoom: 8,
    //     });
    // }
    //
    // initMap();

    useEffect(() => {
        console.log(address, displayAddress, coordinates, directionsArray, mainLeg)

    },[mainLeg])
    //

    return (

                  <div  style={{
                      backgroundColor: "#490411",

                      margin: "2em auto",width: "100%", height: "fit-content"}}>

                      {/*{directionsArray[0] !== "" && (*/}

                          <GoogleMapsAndDirections coordinates={coordinates}
                                                   address={address}
                                                   directionsArray={directionsArray}
                                                   setDirectionsArray={setDirectionsArray}
                                                   mainLeg={mainLeg}
                                                   setMainLeg={setMainLeg}

                          />

                      {/*)}*/}

                  {/*<GoogleMapsAndDirections coordinates={coordinates}*/}
                  {/*address={address}*/}
                  {/*/>*/}


                      <GooglePlacesAutoComplete
                          coordinates={coordinates}
                          setCoordinates={setCoordinates}
                          setAddress={setAddress}
                          address={address}
                          displayAddress={displayAddress}
                          setDisplayAddress={setDisplayAddress}
                          setDirectionsArray={setDirectionsArray}
                          directionsArray={directionsArray}
                          mainLeg={mainLeg}
                          addressConfirmed={addressConfirmed}
                          setAddressConfirmed={setAddressConfirmed}
                          setCurrentBookingStep={setCurrentBookingStep}
                          currentBookingStep={currentBookingStep}
                          setAddressCont={setAddressCont}
                          setAddressTravelTime={setAddressTravelTime}
                          setAddressDistance={setAddressDistance}




                      />
                      {/*{directionsArray?.map((direction, i) => (*/}
                      {/*    <div*/}
                      {/*    key={i}*/}
                      {/*    >{direction.location}</div>*/}
                      {/*))}*/}
                      {/*{mainLeg[0]?.legs && (*/}
                      {/*    <div>*/}

                      {/*    <div>{mainLeg[0].legs[0].distance.text}</div>*/}
                      {/*    <div>{mainLeg[0].legs[0].duration.text}</div>*/}


                      {/*    </div>*/}
                      {/*)}*/}
                  </div>

    )
}

function savedDirectionComponent(){

}