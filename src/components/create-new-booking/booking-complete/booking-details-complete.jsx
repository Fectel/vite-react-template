import React from "react"
import {IonButton ,IonIcon} from "@ionic/react";

import { newspaperOutline} from "ionicons/icons";

export default function BookingDetailsComplete(){

    function onContinueButtonClick(){
        window.location.href = '/client-dashboard';

    }
    return (

        <div>
            {/*<HeaderWithoutImg />*/}
                <div style={{
                    // border: "solid thick #FFD454",
                    // backgroundColor: "#490411",
                    backgroundColor: "white",
                    // minWidth: "20em",
                    margin:"1em auto", width: "100$"

                }}>
                    <div style={{
                        // backgroundColor: "blue"
                        textAlign: "center",
                        fontSize: "1.4rem"
                    }}>

                        <h1> Your Booking Details have been received! </h1>
                        {/*<div> We are double checking our availability! </div>*/}
                        <h2 style={{marginTop: "1em"}}>If we are available we will prepare a contract with your booking information. </h2>
                            {/*<div style={{backgroundColor: "#490411", height: "10em",*/}
                            {/*    width:"15em"}}>*/}
                            {/*    <img src={preBookingPage} alt="pre-booking-page" />*/}
                            {/*</div>*/}
                        </div>
                        <div style={{width:"fit-content", margin: "1em auto", }}>
                            <IonButton color="warning"
                                       onClick={() => onContinueButtonClick()}
                            > Go To My Bookings
                            <IonIcon style={{marginLeft: ".5em"}} icon={newspaperOutline}></IonIcon></IonButton>
                        </div>
                </div>

            </div>

    )
}