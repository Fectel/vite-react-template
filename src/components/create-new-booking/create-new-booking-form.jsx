import React, {useState} from "react"
import {
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonCol,
    IonContent, IonGrid, IonInput,
    IonItem, IonLabel,
    IonList,
    IonPage, IonRow,
    IonTitle
} from "@ionic/react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import TimeOfDayChoices from "./time-of-day-choices/time-of-day-choices.jsx";
import GooglePlacesAutoComplete from "./google-places-auto-complete/google-places-auto-complete.jsx";



const CreateNewBookingForm = () => {



    const [ timeOfDayChoice, setTimeOfDayChoice ] = useState("");
    const [ selectedFormattedStartTime , setSelectedFormattedStartTime ] = useState();
    const [ selectedStartTime, setSelectedStartTime ] = useState();
    const [ selectedStartTimeMaxPossibleHours, setSelectedStartTimeMaxPossibleHours ] = useState();


    const [address, setAddress ]= useState("");


    const [value, onChange] = useState(new Date());
    const currentDate = new Date();

    const maxDate = new Date();
    maxDate.setMonth(11)


    function onClickDay(){
        if (value !== currentDate){
            // setDateChange(true)
            // setSelectedStartTime();
            // setSelectedFormattedStartTime();
            // setTimeOfDayChoice();
            console.log("onClickDay")
        }

    }

    return (
        <IonPage>
            <IonContent>

                <IonCardHeader>
                    <IonCardTitle>Create Booking</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                        <IonList>



                            <IonItem style={{height: "fit-content"}}>
                                <IonList >
                                    <IonTitle>Contact Info</IonTitle>

                                    <IonLabel position="stacked">Full Name</IonLabel>
                                    <IonInput>
                                    </IonInput>

                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput>
                                    </IonInput>

                                    <IonLabel position="stacked">Phone Number</IonLabel>
                                    <IonInput>
                                    </IonInput>

                                </IonList>

                            </IonItem>
                            <IonItem>
                                <IonList>
                                    <IonTitle>Performance Address</IonTitle>
                                    <GooglePlacesAutoComplete
                                        address={address}
                                        setAddress={setAddress}

                                    />
                                </IonList>

                            </IonItem>


                            <IonItem>
                                <IonList>
                                    <IonTitle>Date and Time</IonTitle>
                                    <IonItem>
                                        <IonGrid style={{backgroundColor: "#434343", width:"100vw"}}>
                                            <IonRow>
                                                <IonCol>
                                                    <IonLabel>Select Date</IonLabel>
                                                    <div style={{
                                                        width: "18em",
                                                        fontSize: ".7rem",
                                                        marginLeft: "0em"
                                                    }}>
                                                        <Calendar
                                                            className="react-calendar"
                                                            next2Label={null}
                                                            prev2Label={null}
                                                            onChange={onChange}
                                                            onClickDay={onClickDay}
                                                            value={value}
                                                            maxDate={maxDate}
                                                            minDate={currentDate}

                                                        />
                                                    </div>
                                                </IonCol>
                                                <IonCol>
                                                    <IonLabel>Select Time</IonLabel>
                                                    <TimeOfDayChoices
                                                        value={value}
                                                        timeOfDayChoice={timeOfDayChoice}
                                                        setTimeOfDayChoice={setTimeOfDayChoice}
                                                        selectedFormattedStartTime={selectedFormattedStartTime}
                                                        setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                                        selectedStartTime={selectedStartTime}
                                                        setSelectedStartTime={setSelectedStartTime}
                                                        selectedStartTimeMaxPossibleHours={selectedStartTimeMaxPossibleHours}
                                                        setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}

                                                    />
                                                </IonCol>
                                            </IonRow>





                                        </IonGrid>


                                    </IonItem>
                                </IonList>


                            </IonItem>



                            <IonItem>
                                <IonTitle>Pricing</IonTitle>
                            </IonItem>

                            <IonItem>
                                <IonTitle>Send Booking Request</IonTitle>
                            </IonItem>


                        </IonList>

                </IonCardContent>
            </IonContent>
        </IonPage>
    )
}

export default CreateNewBookingForm;