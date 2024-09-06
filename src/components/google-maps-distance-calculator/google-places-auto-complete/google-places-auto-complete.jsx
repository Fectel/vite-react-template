import React, {useEffect, useState} from "react";
import "./google-places-auto-complete.styles.scss"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import {shareOutline} from "ionicons/icons";

import { GoogleMap, Marker } from '@react-google-maps/api';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon,} from "@ionic/react";

const GooglePlacesAutoComplete = ({
    setDirectionsArray, directionsArray, setCurrentBookingStep, currentBookingStep,
setAddressTravelTime, setAddressDistance,
                                      displayAddress, setAddressCont,
                                      setDisplayAddress,
                                      address,
                                      setAddress,
    coordinates, setCoordinates, setAddressConfirmed,mainLeg, addressConfirmed

}) => {



    const [addressedSaved, setAddressSaved ] = useState(false)
    // const [coordinates, setCoordinates ] = useState({
    //     lat: 33.4484,
    //     lng: -112.0740
    // });
    const [customZoom, setCustomZoom] = useState(9)


    const containerStyle = {
        width: '100%',
        height: '18em',
        margin: "auto",
    };

    const center = {
        lat: coordinates.lat,
        lng: coordinates.lng
    };


    console.log("AUTOCOMPLET")

    useEffect(() => {
                   console.log(mainLeg)
    },[mainLeg])

    const handleSelect = async (value ) => {

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng)
        setCustomZoom(16)
        setDisplayAddress(true)
    };


    function onSaveAddressClick(address) {
        console.log(address, mainLeg)
            setDirectionsArray([
                {
                    location : address,
                    stopover: true,
                }])
        // setCoordinates(
        //     {
        //         lat: 33.4484,
        //         lng: -112.0740
        //     }
        // )
        //bug here i have to rese the address in order to sho distance and duration
        let newAddy = address;
        setAddress([newAddy])

        // setCustomZoom(9)
        // setDisplayAddress(false)
        setAddressConfirmed(true);
        console.log(address, mainLeg)



    }
    function onAddressIncorrectClick(){
        setAddress("");
        setCoordinates(
            {
                lat: 33.4484,
                lng: -112.0740
            }
        )
        setCustomZoom(9)
        setDisplayAddress(false)
    }
    function saveAndChangeBookingStep(){

    }
    function renderLongDistanceFee(distNum, hrs,min ){
        console.log(distNum, hrs, min)
        let fee;

        if (distNum > 35 && distNum< 45 ){
            fee = 40;

        }else if (distNum > 45 && distNum < 53 ){
            fee = 80;

        }else if (distNum > 53 && distNum < 75 ){
            fee = 120;

        }else if (distNum > 75 && distNum < 80 ){
            fee = 140;

        }else if (distNum > 80 && distNum < 90 ){
            fee = 160;

        }else if (distNum > 90 && distNum < 110 ){
            fee = 180;

        }else if (distNum > 110 && distNum < 130 ){
            fee = 200;

        }else if (distNum > 130 && distNum < 150 ){
            fee = 220;

        }else if (distNum > 150 && distNum < 165 ){
            fee = 250;

        }else if (distNum > 165 && distNum < 180 ){

            fee = 280;

        }
        else if (distNum > 180 && distNum < 190 ){
            fee = 300;

        }else if (distNum > 190 && distNum < 220 ){
            fee = 330;

        }else if (distNum > 220 && distNum < 230 ){
            fee = 350;

        }

        if ( distNum > 230){
            return (<div style={{textAlign: "center", fontSize:"1.1rem"}}>
                <div>{mainLeg[0].legs[0].distance.text}</div>

                Your location is too far from us sorry!
                <div>
                    {/*<IonButton>Can</IonButton>*/}
                </div>
            </div>)
        }
        else {
            return (

                <IonCard style={{display: "flex", flexDirection: "column", width: "95%", margin: "auto"}}>
                    <IonCardHeader style={{
                        backgroundColor: "#ec270c"
                    }}>

                        <IonCardTitle style={{margin:"auto", fontSize:"1.5rem", color: "white", textAlign: "center"}}>
                            Out of Town Fee

                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div style={{
                            textAlign: "center",
                            margin: "auto",
                            color: "black",
                            // width: fit-content;
                            padding: "1em",
                            // font-weight: bold;
                            fontSize: "1.3em",
                            // border:" solid thick blue",
                            // width: 100%;
                        }}>
                            {address}
                        </div>
                        <div style={{textAlign: "center", fontSize: "1.1rem"}}>

                            <div>{mainLeg[0].legs[0].distance.text}</div>
                            <div>{mainLeg[0].legs[0].duration.text}</div>
                            {distNum > 35 && (
                                <div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>3 & 4 Mariachis</div>
                                        <div>
                                            ${fee}
                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>5 Mariachis</div>
                                        <div>
                                            ${fee + (fee / 4)}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>6 Mariachis</div>
                                        <div>
                                            ${fee + (2 * (fee / 4))}

                                        </div>
                                    </div> 
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>7 Mariachis</div>
                                        <div>
                                            ${fee + (3 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>8 Mariachis</div>
                                        <div>
                                            ${fee + (4 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>8 Mariachis</div>
                                        <div>
                                            ${fee + (5 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 4em"}}>
                                        <div>10 Mariachis</div>
                                        <div>
                                            ${fee + (6 * (fee / 4))}

                                        </div>
                                    </div>

                                </div>
                            )}

                        </div>
                    </IonCardContent>
                </IonCard>
            )
        }

    }

    function renderSavedAddress() {



        if (addressConfirmed &&  mainLeg[0]?.legs){
            console.log(address, mainLeg)
            let addy = [...address]
            console.log(addy)

            setAddressDistance(mainLeg[0].legs[0].distance.text)
            setAddressTravelTime(mainLeg[0].legs[0].duration.text)
            setAddressCont(address)
            const dur = mainLeg[0].legs[0].duration.text;

            const dist = mainLeg[0].legs[0].distance.text;
            const distNum =  mainLeg[0].legs[0].distance.text.substring(0, dist.indexOf(' '));
            const durHr =  mainLeg[0].legs[0].distance.text.substring(0, dur.indexOf('hours'));
            const distHrs =  dur.substring(0, dur.indexOf(' ')  );
            const distHours =  mainLeg[0].legs[0].duration.text.substring(0, dur.indexOf(" ",distHrs) );
            console.log(distNum)
            console.log(distHours )

            const min =  dur.substring(0, dur.indexOf('mins')  );
            console.log(distNum)
            console.log(distHours,"-" , min , "minutes")
            let fee;
            if ( distNum > 35) {
                return (<div>
                    {renderLongDistanceFee(distNum, distHours, min)}
                </div>)

            }else{
                let newAddy = address;
                setAddress([newAddy])
                setAddressCont(address)
                setAddress(address)
                setCurrentBookingStep(currentBookingStep + 1)
            }
        }else if(addressConfirmed){
            console.log("Save Address!")
            // setCurrentBookingStep(currentBookingStep + 1)
            console.log(address, mainLeg)
            // let newAddy = address;
            // setAddress([newAddy])
            // setAddressCont(address)
            // setAddress(address)
            // setAddressDistance(0)
            setAddressTravelTime("0 hrs 0 minutes")
            // return (
            //     <IonCard style={{display: "flex", flexDirection: "column", width: "100%"}}>
            //         <IonCardHeader style={{
            //             backgroundColor:  ("#490411")
            //         }}>
            //
            //             <IonCardTitle style={{margin:"auto", fontSize:"1.5rem", color: "white", textAlign: "center"}}>
            //                 Is this the correct address?
            //
            //             </IonCardTitle>
            //
            //
            //         </IonCardHeader>
            //         <IonCardContent>
            //             <div style={{
            //                 textAlign: "center",
            //                 margin: "auto",
            //                 color: "black",
            //                 // width: fit-content;
            //                 padding: "1em",
            //                 // font-weight: bold;
            //                 fontSize: "1.3em",
            //                 // border:" solid thick blue",
            //                 // width: 100%;
            //             }}>
            //                 {address}
            //             </div>
            //
            //
            //             <div style={{width:"fit-content", margin: "auto"}}>
            //                 <IonButton onClick={() => onAddressIncorrectClick()} color="danger">No, Try Again</IonButton>
            //                 <IonButton onClick={() => onSaveAddressClick(address)}>Yes</IonButton>
            //                 <IonButton color="secondary"
            //                            onClick={() => {navigator.clipboard.writeText(address)}}
            //
            //                 ><IonIcon icon={shareOutline} />Copy</IonButton>
            //             </div>
            //
            //
            //         </IonCardContent>
            //
            //
            //     </IonCard>
            // )
        }else{
            console.log("ELSE!")
            function onCorrectAddressClick(){
                // console.log(mainLeg[0].legs[0].distance.text)
                // console.log(mainLeg[0].legs[0].duration.text)
                // setCurrentBookingStep(currentBookingStep + 1)
                setAddressConfirmed(true)
                console.log(address)
                let newAddy = address;
                setAddress([newAddy])
                setAddressCont(address)
                setDirectionsArray([
                    {
                        location : address,
                        stopover: true,
                    }])
                // setAddress(address)
                // setAddressDistance(0)
                // setAddressTravelTime("0 hrs 0 minutes")
            }

            return (
                <IonCard style={{display: "flex", flexDirection: "column", width: "95%", margin:"auto"}}>
                    <IonCardHeader style={{
                        backgroundColor:  ("#490411")
                    }}>

                        <IonCardTitle style={{margin:"auto", fontSize:"1.5rem", color: "white", textAlign: "center"}}>
                            Is this the correct address?

                        </IonCardTitle>


                    </IonCardHeader>
                    <IonCardContent>
                        <div style={{
                            textAlign: "center",
                            margin: "auto",
                            color: "black",
                            // width: fit-content;
                            padding: "1em",
                            // font-weight: bold;
                            fontSize: "1.3em",
                            // border:" solid thick blue",
                            // width: 100%;
                        }}>
                            {address}
                        </div>


                        <div style={{width:"fit-content", margin: "auto"}}>
                            <IonButton onClick={() => onAddressIncorrectClick()} color="danger">No, Try Again</IonButton>
                            <IonButton onClick={() => onCorrectAddressClick()}>Yes</IonButton>
                            <IonButton color="secondary"
                                       onClick={() => {navigator.clipboard.writeText(address)}}

                            ><IonIcon icon={shareOutline} />Copy</IonButton>
                        </div>


                    </IonCardContent>


                </IonCard>
            )
        }

    }


    console.log(address)
    return (


        <div >

                <div style={{display: "flex", flexDirection: "column", margin: "auto",
                    backgroundColor:"white"
                    // padding:"1em",

                }}>
                    {!mainLeg[0]?.legs && (
                        <div>

                            <PlacesAutocomplete
                                // style={{backgroundColor: "red"}}
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}>

                                {({getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                                    <div style={
                                        {
                                            // backgroundColor:"blue",
                                            // width:"90vw",
                                            width:"100%",
                                            // padding:".3em",

                                            margin: "auto"
                                        }}>
                                        {!displayAddress && (
                                            <div>
                                                <input style={{
                                                    width: "100%",
                                                    // marginLeft: "1em",
                                                    margin:".3em auto",
                                                    height:"3em"

                                                }}
                                                       {...getInputProps({placeholder: "Type address"})}/>

                                                <div>
                                                    {/*{loading ? <div>...loading</div>: null}*/}


                                                    {suggestions.map(suggestion => {

                                                        const style = {
                                                            backgroundColor: suggestion.active ? "#490411" : "#fff",
                                                            color: suggestion.active ? "#fff" : "black",
                                                            cursor: "pointer"
                                                        }

                                                        return <div {...getSuggestionItemProps(suggestion, {style})}>
                                                            {suggestion.description}
                                                        </div>;
                                                    })}
                                                </div>

                                            </div>
                                        )}


                                    </div>
                                )}
                            </PlacesAutocomplete>
                            {/*<div*/}
                            {/*>*/}
                        </div>
                    )}

                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        // center={ displayAddress ? (displayAddress):(center) }
                        zoom={customZoom}
                        defaultOptions={{
                            mapTypeId: "satellite",

                        }}
                    >
                        <Marker position={{ lat: coordinates.lat, lng: coordinates.lng}}/>
                    </GoogleMap>
                    {address && (
                        <div style={{
                            textAlign: "center",
                            margin: "auto",
                            color: "black",
                            // width: fit-content;
                            padding: "1em",
                            // font-weight: bold;
                            fontSize: "1.3em",
                            // border:" solid thick blue",
                            // width: 100%;
                        }}>
                            {address}
                        </div>

                    )}
                    {/*</div>*/}
                    {displayAddress && (
                        <div>{renderSavedAddress()}</div>
                    )}




                </div>






        </div>
    )
}

export default GooglePlacesAutoComplete;