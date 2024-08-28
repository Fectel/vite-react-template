import React from "react"
import {
    IonButton,
    IonCard, IonCardContent,  IonCardSubtitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonLabel,
    IonList,
    IonRow
} from "@ionic/react";
import {arrowBack, create} from "ionicons/icons";
import "./booking-form-confirmation.styles.scss"
import {createClientBookingRequestDocument} from "../../../firebase";
import {useAuth} from "../../../auth-context/auth-context";


const BookingFormConfirmation = ({performanceAddress,
    value, selectedFormattedStartTime, selectedStartTime,feeTotal,
    selectedPrice,numberOfMariachis,mariachiPackageId,
                                     setMariachiPackageId,
                                     currentBookingStep,
                                     setCurrentBookingStep,
                                     clientEmail, clientName,
                                     clientPhoneNumber,
                                     bookingPackageName, grandTotal,

                                 }) => {
    // console.log(selectedFormattedStartTime.substring(2,7), selectedPrice.substring(0,1))

    const { currentUser } = useAuth();
    console.log(selectedFormattedStartTime, selectedStartTime, selectedPrice)

    let startAndEndTime =  selectedFormattedStartTime?.toString() + " - " + renderEndTime(selectedStartTime?.toString(), parseInt(selectedPrice?.substring(0,1)))



    function renderEndTime(startTime, numberOfHoursInt){

        console.log("hello", startTime, numberOfHoursInt, numberOfMariachis)
        const firstTwoInts = parseInt(startTime?.substring(0,2));
        console.log("hello", firstTwoInts, numberOfHoursInt)
             const endHour = firstTwoInts + numberOfHoursInt;

            if( numberOfMariachis === "3 Mariachis"){
                let minutes = parseInt(startTime.substring(3,5))
                console.log(minutes)
                let endTime


                switch (minutes) {

                    case 0:
                        if(firstTwoInts  < 12){
                            endTime = firstTwoInts + ":" + 30 + " am"
                        }
                        else if(firstTwoInts  > 12 && firstTwoInts < 24){
                            endTime = (firstTwoInts -12)+ ":" + 30 + " pm"

                        }
                        else if(firstTwoInts  === 12 ){
                            endTime = (firstTwoInts)+ ":" + 30 + " pm"

                        }
                        else if (firstTwoInts === 24 ){
                            endTime = (firstTwoInts -12) + ":" + 30 + " am"

                        }
                        console.log(endTime)
                        break;
                    case 15:
                        if(firstTwoInts < 12){
                            endTime = firstTwoInts + ":" + 45 + " am"
                        }
                        else if(firstTwoInts > 12 && firstTwoInts < 24){
                            endTime = (firstTwoInts -12) + ":" + 45 + " pm"

                        }
                        else if(firstTwoInts  === 12 ){
                            endTime = (firstTwoInts)+ ":" + 45 + " pm"

                        }
                        else if (firstTwoInts === 24 ){
                            endTime = (firstTwoInts -12) + ":" + 45 + " am"

                        }
                        console.log(endTime)
                        break;
                    case 30:
                        if(firstTwoInts + 1 < 12){
                            endTime = firstTwoInts + 1 + ":00" + " am"
                        }
                        else if(firstTwoInts+ 1 > 12 && firstTwoInts < 24){
                            endTime = (firstTwoInts -12)+ 1 + ":00" + " pm"

                        }
                        else if(firstTwoInts  === 12 ){
                            endTime = (firstTwoInts)+ ":00" + " pm"

                        }
                        else if (firstTwoInts+ 1 === 24 ){
                            endTime = (firstTwoInts -12) + 1 + ":00" + " am"

                        }
                        console.log(endTime)
                        break;
                    case 45:
                        if(firstTwoInts + 1 < 12){
                            endTime = firstTwoInts + 1 + ":15" + " am"
                        }
                        else if(firstTwoInts+ 1 > 12 && firstTwoInts < 24){
                            endTime = (firstTwoInts -12)+ 1 + ":15" + " pm"

                        }
                        else if(firstTwoInts  === 12 ){
                            endTime = (firstTwoInts)+ ":" + 15 + " pm"

                        }
                        else if (firstTwoInts+ 1 === 24 ){
                            endTime = (firstTwoInts -12) + 1 + ":15" + " am"

                        }
                        console.log(endTime)
                        break;
                }

                console.log(endTime)
                return endTime;

            }
        console.log(endHour)
        if (endHour < 12 ){
            let newEndTime = endHour + startTime?.substring(2,5) + " am"
            console.log(newEndTime)
            return newEndTime;

        }
        if(endHour > 12 && endHour < 24 ){
            let newEndTime = (endHour-12) + startTime?.substring(2,5) + " pm"
            console.log(newEndTime)
            return newEndTime;

        }
        if (endHour == 12){
            let newEndTime = (endHour) + startTime?.substring(2,5) + " pm"
            console.log(newEndTime)
            return newEndTime;

        }
        if(endHour == 24){
            let newEndTime = (endHour-12) + startTime?.substring(2,5) + " am"
            console.log(newEndTime)
            return newEndTime;
        }
        if(endHour > 24){

            let newEndTime = (endHour-24) + startTime?.substring(2,5) + " am"
            console.log(newEndTime)
            return newEndTime;

        }

    }


    async function onConfirmBookingRequest() {
        console.log(value)
        console.log( selectedStartTime)
        console.log( selectedFormattedStartTime)
        let newStr = value.toString().substring(0, 16) + selectedStartTime
        let endTime = value.toString().substring(0, 16) +( parseInt(selectedStartTime.substring(0,2)) + parseInt(selectedPrice.substring(0,1)) )+ selectedStartTime.substring(2,selectedStartTime.length)

        console.log( newStr, selectedPrice)
        console.log(endTime)



        // call server
        let numberOfHours =  parseInt(selectedPrice.substring(0,1));
            if(numberOfHours === 1 && selectedPrice.substring(1,2) === "/"){
                numberOfHours = 0
            }
        // axios({
        //     url: 'insert-event',
        //     method: 'get',
        //     params: {
        //         dateStart: newStr,
        //         numberOfHours:  numberOfHours,
        //         summarry: bookingPackageName, startAndEndTime,
        //         description: performanceAddress[0],
        //     }
        // }).then(response => {
        //     console.log("Insert Event  succeeded", response)
        // }).catch(error => {
        //     console.log("insert Event error: ", error)
        // });

    //
    //
    //
    const bookingRequest = {
            // clientId: currentUser.uid,
            // clientId: "",
            clientName: clientName,
            clientEmail: clientEmail,
            clientPhone: clientPhoneNumber,
            performanceDate: value.toString().substring(0, 15),
            performanceAddress: performanceAddress,
            numberOfMariachis: numberOfMariachis,
            feeTotal: grandTotal ? (grandTotal):(feeTotal),
            balanceDue: grandTotal ? (
                grandTotal -  Math.round((grandTotal/2)/50) * 50
            ):
                (feeTotal - (Math.round((parseInt(feeTotal) / 2) / 50) * 50)),
            performanceTime: startAndEndTime,
            feeDeposit: grandTotal ? (
                Math.round((grandTotal/2)/50) * 50
            ):(
                Math.round((parseInt(feeTotal) / 2) / 50) * 50
            ),
            mariachiPackageId: mariachiPackageId === undefined ? (0) : (mariachiPackageId),
            status: "Confirming Availability",
            bookingDate: value,
            name: grandTotal ? (`${bookingPackageName.substring(0, bookingPackageName.length - 5)} $ ${grandTotal}`):(bookingPackageName),

        }
        console.log("GRANDTOTAL", grandTotal)
        console.log("NAME!!!!", `${bookingPackageName.substring(0, bookingPackageName.length - 5)} $ ${grandTotal}` )
        console.log(bookingRequest)
        const res = await createClientBookingRequestDocument( bookingRequest)
        // const res = await createClientBookingRequestDocument(currentUser.uid, bookingRequest)

        console.log(res)
        if (res === true) {
            // setCurrentBookingStep(5)
            // window.location.href = '/admin-dashboard';
        }


    }
    function onEditContactInfoClick(){

        setCurrentBookingStep(4)
    }

    return (
        <IonCard>
            <div className="booking-form-confirmation-div">
                <IonCard>


                    <IonCardContent>

                        <div >
                            <IonList >
                                <div>

                                    <IonCardSubtitle style={{textAlign: "center",
                                        // backgroundColor:"red",
                                        margin:"auto",
                                        display: "flex",flexFlow: "row", width:"fit-content", marginBottom: "1.2em"}}>Contact Info
                                        <div style={{
                                            cursor: "pointer",
                                            // backgroundColor: "yellow",
                                            // right:"8em",top: "14em",
                                            width: "fit-content",
                                            // position: "absolute"
                                        }}>
                                            <IonIcon icon={create}
                                            onClick={() => onEditContactInfoClick()}
                                            />

                                        </div>
                                    </IonCardSubtitle>

                                </div>
                               <div style={{ paddingBottom: "1em",}}>
                                   <div style={{
                                       fontSize: ".8rem",
                                       display: "flex",
                                       justifyContent: "space-between",
                                       width:"80%",
                                       margin: "auto",
                                   }} >
                                       <div >Name: </div>
                                       <div >{clientName}</div>
                                   </div>
                                   <div
                                       style={{
                                           fontSize: ".8rem",
                                           display: "flex",
                                           justifyContent: "space-between",
                                           width:"80%",
                                           margin: "auto",
                                       }}>
                                       <div >Email: </div>
                                       <div >{clientEmail}</div>
                                   </div>
                                   <div style={{
                                       fontSize: ".8rem",
                                       display: "flex",
                                       justifyContent: "space-between",
                                       width:"80%",
                                       margin: "auto",
                                   }}>
                                       <IonLabel>Phone: </IonLabel>
                                       <div>{clientPhoneNumber}</div>

                                   </div>
                               </div>


                                <IonCardSubtitle style={{textAlign: "center",
                                    // backgroundColor:"red",
                                    margin:"auto",
                                    display: "flex",flexFlow: "row", width:"fit-content", marginBottom: "1.2em"}}>Booking Details
                                    <div style={{
                                        cursor: "pointer",
                                        // backgroundColor: "yellow",
                                        // right:"8em",top: "14em",
                                        width: "fit-content",
                                        // position: "absolute"
                                    }}>

                                    </div>
                                </IonCardSubtitle>


                                <div style={{paddingBottom: "1em"}}>
                                    <div style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",

                                    }}  >
                                        <div>Date of Performance: </div>
                                        <div>{value.toString().substring(0,15)}</div>
                                    </div>

                                    <div  style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",
                                    }} >
                                        <div>
                                            Performance Time:
                                        </div>
                                        <div>{startAndEndTime}</div>

                                    </div>
                                    <div style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",
                                    }} >
                                        <div>
                                            Address:
                                        </div>
                                        <div style={{fontSize: ".6rem", width: "70%", textAlign: "center"}}>{performanceAddress}</div>
                                    </div>

                                </div>

                                <div style={{

                                }}>
                                    <IonCardSubtitle style={{textAlign: "center",
                                        // backgroundColor:"red",
                                        margin:"auto",
                                        display: "flex",flexFlow: "row", width:"fit-content", marginBottom: "1.2em"}}>Payment Details
                                        <div style={{
                                            cursor: "pointer",
                                            // backgroundColor: "yellow",
                                            // right:"8em",top: "14em",
                                            width: "fit-content",
                                            // position: "absolute"
                                        }}>

                                        </div>
                                    </IonCardSubtitle>



                                </div>

                                <div  style={{
                                    fontSize: ".8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width:"80%",
                                    margin: "auto",
                                }} >
                                    <div>
                                        Mariachi Package:
                                    </div>
                                    <div>{bookingPackageName}</div>
                                </div>

                                {grandTotal ? (
                                <div>
                                    <div style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",
                                    }} >
                                        <div>Total ( Includes Travel Fee ): </div>
                                        <div>${feeTotal} + ${(grandTotal-feeTotal)}</div>
                                        <div>$ {grandTotal}</div>
                                        {/*<div>$ {selectedPrice}</div>*/}
                                    </div>

                                    <div style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",
                                    }} >
                                        <div>Due Before Performance: </div>

                                        {/*<div>$ {feeTotal * .30}</div>*/}


                                        <div>$ {grandTotal -  Math.round((grandTotal/2)/50) * 50}</div>


                                        {/*<div>{selectedPrice.substring(7,11) }</div>*/}
                                    </div>
                                    <div style={{
                                        fontSize: ".8rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width:"80%",
                                        margin: "auto",
                                    }} >
                                        <div>Due On Contract Signing : </div>

                                        {/*<div>$ {feeTotal * .30}</div>*/}


                                        <div>$ {Math.round((grandTotal/2)/50) * 50}</div>


                                        {/*<div>{selectedPrice.substring(7,11) }</div>*/}
                                    </div>
                                </div>
                                ):(<div>
                                <div style={{
                                    fontSize: ".8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width:"80%",
                                    margin: "auto",
                                }} >
                                    <div>Total: </div>
                                    <div>${feeTotal}</div>
                                </div>

                                <div style={{
                                    fontSize: ".8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width:"80%",
                                    margin: "auto",
                                }} >
                                    <div>Due Before Performance: </div>

                                    {/*<div>$ {feeTotal * .30}</div>*/}


                                    <div>$ {feeTotal -  Math.round((feeTotal/2)/50) * 50}</div>


                                    {/*<div>{selectedPrice.substring(7,11) }</div>*/}
                                </div>
                                <div style={{
                                    fontSize: ".8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width:"80%",
                                    margin: "auto",
                                }} >
                                    <div>Due On Contract Signing : </div>

                                    {/*<div>$ {feeTotal * .30}</div>*/}


                                    <div>$ {Math.round((feeTotal/2)/50) * 50}</div>


                                    {/*<div>{selectedPrice.substring(7,11) }</div>*/}
                                </div>                                </div>)
                                }



                            </IonList>

                        </div>
                    </IonCardContent>
                </IonCard>



            </div>
            <IonGrid>
                <IonRow style={{ display: "flex",}} >
                    <IonCol  pull={0} >
                        <IonButton fill="outline" color="secondary" onClick={() => setCurrentBookingStep(currentBookingStep -1)}><IonIcon icon={arrowBack}></IonIcon>Back</IonButton>
                    </IonCol>
                    <IonCol  >
                        <IonButton  disabled={false}  onClick={() => onConfirmBookingRequest()} fill="solid" color="secondary" >
                            <div>Confirm Booking Request hiiiii</div>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCard>

    )
}

export default BookingFormConfirmation;