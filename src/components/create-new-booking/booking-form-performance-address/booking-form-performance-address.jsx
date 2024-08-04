import React, { useState} from "react";
import {IonButton,   IonIcon,} from "@ionic/react";
import {arrowBack, } from "ionicons/icons";
import Intro from "../../google-maps-distance-calculator/google-maps-vis.gl/google-maps-vis-gl";


const BookingFormPerformanceAddress = ({
                                           setCurrentBookingStep,
                                           currentBookingStep,
                                           setPerformanceAddress,
                                           performanceAddress, setAddress, setAddressDistance, setAddressTravelTime
                                       }) => {


    const [displayAddress, setDisplayAddress] = useState(false)
    console.log(displayAddress, performanceAddress,)
    const [ addressConfirmed, setAddressConfirmed ] = useState(false)


    return (
        <div >
            <h2 style={{ textAlign: "center"}}>Performance Address</h2>
            {/*<GooglePlacesAutoComplete*/}
            {/*    address={performanceAddress}*/}
            {/*    displayAddress={displayAddress}*/}
            {/*    setDisplayAddress={setDisplayAddress}*/}
            {/*    setAddress={setPerformanceAddress}*/}

            {/*/>*/}
            <Intro
                setAddressConfirmed={setAddressConfirmed}
                addressConfirmed={addressConfirmed}
                setCurrentBookingStep={setCurrentBookingStep}
                currentBookingStep={currentBookingStep}
                setAddressCont={setAddress}
                setAddressTravelTime={setAddressTravelTime}
                setAddressDistance={setAddressDistance}
            />
            <div style={{display:"flex", justifyContent: "space-evenly"}}>
                <div >
                        <IonButton fill="outline" color="secondary" onClick={() => setCurrentBookingStep(currentBookingStep -1)}><IonIcon icon={arrowBack}></IonIcon>Back</IonButton>

                </div>
                <div style={{display:"flex"}}>
                    <IonButton
                        disabled={!addressConfirmed}
                        expand="block" onClick={() => setCurrentBookingStep(2)} fill="solid" color="secondary" >Save & Continue</IonButton>


                </div>
            </div>
        </div>

    )
}

export default BookingFormPerformanceAddress;