import React, {useEffect, useState} from "react"
import {
    IonButton,
    IonCard, IonCardContent,
    IonCardHeader, IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonRow
} from "@ionic/react";
import Calendar from "react-calendar";
import TimeOfDayChoices from "../time-of-day-choices/time-of-day-choices.jsx";
import "./booking-form-schedule.styles.scss"
import BookingFormStartTimes from "./booking-form-start-times/booking-form-start-times.jsx";
import BookingFormPrices from "../../booking-form-prices/booking-form-prices.jsx";
// import BookingFormDateDataDisplay from "./booking-form-start-times/booking-form-date-data-display/booking-form-date-data-display";
import {arrowBack, } from "ionicons/icons";

const BookingFormSchedule = ({selectedStartTime,numberOfMariachis, setNumberOfMariachis,setSelectedStartTime,
                                 selectedFormattedStartTime , setSelectedFormattedStartTime,
                                 value, onChange,feeTotal,setFeeTotal, mariachiPackageId,
                                 setMariachiPackageId, setGrandTotal, grandTotal,
                                 selectedPrice, setSelectedPrice, addressTravelTime, addressDistance, address,
                                 setCurrentBookingStep, currentBookingStep,
                             bookingPackageName, setBookingPackageName, setTravelFee
                             }) => {



    const [ timeOfDayChoice, setTimeOfDayChoice ] = useState("");
    const [ selectedStartTimeMaxPossibleHours, setSelectedStartTimeMaxPossibleHours ] = useState();
    const [selectedNumberOfHours, setSelectedNumberOfHours ] = useState(0)



    console.log(addressDistance)

    const [ distance, setDistance ] = useState( addressDistance !== "" ? (addressDistance.substring(0, addressDistance?.indexOf(' '))):(0) )

    console.log( bookingPackageName,selectedNumberOfHours, distance, addressDistance)


    useEffect(() => {

       console.log(bookingPackageName, selectedNumberOfHours)
        if (selectedNumberOfHours > 0 ){
            setBookingPackageName(  numberOfMariachis + " " + selectedNumberOfHours  + " Hrs for $" + feeTotal)
        }

        console.log(value.toDateString(), currentDate.toDateString(), bookingPackageName)

    },[selectedStartTimeMaxPossibleHours, value, selectedNumberOfHours, feeTotal])


    const currentDate = new Date(new Date().setDate(new Date().getDate()-1));

    const maxDate = new Date();
    maxDate.setMonth(12)

    function onClickDay(){
        console.log("onClickDay", value)

        if (value !== currentDate){
            setTimeOfDayChoice("")
            setSelectedStartTime("")
            setSelectedFormattedStartTime("")
            setSelectedPrice()
            // setDateChange(true)
            // setSelectedStartTime();
            // setSelectedFormattedStartTime();
            // setTimeOfDayChoice();
            console.log("onClickDay")
        }

    }
    function renderLongDistanceFee(distNum){
        console.log(distNum)
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
            fee = 360;

        }

        if ( distNum > 230){
            return (<div style={{textAlign: "center", fontSize:"1.1rem"}}>
                <div>{addressDistance}</div>

                Your location is too far from us sorry!
                <div>
                    {/*<IonButton>Can</IonButton>*/}
                </div>
            </div>)
        }
        else {
            return (

                <IonCard style={{display: "flex", flexDirection: "column", width: "90%", margin: "auto"}}>
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
                            padding: ".5em",
                            // font-weight: bold;
                            fontSize: "1.3em",
                            // border:" solid thick blue",
                            // width: 100%;
                        }}>
                            {address}
                        </div>
                        <div style={{textAlign: "center", fontSize: "1rem"}}>

                            <div>
                                <div>{addressDistance}</div>
                            <div>{addressTravelTime}</div>
                            </div>

                            {distNum > 35 && (
                                <div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>3 & 4 Mariachis</div>
                                        <div style={{fontWeight:"bold"}}>
                                            ${fee}
                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>5 Mariachis</div>
                                        <div style={{fontWeight:"bold"}}>
                                            ${fee + (fee / 4)}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>6 Mariachis</div>
                                        <div style={{fontWeight:"bold"}}>
                                            ${fee + (2 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>7 Mariachis</div>
                                        <div style={{fontWeight:"bold"}}>
                                            ${fee + (3 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>8 Mariachis</div>
                                        <div style={{fontWeight:"bold",
                                            marginLeft:".2em"}}>
                                            ${fee + (4 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>9 Mariachis</div>
                                        <div style={{fontWeight:"bold"}}>
                                            ${fee + (5 * (fee / 4))}

                                        </div>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-evenly", padding: "0 2em"}}>
                                        <div>10 Mariachis</div>
                                        <div style={{fontWeight:"bold", marginLeft:".2em"}}>
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

    function renderOutOfTownFee(){

        console.log(distance)
        if( distance > 35 ){
        let fee;

            if (distance > 35 && distance< 45 ){
                fee = 40;

            }else if (distance > 45 && distance < 53 ){
                fee = 80;

            }else if (distance > 53 && distance < 75 ){
                fee = 120;

            }else if (distance > 75 && distance < 80 ){
                fee = 140;

            }else if (distance > 80 && distance < 90 ){
                fee = 160;

            }else if (distance > 90 && distance < 110 ){
                fee = 180;

            }else if (distance > 110 && distance < 130 ){
                fee = 200;

            }else if (distance > 130 && distance < 150 ){
                fee = 220;

            }else if (distance > 150 && distance < 165 ){
                fee = 250;

            }else if (distance > 165 && distance < 180 ){

                fee = 280;

            }
            else if (distance > 180 && distance < 190 ){
                fee = 300;

            }else if (distance > 190 && distance < 220 ){
                fee = 330;

            }else if (distance > 220 && distance < 230 ){
                fee = 360;

            }


            console.log(numberOfMariachis, fee)
            let OOTFee;
            switch (numberOfMariachis) {

                case "3 Mariachis":
                    OOTFee = fee
                    break;
                case "4 Mariachis":
                    OOTFee = fee
                    break;
                case "5 Mariachis":
                    OOTFee = fee + (fee/4)
                    break;
                case "6 Mariachis":
                    OOTFee = fee +( 2*(fee/4))
                    break;
                case "7 Mariachis":
                    OOTFee = fee +( 3*(fee/4))
                    break;
                case "8 Mariachis":
                    OOTFee = fee + (4*(fee/4))
                    break;
                case "9 Mariachis":
                    OOTFee = fee +( 5*(fee/4))
                    break;
                case "10 Mariachis":
                    OOTFee = fee + (6*(fee/4))
                    break;
            }

            console.log(OOTFee)
            return OOTFee;
        }else {
            return 0;
        }

    }
    function calculateTravelFee(){

        if( distance > 35 ){
        let fee;

            if (distance > 35 && distance< 45 ){
            fee = 40;

            }else if (distance > 45 && distance < 53 ){
                fee = 80;

            }else if (distance > 53 && distance < 75 ){
                fee = 120;

            }else if (distance > 75 && distance < 80 ){
                fee = 140;

            }else if (distance > 80 && distance < 90 ){
                fee = 160;

            }else if (distance > 90 && distance < 110 ){
                fee = 180;

            }else if (distance > 110 && distance < 130 ){
                fee = 200;

            }else if (distance > 130 && distance < 140 ){
                fee = 220;

            }else if (distance > 140 && distance < 170 ){
                fee = 250;

            }else if (distance > 170 && distance < 190 ){
                fee = 280;

            }
            else if (distance > 190 && distance < 200 ){
                fee = 300;

            }else if (distance > 200 && distance < 220 ){
                fee = 330;

            }else if (distance > 220 && distance < 240 ){
                fee = 350;

            }


            console.log(numberOfMariachis)
            let OOTFee;
            switch (numberOfMariachis) {

                case "4 Mariachis":
                    OOTFee = fee
                    break;
                case "5 Mariachis":
                    OOTFee = fee + (fee/4)
                    break;
                case "6 Mariachis":
                    OOTFee = fee +( 2*(fee/4))
                    break;
                case "7 Mariachis":
                    OOTFee = fee +( 3*(fee/4))
                    break;                    
                case "8 Mariachis":
                    OOTFee = fee + (4*(fee/4))
                    break;
                case "9 Mariachis":
                    OOTFee = fee +( 5*(fee/4))
                    break;
                case "10 Mariachis":
                    OOTFee = fee + (6*(fee/4))
                    break;
            }

            console.log(OOTFee)
            return <div>$ {OOTFee}</div>
        }else {
            return(<div>$0</div>)
        }

    }

    function renderSavedAddress() {
        console.log(addressDistance)

            const distNum =  addressDistance !== 0 ? ( addressDistance.substring(0, addressDistance.indexOf(' '))):(0);
            console.log(addressDistance,distNum)

            let fee;
            if ( distNum > 35) {
                return (<div style={{width: "80%", margin: "auto"}}>
                    {renderLongDistanceFee(distNum)}
                </div>)

            }


    }
    function onSaveAndContinueClick(){
        console.log("SAVE AND CONTINUE CLICK!")
        console.log(renderOutOfTownFee() + feeTotal)
        setGrandTotal(renderOutOfTownFee() + feeTotal)
        setCurrentBookingStep(currentBookingStep + 1)
    }
    console.log(addressDistance)

    let distNum = addressDistance > 0 ? (addressDistance.substring(0, addressDistance.indexOf(' '))):(0) ;
    console.log(addressDistance,distNum)
    return (

        <div>
            <IonGrid  >
                    <IonCol className="select-date-and-time-col" size="auto"  >
                        <div style={{ textAlign: "center"}}>
                            <div className="select-date-title" >Select Date</div>
                        </div>

                        <div style={{
                            width: "fit-content",
                            fontSize: ".7rem",
                            margin: "auto",

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
                        {value.toDateString() !== currentDate.toDateString() && (
                            <div style={{margin: "1em auto 0 auto", color:"maroon",fontWeight:"bold", width:"fit-content", fontSize:"1.4rem"}}>{(value.toDateString())}</div>

                        )}
                        </IonCol>

                {value.toDateString() !== currentDate.toDateString() && (
                    <IonCol  style={{ padding: "0em", margin: " 0 auto"}}>
                        <div  style={{fontStyle: "bold",textAlign: "center",  width: "100%"}}>
                            <div className="select-time-title">Select Time</div>

                        </div>
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
                            setSelectedPrice={setSelectedPrice}

                        />
                    </IonCol>
                )}
                {timeOfDayChoice && (
                    <IonCol style={{backgroundColor:"green", padding: "0", margin:0,}}>

                        <IonCol style={{backgroundColor:"blue", padding: "0", margin:0,}}>
                            <BookingFormStartTimes
                                value={value}
                                timeOfDayChoice={timeOfDayChoice}
                                selectedFormattedStartTime={selectedFormattedStartTime}
                                selectedStartTime={selectedStartTime}
                                setSelectedStartTime={setSelectedStartTime}
                                setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}

                                setSelectedPrice={setSelectedPrice}
                            />
                            {/*<BookingFormDateDataDisplay*/}
                            {/*        value={value}*/}
                            {/*        selectedFormattedStartTime={selectedFormattedStartTime}*/}

                            {/*/>*/}
                        </IonCol>
                    </IonCol>
                )}
                <IonRow>
                    <IonCol>

                        <BookingFormPrices
                            selectedStartTime={selectedStartTime}
                            selectedFormattedStartTime={selectedFormattedStartTime}
                            timeOfDayChoice={timeOfDayChoice}
                            value={value}
                            selectedStartTimeMaxPossibleHours={selectedStartTimeMaxPossibleHours}
                            setNumberOfMariachis={setNumberOfMariachis}
                            numberOfMariachis={numberOfMariachis}
                            setFeeTotal={setFeeTotal}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            setMariachiPackageId={setMariachiPackageId}
                            mariachiPackageId={mariachiPackageId}
                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                            outOfTownFee={ distance > 45 ? (true):(false)}
                            distNum={distance}
                        />

                    </IonCol>

                </IonRow>
                <IonRow>

                    {renderSavedAddress()}
                </IonRow>
                {selectedPrice !== "none selected" && selectedFormattedStartTime && selectedPrice &&(
                    <IonRow style={{marginTop:"1em"}}>
                        <div style={{border: "solid  thick #FFD454", textAlign: "center", width: "100%"}}>
                            <div style={{fontSize: "1.5rem", margin: ".3em"}} >
                                {value.toString().substring(0,15)}
                            </div>

                            <div style={{margin: ".5em"}}>
                                <div >
                                    Starting @ {selectedFormattedStartTime}
                                </div>
                                <div>
                                    for
                                    {" "+ selectedNumberOfHours}
                                    {selectedNumberOfHours > 1 ? (
                                            " Hrs "
                                        ):
                                        (
                                            " Hr "
                                        )}
                                    for
                                    {" $"+feeTotal} + ${renderOutOfTownFee()} = ${renderOutOfTownFee() + feeTotal}

                                </div>
                            </div>


                            <div style={{display:"flex", margin: "1em",justifyContent: "space-evenly"}}>

                                <div style={{display:"flex"}}>
                                    <IonButton disabled={false} expand="block" onClick={() => onSaveAndContinueClick()} fill="solid" color="secondary" >Save & Continue</IonButton>
                                    {/*<IonButton disabled={false} expand="block" onClick={() => setCurrentBookingStep(3)} fill="solid" color="secondary" >Save & Continue</IonButton>*/}
                                </div>
                            </div>

                        </div>



                    </IonRow>

                )}







            </IonGrid>
            <div style={{display:"flex", justifyContent: "space-evenly"}}>
                <div >
                    <IonButton fill="outline" color="secondary" onClick={() => setCurrentBookingStep(currentBookingStep -1)}><IonIcon icon={arrowBack}></IonIcon>Back</IonButton>

                </div>
            </div>
        </div>
    )
}
export default BookingFormSchedule;