import React, {useEffect, useState} from "react";
import {IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow} from "@ionic/react";
import {useAuth} from "../../../auth-context/auth-context.jsx";
import "./booking-form-contact-info.styles.scss"
import {arrowBack} from "ionicons/icons";

const BookingFormContactInfoEdit = ({clientName, setClientName,
                                clientPhoneNumber, setClientPhoneNumber,
                                clientEmail, setClientEmail,
                                setCurrentBookingStep
                                }) => {




    const { currentUser } = useAuth();
    const [formCompleted, setFormCompleted ] = useState(false)
    const [currentUserDataLoaded, setCurrentUserDataLoaded ] = useState(false)
    useEffect(() => {

        if (clientName !== undefined
                && clientEmail !== undefined
                && clientPhoneNumber !== undefined
                && clientPhoneNumber?.length > 9){
            setFormCompleted(true)
        } else {
            setFormCompleted(false)
        }

        if (currentUser !== undefined && currentUserDataLoaded === false && clientName === undefined ){
            setClientName(currentUser.displayName)
            setClientEmail(currentUser.email)
            setClientPhoneNumber(currentUser.phoneNumber)
            setCurrentUserDataLoaded(true);
        }
        //Below for if a user goes back a currentStep from performance address page
        if (currentUser !== undefined && currentUserDataLoaded === false
            && clientName !== undefined
            && clientEmail !== undefined
            && clientPhoneNumber !== undefined){
            setCurrentUserDataLoaded(true)
        }


        },[clientName, clientEmail, clientPhoneNumber, currentUser])

    console.log(clientName, clientEmail, clientPhoneNumber)

    function onSaveAndContinueClick(){
        console.log(clientName, clientEmail, clientPhoneNumber)
        setCurrentBookingStep(3)
    }

    return (
        <div>
            {currentUserDataLoaded && (
                <div>
                    <div >
                        <h2 style={{ textAlign: "center"}}>Contact Info</h2>

                    </div>


                    <IonItem >
                        <IonLabel  position="stacked">Full Name</IonLabel>
                        <IonInput onIonChange={(e) => setClientName(e.target.value)}
                                  type="name"
                                  value={clientName}

                        >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel  position="stacked">Email</IonLabel>
                        <IonInput onIonChange={(e) => setClientEmail(e.target.value)}
                                  type="email"
                                  pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                                  inputMode="email"
                                  autocomplete="email"
                                  value={clientEmail}>
                        </IonInput>
                    </IonItem>
                    <IonItem>

                        <IonLabel position="stacked">Phone</IonLabel>
                        <IonInput onIonChange={(e) => setClientPhoneNumber(e.target.value)}
                                  type="tel"
                                  autocomplete="tel"
                                  pattern="06([0-9]{8})"
                                  value={clientPhoneNumber}
                        >
                        </IonInput>
                    </IonItem>

                    <IonGrid>
                        <IonRow >
                            <IonCol  pull={0} >
                                <IonButton href="/client-dashboard" fill="outline" color="secondary"><IonIcon icon={arrowBack}></IonIcon>Back</IonButton>
                            </IonCol>
                            <IonCol pull={2}>
                                <IonButton disabled={!formCompleted}  onClick={() => onSaveAndContinueClick()} fill="solid" color="secondary" >Save & Return</IonButton>

                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            )}
        </div>





    )
}
export default BookingFormContactInfoEdit;