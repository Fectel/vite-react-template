import React, {useEffect, useState, useRef} from "react";
import {IonCol, IonGrid, IonRow, IonModal, IonButton, IonIcon} from "@ionic/react";
import FirebaseUiComponent from "../../components/firebase-ui-component/firebase-ui-component";
import { callOutline} from "ionicons/icons";

import {useAuth} from "../../auth-context/auth-context.jsx";


import "./booking-form-prices.styles.scss"
import BookingFormPricesComponent from "./booking-form-prices-component/booking-form-prices-component.jsx";
const BookingFormPrices = ({timeOfDayChoice, selectedFormattedStartTime,
                          setSelectedNumberOfHours, selectedStartTime, value, numberOfMariachis,
                             selectedStartTimeMaxPossibleHours,feeTotal,
    setFeeTotal,mariachiPackageId,setMariachiPackageId,
                               selectedPrice, setSelectedPrice, outOfTownFee,distNum,
    setNumberOfMariachis,
                           }) => {

                            
    const { currentUser } = useAuth();

    const [ loadedPrices, setLoadedPrices ] = useState(false)
    const [ friSatEvening , setFriSatEvening ] = useState(false)
    const [ friSatNight , setFriSatNight ] = useState(false)

    const [ twoHoursOnly, setTwoHoursOnly ] = useState(false)
    const [ dateWithinTwoWeeks, setDateWithinTwoWeeks ] = useState(false)

    const [showSignInWithPhone, setShowSignInWithPhone ] = useState(false)
    const modal = useRef(null);
    const [isOpen, setIsOpen ] = useState(true)

    // const chosenPriceStyle = {
    //     backgroundColor: suggestion.active ? "#490411" : "#fff",
    //     color: suggestion.active ? "#fff" : "black",
    //     cursor: "pointer"
    // }


    const currentDate= new Date();
    const twoWeeksDate = new Date();
    const [showTwoHoursAt4, setShowTwoHoursAt4 ] = useState(true)

    currentDate.setHours(0)
                        
    //editing this to be 2,3,4  (24)weeks (4 months)
    // twoWeeksDate.setHours(353)
    // twoWeeksDate.setHours(530)
        // twoWeeksDate.setHours(706)
        twoWeeksDate.setHours(2824)




    console.log(currentDate, "-" , twoWeeksDate)



    useEffect(() => {


        console.log("setting mariachi size to undefined", currentUser, "<=Current USER")
        setNumberOfMariachis();
        setSelectedPrice()

        if (  value < twoWeeksDate) {
            setDateWithinTwoWeeks(true)
            console.log("SEtting withing two weeks to TRUE")
        }else{
            console.log("SEtting withing two weeks to FALSE")
            setDateWithinTwoWeeks(false)
        }



        if (selectedFormattedStartTime !== undefined && selectedFormattedStartTime !== ""){
            console.log(selectedFormattedStartTime,selectedStartTime)
            setLoadedPrices(true);
            console.log(timeOfDayChoice)


            // if(value.getDay() < 5)

             if(value.getDay() > 4 && timeOfDayChoice === "Evening"){
                 setFriSatEvening(true)
                 console.log(selectedStartTimeMaxPossibleHours)

                 if ( selectedStartTimeMaxPossibleHours > 1 && value > twoWeeksDate) {
                     setTwoHoursOnly(true)
                     console.log(twoHoursOnly)
                 }else{
                     setTwoHoursOnly(false)
                 }

             }else if(value.getDay() > 4 && timeOfDayChoice === "Night"){
                 setFriSatEvening(false)
                 setTwoHoursOnly(false)

                 setFriSatNight(true)


                 console.log(friSatNight)
                 return;
             }else if( value.getDay() > 4 && parseInt(selectedStartTime.toString().substring(0,2)) === 16){
                 setShowTwoHoursAt4(false)

             }
             // else if( value.getDay() < 4 && parseInt(selectedStartTime.toString().substring(0,2)) === 16){
             //     setShowTwoHoursAt4(false)
             //
             // }
             else{
                 setFriSatEvening(false)
                 setFriSatNight(false)
                 setTwoHoursOnly(false)
                 setShowTwoHoursAt4(true)



             }


        }else{
            console.log("null")
            setLoadedPrices(false)
        }

        if(currentUser === null || currentUser === undefined){
            console.log(currentUser," current user shoudl be null")
            setIsOpen(true)

        }else{
            if(currentUser.uid !== "qnl3OYGb2takdqjsMTVNA6AuVKB2"){
                console.log(currentUser," current user is VALID!!!")
                setIsOpen(false)
            }
           
        }

           
        

        // console.log("TwoHoursOnly: ",twoHoursOnly, "FSE: ", friSatEvening,"FSN: ", friSatNight)

    },[timeOfDayChoice, selectedFormattedStartTime,
        selectedStartTimeMaxPossibleHours,
        selectedStartTime, value, twoHoursOnly, currentUser, isOpen])



    console.log(timeOfDayChoice)
    console.log(outOfTownFee)
    console.log(distNum, "Not INt")
    console.log(parseInt(distNum), "INT")

    return (
        <>
       

        <IonGrid >
             {/* {currentUser === undefined || currentUser === null && ( */}
             
             {/* )} */}
            {loadedPrices &&(
                <>
                {/* <IonModal
            style={{
                // width:"70%",
                margin:"8em auto 0",
            }}
            ref={modal}
            isOpen={isOpen}
            canDismiss={false}
        >
            {/* {showSignInWithPhone === true ? (
                <FirebaseUiComponent />
            ):( */}
                <div style={{margin:'6em auto 0',

                    width:"fit-content"
                }}>
                    <IonButton

                        style={{
                            width:"100%",
                            borderRadius: "0",

                            fontSize:".9rem"
                        }}
                        // size="medium"

                        onClick={() => setShowSignInWithPhone(true)}
                    >
                        <IonIcon style={{marginRight:".3em",}} icon={callOutline} />
                        Sign In with Phone Number</IonButton>

                </div>
            {/* )} */}


        {/* </IonModal> */}
        <>
                    <div style={{
                        textAlign: "center", color: "Black", fontFamily: "Libre Baskerville",
                    }}>
                        <h2>Pricing Options</h2>
                        </div>

                    {/*{selectedStartTime.substring(0,2)}*/}

                    <IonRow style={{display:"flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        height: "fit-content",
                        // overflow: "hidden",
                        // overflowY: "auto",
                    }}>


                            <div >

                                <IonRow className="mariachi-prices-row">
                                    {distNum < 60 && (
                                        <IonCol  className="mariachi-price-package-container"  >
                                            <IonRow className="mariachi-number-title">
                                                3 Mariachis
                                            </IonRow>
                                            {/*$155 @50*/}
                                            {/*$125 @60*/}
                                            {/*$90 @ 70*/}
                                            {/*$65 @ 80*/}
                                            {(
                                                <BookingFormPricesComponent
                                                    feePrice={300}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="3 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    // mariachiPackageId={1}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="1/2 Hr $300"
                                                    discountedPriceDisplay=""
                                                    discounted={false}
                                                    discountedFeePrice={0}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={.5}

                                                />
                                            )}

                                        </IonCol>

                                    )}


                                    { distNum < 50 && (
                                        <div>
                                                <IonCol  className="mariachi-price-package-container"  >
                                                    <IonRow className="mariachi-number-title">
                                                        4 Mariachis
                                                    </IonRow>
                                                    {/*$185 @60*/}
                                                    {/*$145 @ 70*/}
                                                    {/*$105 @ 80*/}
                                                    {!twoHoursOnly && (
                                                        <BookingFormPricesComponent
                                                            feePrice={500}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            // mariachiPackageId={1}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            displayPrice="1 Hr $500"
                                                            discountedPriceDisplay=""
                                                            discounted={false}
                                                            discountedFeePrice={0}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={1}

                                                        />
                                                    )}

                                                    {/*$270 @ 60/ $220*/}
                                                    {/*190 @ $70 / $140*/}
                                                    {/*$150 @ $75/ $100*/}
                                                    {/*$110 @ $80/$60*/}
                                                    {selectedStartTimeMaxPossibleHours > 1 &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={900}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"2 Hrs $900"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="2hrs $860"
                                                            discounted={true}
                                                            discountedFeePrice={860}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={2}
                                                            discountedMariachiPackageId={17}

                                                        />

                                                    )}

                                                    {/*$280 @ 60/ $380*/}
                                                    {/*$240 @ $70/ $340*/}
                                                    {/*200 @ $80/ $300*/}
                                                    {selectedStartTimeMaxPossibleHours > 2  &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={1340}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"3 Hrs $1340"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="3hrs $1260"
                                                            discounted={true}
                                                            discountedFeePrice={1260}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={3}
                                                            // discountedMariachiPackageId={17}

                                                        />

                                                    )}

                                                </IonCol>
                                        </div>
                                    )}
                                    {distNum > 50 && (
                                        <div>
                                          
                                                <IonCol  className="mariachi-price-package-container"  >
                                                    <IonRow className="mariachi-number-title">
                                                        4 Mariachis
                                                    </IonRow>
                                                    <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                        <div>2 Hr Booking Min.</div>
                                                    </div>


                                                    {/*$270 @ 60/ $220*/}
                                                    {/*190 @ $70 / $140*/}
                                                    {/*$150 @ $75/ $100*/}
                                                    {/*$110 @ $80/$60*/}
                                                    {selectedStartTimeMaxPossibleHours > 1 &&  parseInt(distNum) > 140 ? (
                                                        <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                            <div>3 Hr Booking Min.</div>
                                                        </div>
                                                    ):(
                                                        <BookingFormPricesComponent
                                                            feePrice={900}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"2 Hrs $900"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="2hrs $900"
                                                            discounted={false}
                                                            discountedFeePrice={900}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={2}
                                                            discountedMariachiPackageId={17}

                                                        />

                                                    )}

                                                    {/* $190@ $80/ $*/}
                                                    {selectedStartTimeMaxPossibleHours > 2  &&(

                                                        <BookingFormPricesComponent
                                                        feePrice={1360}
                                                        setFeeTotal={setFeeTotal}
                                                        numberOfMariachis={numberOfMariachis}
                                                        mariachiSize="4 Mariachis"
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        selectedPrice={selectedPrice}
                                                        displayPrice={"3 Hrs $1360"}
                                                        mariachiPackageId={2}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        discountedPriceDisplay="3hrs $1280"
                                                        discounted={true}
                                                        discountedFeePrice={1280}
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={3}
                                                        // discountedMariachiPackageId={17}
                                                    />
                                                    )}

                                                </IonCol>

                                          
                                        </div>

                                    )}

                                        <IonCol  className="mariachi-price-package-container"  >
                                            <IonRow className="mariachi-number-title">
                                                5 Mariachis
                                            </IonRow>
                                            {/*$175 @60*/}
                                            {/*$125 @ 70*/}
                                            {/*$75 @ 80*/}
                                            {!twoHoursOnly && distNum < 50 ? (
                                                <BookingFormPricesComponent
                                                    feePrice={600}
                                                    setFeeTotal={setFeeTotal}
                                                    mariachiSize="5 Mariachis"
                                                    numberOfMariachis={numberOfMariachis}
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}mariachiPackageId={3}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                     displayPrice="1 Hr $600"
                                                    discountedPriceDisplay=""
                                                    discounted={false}
                                                    discountedFeePrice={0}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}

                                                    numberOfHours={1}
                                                />

                                            ):(
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                            <div>2 Hr Booking Min.</div>
                                        </div>
                                                )}


                                            {/*$400 @ 60 $300*/}
                                            {/*300 @ $70 $200*/}
                                            {/*200 @ $80 $100*/}

                                            {parseInt(distNum) > 140 ? (
                                                        <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                            <div>3 Hr Booking Min.</div>
                                                        </div>
                                                    ):(
                                            <div>
                                                {selectedStartTimeMaxPossibleHours > 1 && showTwoHoursAt4  && (
                                                 <BookingFormPricesComponent
                                                 feePrice={1200}
                                                 setFeeTotal={setFeeTotal}
                                                 numberOfMariachis={numberOfMariachis}
                                                 mariachiSize="5 Mariachis"
                                                 setNumberOfMariachis={setNumberOfMariachis}
                                                 setSelectedPrice={setSelectedPrice}
                                                 selectedPrice={selectedPrice}
                                                 mariachiPackageId={4}
                                                 setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="2 Hrs 1200"
                                                 discountedPriceDisplay="2hrs $1100"
                                                 discounted={true}
                                                 // discountedMariachiPackageId={18}
                                                 discountedFeePrice={1100}
                                                 setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                 numberOfHours={2}

                                             />

                                            )}
                                            </div>
                                            )}
                                            {/*$350 @ 60 $300*/}
                                            {/*250 @ $70 $200*/}
                                            {/*150 @ $80 $100*/}
                                            {selectedStartTimeMaxPossibleHours > 2 && showTwoHoursAt4  && (
                                                 <BookingFormPricesComponent
                                                 feePrice={1650}
                                                 setFeeTotal={setFeeTotal}
                                                 numberOfMariachis={numberOfMariachis}
                                                 mariachiSize="5 Mariachis"
                                                 setNumberOfMariachis={setNumberOfMariachis}
                                                 setSelectedPrice={setSelectedPrice}
                                                 selectedPrice={selectedPrice}
                                                 mariachiPackageId={4}
                                                 setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="3 Hrs 1650"
                                                 discountedPriceDisplay="3 hrs $1550"
                                                 discounted={true}
                                                 // discountedMariachiPackageId={18}
                                                 discountedFeePrice={1550}
                                                 setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                 numberOfHours={3}

                                             />
                                            )}




                                        </IonCol>

                                        <IonCol   className="mariachi-price-package-container"
                                                  style={{
                                            backgroundImage: "linear-gradient(315deg, #3dc2ff,#adf8ed 74%)",
                                            }}
                                            >
                                            {selectedStartTimeMaxPossibleHours > 1 ? (
                                                <IonRow className="mariachi-package-title">
                                                    Great Deal !
                                                </IonRow>
                                            ):(
                                                <IonRow className="mariachi-package-title">
                                                    Great Deal!
                                                </IonRow>
                                            )}


                                            <IonRow className="mariachi-number-title">
                                                6 Mariachis
                                            </IonRow>
                                            {/*$180 @ 70*/}
                                            {/*$120 @ 80*/}
                                            {!twoHoursOnly && distNum < 50 ? (
                                                <BookingFormPricesComponent
                                                    feePrice={700}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    mariachiPackageId={5}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice="1 Hr $700"
                                                    discountedPriceDisplay=""
                                                    discounted={false}
                                                    discountedFeePrice={0}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={1}
                                                />

                                            ):(
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>2 Hr Booking Min.</div>
                                                </div>
                                            )}


                                            {/*140 @ $80*/}
                                            {selectedStartTimeMaxPossibleHours > 1 && parseInt(distNum) > 140 ? (
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>3 Hr Booking Min.</div>
                                                </div>
                                            ): (
                                                <BookingFormPricesComponent
                                                    feePrice={1400}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={6}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="2 Hrs $1400"
                                                    discountedPriceDisplay="2hrs $1300"
                                                    discounted={true}
                                                    discountedFeePrice={1300}
                                                    discountedMariachiPackageId={19}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={2}/>

                                            )}
                                           
                                            {/*160 @ $80*/}
                                            {selectedStartTimeMaxPossibleHours > 2 &&(

                                                <BookingFormPricesComponent
                                                    feePrice={2100}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={7}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="3 Hrs $1900"
                                                    discountedPriceDisplay="3hrs $1900"
                                                    discountedMariachiPackageId={20}
                                                    discounted={true}
                                                    discountedFeePrice={1900}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}/>

                                            )}
                                             {selectedStartTimeMaxPossibleHours > 3 &&(

                                                <BookingFormPricesComponent
                                                    feePrice={2800}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={7}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="4 Hrs $2800"
                                                    discountedPriceDisplay="4hrs $2500"
                                                    discountedMariachiPackageId={20}
                                                    discounted={true}
                                                    discountedFeePrice={2500}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}/>

                                                )}

                                        </IonCol>

                                        <IonCol   className="mariachi-price-package-container"
                                                  style={{
                                            backgroundImage: "linear-gradient(315deg, #3dc2ff,#adf8ed 74%)",
                                            }}
                                            >
                                            {selectedStartTimeMaxPossibleHours > 1 ? (
                                                <IonRow className="mariachi-package-title">
                                                    Even Greater Deal !
                                                </IonRow>
                                            ):(
                                                <IonRow className="mariachi-package-title">
                                                    Even Greater Deal!
                                                </IonRow>
                                            )}


                                            <IonRow className="mariachi-number-title">
                                                7 Mariachis
                                            </IonRow>
                                            {/*$210 @ 70*/}
                                            {/*$140 @ 80*/}
                                            {!twoHoursOnly && distNum < 50 ? (
                                                <BookingFormPricesComponent
                                                    feePrice={800}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="7 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    mariachiPackageId={5}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice="1 Hr $800"
                                                    discountedPriceDisplay=""
                                                    discounted={false}
                                                    discountedFeePrice={0}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={1}
                                                />

                                            ):(
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>2 Hr Booking Min.</div>
                                                </div>
                                            )}

                                            {/*80 @ $80*/}
                                            {/*220 @ $70*/}
                                            {parseInt(distNum) > 140 ? (
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>3 Hr Booking Min.</div>
                                                </div>
                                            ): (
                                                <div>
                                                {selectedStartTimeMaxPossibleHours > 1 && (
                                                    <BookingFormPricesComponent
                                                        feePrice={1500}
                                                        setFeeTotal={setFeeTotal}
                                                        numberOfMariachis={numberOfMariachis}
                                                        mariachiSize="7 Mariachis"
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        selectedPrice={selectedPrice}
                                                        mariachiPackageId={6}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        displayPrice="2 Hrs $1500"
                                                        discountedPriceDisplay="2hrs $1400"
                                                        discounted={true}
                                                        discountedFeePrice={1400}
                                                        discountedMariachiPackageId={19}
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={2}/>
    
                                                ) }
                                                </div>
                                            )}
                                           
                                           
                                           
                                            {/*120 @ $80*/}
                                            {selectedStartTimeMaxPossibleHours > 2 && (
                                                
                                                <BookingFormPricesComponent
                                                    feePrice={2400}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="7 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={7}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="3 Hrs $2400"
                                                    discountedPriceDisplay="3hrs $2200"
                                                    discountedMariachiPackageId={20}
                                                    discounted={true}
                                                    discountedFeePrice={2200}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}/>
                                            )}

                                            {selectedStartTimeMaxPossibleHours > 3 && (
                                                
                                                <BookingFormPricesComponent
                                                    feePrice={3200}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="7 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={7}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="4 Hrs $3200"
                                                    discountedPriceDisplay="4hrs $2800"
                                                    discountedMariachiPackageId={20}
                                                    discounted={true}
                                                    discountedFeePrice={2800}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={4}/>
                                            )}

                                        </IonCol>



                                    <IonCol  className="mariachi-price-package-container"
                                        style={{

                                            backgroundImage: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
                                        }}
                                    >

                                        {selectedStartTimeMaxPossibleHours > 1 ? (
                                            <IonRow className="mariachi-package-title">
                                                Better Deal !
                                            </IonRow>
                                        ):(
                                            <IonRow className="mariachi-package-title">
                                                Better Deal !
                                            </IonRow>
                                        )}


                                        <IonRow className="mariachi-number-title">
                                            8 Mariachis
                                        </IonRow>
                                        {/*$220 @60*/}
                                        {/*$140 @70*/}
                                        {/*$60 @80*/}
                                        {!twoHoursOnly && distNum < 50 ? (
                                            <BookingFormPricesComponent
                                                feePrice={900}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="8 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={8}
                                                setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="1 Hr $900"
                                                discountedPriceDisplay=""
                                                discounted={false}
                                                discountedFeePrice={0}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={1}/>

                                        ):(
                                            <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                <div>2 Hr Booking Min.</div>
                                            </div>
                                        )}

                                       {/* $230 @70*/}
                                       {/* $70 @80*/}
                                       
                                       {parseInt(distNum) > 140 ? (
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>3 Hr Booking Min.</div>
                                                </div>
                                            ):
                                            (  <div>
                                            {selectedStartTimeMaxPossibleHours > 1 && (
                                            <BookingFormPricesComponent
                                                feePrice={1800}
                                                setFeeTotal={setFeeTotal}
                                                mariachiSize="8 Mariachis"
                                                numberOfMariachis={numberOfMariachis}
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                mariachiPackageId={0}
                                                setMariachiPackageId={setMariachiPackageId}
                                                selectedPrice={selectedPrice}
                                                displayPrice="2 Hrs $1800"
                                                discountedPriceDisplay="2 Hrs $1600"
                                                discounted={true}
                                                discountedFeePrice={1600}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={2}
                                                 discountedMariachiPackageId={16}
                                            />

                                             )}
                                       </div>

                                            )}
                                       
                                       
                                        {/*$320 @70*/}
                                        {/*80 @80*/}
                                        {selectedStartTimeMaxPossibleHours > 2 && (
                                          <BookingFormPricesComponent
                                          feePrice={2700}
                                          setFeeTotal={setFeeTotal}
                                          numberOfMariachis={numberOfMariachis}
                                          mariachiSize="8 Mariachis"
                                          setNumberOfMariachis={setNumberOfMariachis}
                                          setSelectedPrice={setSelectedPrice}
                                          selectedPrice={selectedPrice}
                                          mariachiPackageId={10}
                                          setMariachiPackageId={setMariachiPackageId}
                                          displayPrice="3 Hrs $2700"
                                          discountedPriceDisplay="3 Hrs $2400"
                                          discounted={true}
                                          discountedMariachiPackageId={21}
                                          discountedFeePrice={2400}
                                          setSelectedNumberOfHours={setSelectedNumberOfHours}
                                          numberOfHours={3}
                                      />


                                        )}
                                        {/*$360 @$70/ */}
                                        {/*$40 @$80 */}
                                        {selectedStartTimeMaxPossibleHours > 3 && (
                                             <BookingFormPricesComponent
                                             feePrice={3600}
                                             setFeeTotal={setFeeTotal}
                                             numberOfMariachis={numberOfMariachis}
                                             mariachiSize="8 Mariachis"
                                             setNumberOfMariachis={setNumberOfMariachis}
                                             setSelectedPrice={setSelectedPrice}
                                             selectedPrice={selectedPrice}
                                             mariachiPackageId={11}
                                             setMariachiPackageId={setMariachiPackageId}
                                              displayPrice="4 Hrs $3600"
                                             discountedPriceDisplay="4 Hrs $3300"
                                             discounted={true}
                                             discountedMariachiPackageId={22}
                                             discountedFeePrice={3300}
                                             setSelectedNumberOfHours={setSelectedNumberOfHours}
                                             numberOfHours={4}/>
                                        )}
                                    </IonCol>
                                    <IonCol  className="mariachi-price-package-container"
                                        style={{

                                            backgroundImage: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
                                        }}
                                    >

                                        {selectedStartTimeMaxPossibleHours > 1 ? (
                                            <IonRow className="mariachi-package-title">
                                               Even Better Deal !
                                            </IonRow>
                                        ):(
                                            <IonRow className="mariachi-package-title">
                                                Even Better Deal !
                                            </IonRow>
                                        )}


                                        <IonRow className="mariachi-number-title">
                                            9 Mariachis
                                        </IonRow>
                                        {/*$220 @60*/}
                                        {/*$140 @70*/}
                                        {/*$60 @80*/}
                                        {!twoHoursOnly && distNum < 50 ? (
                                            <BookingFormPricesComponent
                                                feePrice={1000}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="9 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={8}
                                                setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="1 Hr $1000"
                                                discountedPriceDisplay=""
                                                discounted={false}
                                                discountedFeePrice={0}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={1}/>

                                        ):(
                                            <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                <div>2 Hr Booking Min.</div>
                                            </div>
                                        )}

                                       {/* $215 @70*/}
                                       {/* $35 @80*/}
                                       {parseInt(distNum) > 140 ? (
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>3 Hr Booking Min.</div>
                                                </div>
                                            ):(
                                            <div>
                                                {selectedStartTimeMaxPossibleHours > 1 && (
                                                    <BookingFormPricesComponent
                                                        feePrice={2000}
                                                        setFeeTotal={setFeeTotal}
                                                        mariachiSize="9 Mariachis"
                                                        numberOfMariachis={numberOfMariachis}
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        mariachiPackageId={0}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        selectedPrice={selectedPrice}
                                                        displayPrice="2 Hrs $2000"
                                                        discountedPriceDisplay="2 Hrs $1850"
                                                        discounted={false}
                                                        discountedFeePrice={1850}
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={2}
                                                        discountedMariachiPackageId={16}
                                                    />

                                                )}
                                            </div>
                                        )}
                                       {/* </div>
                                    )} */}
                                       
                                        {/*$310 @70*/}
                                        {/*40 @80*/}
                                        {selectedStartTimeMaxPossibleHours > 2 && (
                                             <BookingFormPricesComponent
                                             feePrice={3000}
                                             setFeeTotal={setFeeTotal}
                                             numberOfMariachis={numberOfMariachis}
                                             mariachiSize="9 Mariachis"
                                             setNumberOfMariachis={setNumberOfMariachis}
                                             setSelectedPrice={setSelectedPrice}
                                             selectedPrice={selectedPrice}
                                             mariachiPackageId={10}
                                             setMariachiPackageId={setMariachiPackageId}
                                             displayPrice="3 Hrs $3000"
                                             discountedPriceDisplay="3 Hrs $2700"
                                             discounted={true}
                                             discountedMariachiPackageId={21}
                                             discountedFeePrice={2700}
                                             setSelectedNumberOfHours={setSelectedNumberOfHours}
                                             numberOfHours={3}
                                         />

                                        )}
                                        {/*$360 @$70/ */}
                                        {/*$120 @$80 */}
                                        {selectedStartTimeMaxPossibleHours > 3 && (
                                            <BookingFormPricesComponent
                                                feePrice={4000}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="9 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={11}
                                                setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="4 Hrs $4000"
                                                discountedPriceDisplay="4 Hrs $3500"
                                                discounted={true}
                                                discountedMariachiPackageId={22}
                                                discountedFeePrice={3500}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={4}/>
                                        )}
                                    </IonCol>

                                    <IonCol  className="mariachi-price-package-container"
                                        style={{

                                            backgroundImage: "linear-gradient(315deg, rgba(255, 0, 0, 1) 0%, rgba(255, 237, 0, 1) 74%)",
                                        }}
                                    >
                                        {selectedStartTimeMaxPossibleHours > 1 ? (
                                            <IonRow className="mariachi-package-title">
                                                Best Deal !
                                            </IonRow>
                                        ):(
                                            <IonRow className="mariachi-package-title">
                                                Best Deal !
                                            </IonRow>
                                        )}


                                        <IonRow className="mariachi-number-title">
                                            10 Mariachis
                                        </IonRow>
                                        {/*// $50 @$80*/}
                                        {/*$100 @ $70*/}
                                        {!twoHoursOnly && distNum < 50 ? (
                                            <BookingFormPricesComponent
                                                feePrice={1100}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                // mariachiPackageId={12}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="1 Hr $1100"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={1}

                                            />

                                        ):(
                                            <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                <div>2 Hr Booking Min.</div>
                                            </div>
                                        )}
                                        {/* 0 $0 & 150 $70 */}
                                        {parseInt(distNum) > 140 ? (
                                                <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                    <div>3 Hr Booking Min.</div>
                                                </div>
                                            ):(
                                                <div>
                                             {selectedStartTimeMaxPossibleHours > 1 && dateWithinTwoWeeks ? (
                                            <BookingFormPricesComponent
                                                feePrice={2200}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                setFeeTotal={setFeeTotal}
                                                mariachiPackageId={13}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="2 Hrs $2200"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={2}
                                                discountedPriceDisplay="2 Hrs $2000"
                                                discounted={false}
                                                discountedFeePrice={2000}
                                                 // discountedMariachiPackageId={13}
                                            />
                                        ): (
                                            
                                            // $250 @ $70 
                                            // @$80 $50
                                            <div>
                                                {selectedStartTimeMaxPossibleHours > 1 &&(
                                                    <BookingFormPricesComponent
                                                        feePrice={2200}
                                                        numberOfMariachis={numberOfMariachis}
                                                        mariachiSize="10 Mariachis"
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        selectedPrice={selectedPrice}
                                                        setFeeTotal={setFeeTotal}
                                                        mariachiPackageId={13}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        displayPrice="2 Hrs $2200"
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={2}
                                                        discountedPriceDisplay="2 Hrs $2000"
                                                        discounted={false}
                                                        discountedFeePrice={2000}
                                                        // discountedMariachiPackageId={13}

                                                    />
                                                )}
                                            </div>



                                        )} 
                                        </div> 
                                            )}
                                       
                                      
                                        
                                        {/*$300 @ $70*/}
                                         {/* $0 @$80 */}
                                        {selectedStartTimeMaxPossibleHours > 2 && (
                                            <BookingFormPricesComponent
                                                feePrice={3300}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={14}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="3 Hrs $3300"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={3}
                                                discountedPriceDisplay="3 Hrs $2900"
                                                discounted={true}
                                                discountedFeePrice={2900}
                                            // discountedMariachiPackageId={13}
                                            />


                                        )}
                                       
                                        {/*400 @ $70*/}
                                        {/* $0  @ $80 */}
                                        {selectedStartTimeMaxPossibleHours > 3 &&  (
                                                <BookingFormPricesComponent
                                                    feePrice={4400}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="10 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    mariachiPackageId={15}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice="4 Hrs $4400"
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={4}
                                                    discountedPriceDisplay="4 Hrs $3800"
                                                    discounted={true}
                                                    discountedFeePrice={3800}
                                                    // discountedMariachiPackageId={13}
                                                />


                                            )}
                                    </IonCol>

                                </IonRow>
                                <IonRow>

                                </IonRow>

                            </div>


                    </IonRow>
            </>
                 </>

                
    )}


        </IonGrid>
        </>
        

    )
}
export default BookingFormPrices;
