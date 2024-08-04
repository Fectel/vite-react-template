import React, {useEffect, useState} from "react";
import {IonCol, IonGrid, IonRow} from "@ionic/react";


import "./booking-form-prices.styles.scss"
import BookingFormPricesComponent from "./booking-form-prices-component/booking-form-prices-component.jsx";
const BookingFormPrices = ({timeOfDayChoice, selectedFormattedStartTime,
                          setSelectedNumberOfHours, selectedStartTime, value, numberOfMariachis,
                             selectedStartTimeMaxPossibleHours,feeTotal,
    setFeeTotal,mariachiPackageId,setMariachiPackageId,
                               selectedPrice, setSelectedPrice, outOfTownFee,distNum,
    setNumberOfMariachis,
                           }) => {

    const [ loadedPrices, setLoadedPrices ] = useState(false)
    const [ friSatEvening , setFriSatEvening ] = useState(false)
    const [ friSatNight , setFriSatNight ] = useState(false)

    const [ twoHoursOnly, setTwoHoursOnly ] = useState(false)
    const [ dateWithinTwoWeeks, setDateWithinTwoWeeks ] = useState(false)

    // const chosenPriceStyle = {
    //     backgroundColor: suggestion.active ? "#490411" : "#fff",
    //     color: suggestion.active ? "#fff" : "black",
    //     cursor: "pointer"
    // }


    const currentDate= new Date();
    const twoWeeksDate = new Date();
    const [showTwoHoursAt4, setShowTwoHoursAt4 ] = useState(true)

    currentDate.setHours(0)

    twoWeeksDate.setHours(353)

    console.log(currentDate, "-" , twoWeeksDate)



    useEffect(() => {


        console.log("setting mariachi size to undefined")
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

        // console.log("TwoHoursOnly: ",twoHoursOnly, "FSE: ", friSatEvening,"FSN: ", friSatNight)

    },[timeOfDayChoice, selectedFormattedStartTime,
        selectedStartTimeMaxPossibleHours,
        selectedStartTime, value, twoHoursOnly])



    console.log(timeOfDayChoice)
    console.log(outOfTownFee)
    console.log(distNum)
    return (
        <IonGrid >
            {loadedPrices && (
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


                                    { (timeOfDayChoice !== "Evening" && timeOfDayChoice !== "Night") && distNum < 50 &&(
                                        <IonCol  className="mariachi-price-package-container"  >
                                            <IonRow className="mariachi-number-title">
                                                4 Mariachis
                                            </IonRow>
                                            {/*$160 @60*/}
                                            {/*$120 @ 70*/}
                                            {/*$80 @ 80*/}
                                            {(
                                                <BookingFormPricesComponent
                                                    feePrice={400}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="4 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={1}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                   displayPrice="1 Hr $400"
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
                                                    feePrice={800}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="4 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice={"2 Hrs $800"}
                                                    mariachiPackageId={2}
                                                    setMariachiPackageId={setMariachiPackageId}

                                                    discountedPriceDisplay="2hrs $750"
                                                    discounted={dateWithinTwoWeeks}
                                                    discountedFeePrice={750}
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
                                                    feePrice={1200}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="4 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice={"3 Hrs $1200"}
                                                    mariachiPackageId={2}
                                                    setMariachiPackageId={setMariachiPackageId}

                                                    discountedPriceDisplay="3hrs $1100"
                                                    discounted={dateWithinTwoWeeks}
                                                    discountedFeePrice={1100}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}
                                                    // discountedMariachiPackageId={17}

                                                />

                                            )}

                                        </IonCol>

                                    )}
                                    {(timeOfDayChoice === "Evening" || timeOfDayChoice === "Night" )&& distNum < 50 && (
                                        <div>
                                            {  dateWithinTwoWeeks ? (
                                                <IonCol  className="mariachi-price-package-container"  >
                                                    <IonRow className="mariachi-number-title">
                                                        4 Mariachis
                                                    </IonRow>
                                                    {/*$185 @60*/}
                                                    {/*$145 @ 70*/}
                                                    {/*$105 @ 80*/}
                                                    {!twoHoursOnly && (
                                                        <BookingFormPricesComponent
                                                            feePrice={425}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            // mariachiPackageId={1}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            displayPrice="1 Hr $425"
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
                                                            feePrice={850}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"2 Hrs $850"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="2hrs $800"
                                                            discounted={dateWithinTwoWeeks}
                                                            discountedFeePrice={800}
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
                                                            feePrice={1200}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"3 Hrs $1275"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="3hrs $1150"
                                                            discounted={dateWithinTwoWeeks}
                                                            discountedFeePrice={1150}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={3}
                                                            // discountedMariachiPackageId={17}

                                                        />

                                                    )}

                                                </IonCol>

                                            ):(
                                                <IonCol  className="mariachi-price-package-container"  >
                                                    <IonRow className="mariachi-number-title">
                                                        4 Mariachis
                                                    </IonRow>

                                                    {/*$210 @60*/}
                                                    {/*$170 @ 70*/}
                                                    {/*$130 @ 80*/}
                                                    {!twoHoursOnly && (
                                                        <BookingFormPricesComponent
                                                            feePrice={450}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            mariachiPackageId={1}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            displayPrice="1 Hr $450"
                                                            discountedPriceDisplay=""
                                                            discounted={false}
                                                            discountedFeePrice={0}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={1}

                                                        />
                                                    )}

                                                    {/*$270 @ 60*/}
                                                    {/*190 @ $70*/}
                                                    {/*$150 @ $75*/}
                                                    {/*$110 @ $80*/}
                                                    {selectedStartTimeMaxPossibleHours > 1 &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={900}
                                                            setFeeTotal={setFeeTotal}
                                                            mariachiSize="4 Mariachis"
                                                            numberOfMariachis={numberOfMariachis}
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice="2 Hrs $900"
                                                            discountedPriceDisplay="2 Hrs $800"
                                                            discounted={true}
                                                            discountedFeePrice={800}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={2}
                                                            // discountedMariachiPackageId={17}
                                                        />

                                                    )}

                                                    {/*380 @ 60*/}
                                                    {/*$260 @ $70*/}
                                                    {/*140 @ $80*/}
                                                    {selectedStartTimeMaxPossibleHours > 2  &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={1350}
                                                            setFeeTotal={setFeeTotal}
                                                            mariachiSize="4 Mariachis"
                                                            numberOfMariachis={numberOfMariachis}
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice="3 Hrs $1350"
                                                            discountedPriceDisplay="3 Hrs $1200"
                                                            discounted={true}
                                                            discountedFeePrice={1250}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={2}
                                                            discountedMariachiPackageId={9}

                                                        />


                                                    )}

                                                </IonCol>

                                            )}
                                        </div>
                                    )}
                                    {distNum > 50 && (
                                        <div>
                                            {  dateWithinTwoWeeks ? (
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
                                                    {selectedStartTimeMaxPossibleHours > 1 &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={850}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"2 Hrs $850"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="2hrs $750"
                                                            discounted={dateWithinTwoWeeks}
                                                            discountedFeePrice={750}
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
                                                            feePrice={1200}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="4 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice={"3 Hrs $1275"}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}

                                                            discountedPriceDisplay="3hrs $1150"
                                                            discounted={dateWithinTwoWeeks}
                                                            discountedFeePrice={1150}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={3}
                                                            // discountedMariachiPackageId={17}

                                                        />

                                                    )}

                                                </IonCol>

                                            ):(
                                                <IonCol  className="mariachi-price-package-container"  >
                                                    <IonRow className="mariachi-number-title">
                                                        4 Mariachis
                                                    </IonRow>
                                                    {/*$210 @60*/}
                                                    {/*$170 @ 70*/}
                                                    {/*$130 @ 80*/}
                                                    <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                        <div>2 Hr Booking Min.</div>
                                                    </div>

                                                    {/*$270 @ 60*/}
                                                    {/*190 @ $70*/}
                                                    {/*$150 @ $75*/}
                                                    {/*$110 @ $80*/}
                                                    {selectedStartTimeMaxPossibleHours > 1 &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={900}
                                                            setFeeTotal={setFeeTotal}
                                                            mariachiSize="4 Mariachis"
                                                            numberOfMariachis={numberOfMariachis}
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice="2 Hrs $900"
                                                            discountedPriceDisplay="2 Hrs $800"
                                                            discounted={true}
                                                            discountedFeePrice={800}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={2}
                                                            // discountedMariachiPackageId={17}
                                                        />

                                                    )}

                                                    {/*380 @ 60*/}
                                                    {/*$260 @ $70*/}
                                                    {/*140 @ $80*/}
                                                    {selectedStartTimeMaxPossibleHours > 2  &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={1350}
                                                            setFeeTotal={setFeeTotal}
                                                            mariachiSize="4 Mariachis"
                                                            numberOfMariachis={numberOfMariachis}
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            mariachiPackageId={2}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice="3 Hrs $1350"
                                                            discountedPriceDisplay="3 Hrs $1250"
                                                            discounted={true}
                                                            discountedFeePrice={1250}
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={3}
                                                            discountedMariachiPackageId={9}

                                                        />


                                                    )}

                                                </IonCol>

                                            )}
                                        </div>

                                    )}

                                    {!friSatEvening && !friSatNight && timeOfDayChoice !== "Night" &&(
                                        <IonCol  className="mariachi-price-package-container"  >
                                            <IonRow className="mariachi-number-title">
                                                5 Mariachis
                                            </IonRow>
                                            {/*$175 @60*/}
                                            {/*$125 @ 70*/}
                                            {/*$75 @ 80*/}
                                            {!twoHoursOnly && distNum < 50 ?(
                                                <BookingFormPricesComponent
                                                    feePrice={500}
                                                    setFeeTotal={setFeeTotal}
                                                    mariachiSize="5 Mariachis"
                                                    numberOfMariachis={numberOfMariachis}
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}mariachiPackageId={3}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                     displayPrice="1 Hr $500"
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


                                            {/*$350 @ 60 $300*/}
                                            {/*250 @ $70 $200*/}
                                            {/*150 @ $80 $100*/}
                                            {selectedStartTimeMaxPossibleHours > 1 && showTwoHoursAt4  &&(
                                                <BookingFormPricesComponent
                                                    feePrice={1000}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="5 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={4}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="2 Hrs 1000"
                                                    discountedPriceDisplay="2hrs $900"
                                                    discounted={dateWithinTwoWeeks}
                                                    // discountedMariachiPackageId={18}
                                                    discountedFeePrice={900}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={2}

                                                />

                                            )}
                                            {/*$350 @ 60 $300*/}
                                            {/*250 @ $70 $200*/}
                                            {/*150 @ $80 $100*/}
                                            {selectedStartTimeMaxPossibleHours > 2 && showTwoHoursAt4  &&(
                                                <BookingFormPricesComponent
                                                    feePrice={1500}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="5 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={4}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="3 Hrs 1500"
                                                    discountedPriceDisplay="2hrs $1350"
                                                    discounted={dateWithinTwoWeeks}
                                                    // discountedMariachiPackageId={18}
                                                    discountedFeePrice={1350}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}

                                                />

                                            )}




                                        </IonCol>

                                    )}

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
                                            {/*$190 @60*/}
                                            {/*$130 @ 70*/}
                                            {/*$70 @ 80*/}
                                            {!twoHoursOnly && distNum < 50 ? (
                                                <BookingFormPricesComponent
                                                    feePrice={550}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    mariachiPackageId={5}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice="1 Hr $550"
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

                                            {/*$330/280 @ 60*/}
                                            {/*210/160 @ $70*/}
                                            {/*150/100 @ $80*/}
                                            {selectedStartTimeMaxPossibleHours > 1 && (
                                                <BookingFormPricesComponent
                                                    feePrice={1000}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={6}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="2 Hrs $1100"
                                                    discountedPriceDisplay="2hrs $1000"
                                                    discounted={dateWithinTwoWeeks}
                                                    discountedFeePrice={1000}
                                                    discountedMariachiPackageId={19}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={2}/>

                                            )}
                                            {/*$420 @ 60*/}
                                            {/*240 @ $70*/}
                                            {/*180 @ $80*/}
                                            {selectedStartTimeMaxPossibleHours > 2 &&(

                                                <BookingFormPricesComponent
                                                    feePrice={1550}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="6 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    selectedPrice={selectedPrice}
                                                    mariachiPackageId={7}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    displayPrice="3 Hrs $1550"
                                                    discountedPriceDisplay="3hrs $1450"
                                                    discountedMariachiPackageId={20}
                                                    discounted={dateWithinTwoWeeks}
                                                    discountedFeePrice={1450}
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={3}/>

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
                                        {/*$170 @60*/}
                                        {/*$90 @70*/}
                                        {/*$10 @80*/}
                                        {!twoHoursOnly && distNum < 50 ? (
                                            <BookingFormPricesComponent
                                                feePrice={650}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="8 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={8}
                                                setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="1 Hr $650"
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

                                       {/*$240 @60*/}
                                       {/* $80 @70*/}
                                       {/* $-80 @80*/}
                                        {selectedStartTimeMaxPossibleHours > 1 &&  dateWithinTwoWeeks ? (
                                            <BookingFormPricesComponent
                                                feePrice={1300}
                                                setFeeTotal={setFeeTotal}
                                                mariachiSize="8 Mariachis"
                                                numberOfMariachis={numberOfMariachis}
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                mariachiPackageId={0}
                                                setMariachiPackageId={setMariachiPackageId}
                                                selectedPrice={selectedPrice}
                                                displayPrice="2 Hrs $1300"
                                                discountedPriceDisplay="2 Hrs $1200"
                                                discounted={dateWithinTwoWeeks}
                                                discountedFeePrice={1200}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={2}
                                                 discountedMariachiPackageId={16}
                                            />

                                        ): (
                                        // $270 @60
                                         // $110 @70
                                         // $-30 @80
                                            <div>
                                                {selectedStartTimeMaxPossibleHours > 1 && (
                                                    <BookingFormPricesComponent
                                                        feePrice={1300}
                                                        setFeeTotal={setFeeTotal}
                                                        mariachiSize="8 Mariachis"
                                                        numberOfMariachis={numberOfMariachis}
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        mariachiPackageId={9}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        selectedPrice={selectedPrice}
                                                        displayPrice="2 Hrs $1300"
                                                        discountedPriceDisplay="2 Hrs $1250"
                                                        discounted={true}
                                                        discountedFeePrice={1250}
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={2}
                                                        discountedMariachiPackageId={9}

                                                    />

                                                )}

                                            </div>

                                        )}
                                        {/* $360 @ 60*/}
                                        {/*$120 @70*/}
                                        {/*-$120 @80*/}
                                        {selectedStartTimeMaxPossibleHours > 2 && (
                                            <BookingFormPricesComponent
                                                feePrice={1950}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="8 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={10}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="3 Hrs $1950"
                                                discountedPriceDisplay="3 Hrs $1800"
                                                discounted={dateWithinTwoWeeks}
                                                discountedMariachiPackageId={21}
                                                discountedFeePrice={1750}
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={3}
                                            />
                                        )}
                                        {/*$480 @$60 / $430*/}
                                        {/*$160 @$70/ */}
                                        {/*-$160 @$80 */}
                                        {selectedStartTimeMaxPossibleHours > 3 && (
                                            <BookingFormPricesComponent
                                                feePrice={2600}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="8 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={11}
                                                setMariachiPackageId={setMariachiPackageId}
                                                 displayPrice="4 Hrs $2600"
                                                discountedPriceDisplay="4 Hrs $2400"
                                                discounted={dateWithinTwoWeeks}
                                                discountedMariachiPackageId={22}
                                                discountedFeePrice={2400}
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
                                        {/*// $200/$150 @$60*/}
                                        {/*$100/$50 @ $70*/}
                                        {!twoHoursOnly && distNum < 50 ? (
                                            <BookingFormPricesComponent
                                                feePrice={800}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                // mariachiPackageId={12}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="1 Hr $800"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={1}

                                            />

                                        ):(
                                            <div style={{textAlign:"center",fontWeight:"bold", color: "red", fontSize:".8rem", padding: ".2em"}}>
                                                <div>2 Hr Booking Min.</div>
                                            </div>
                                        )}
                                        {/*// $400 @60s/ $300 */}
                                        {/*$200 @ $70 / $100 */}
                                        {/*$0 @ $80 -$100*/}
                                        {selectedStartTimeMaxPossibleHours > 1 && dateWithinTwoWeeks ? (
                                            <BookingFormPricesComponent
                                                feePrice={1600}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                setFeeTotal={setFeeTotal}
                                                mariachiPackageId={13}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="2 Hrs $1600"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={2}
                                                discountedPriceDisplay="2 Hrs $1500"
                                                discounted={true}
                                                discountedFeePrice={1500}
                                                 // discountedMariachiPackageId={13}

                                            />

                                        ): (
                                            // $400 @60s/ $350
                                        // $200 @ $70 / $150
                                        // $0 @ $80 -$50
                                            <div>
                                                {selectedStartTimeMaxPossibleHours > 1 &&(
                                                    <BookingFormPricesComponent
                                                        feePrice={1600}
                                                        numberOfMariachis={numberOfMariachis}
                                                        mariachiSize="10 Mariachis"
                                                        setNumberOfMariachis={setNumberOfMariachis}
                                                        setSelectedPrice={setSelectedPrice}
                                                        selectedPrice={selectedPrice}
                                                        setFeeTotal={setFeeTotal}
                                                        mariachiPackageId={13}
                                                        setMariachiPackageId={setMariachiPackageId}
                                                        displayPrice="2 Hrs $1600"
                                                        setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                        numberOfHours={2}
                                                        discountedPriceDisplay="2 Hrs $1550"
                                                        discounted={true}
                                                        discountedFeePrice={1550}
                                                        // discountedMariachiPackageId={13}

                                                    />
                                                )}
                                            </div>



                                        )}
                                        {/*// $400 @60*/}
                                        {/*// $250 @65*/}
                                        {/*$100 @ $70*/}
                                        {selectedStartTimeMaxPossibleHours > 2 && dateWithinTwoWeeks ?  (
                                            <BookingFormPricesComponent
                                                feePrice={2400}
                                                setFeeTotal={setFeeTotal}
                                                numberOfMariachis={numberOfMariachis}
                                                mariachiSize="10 Mariachis"
                                                setNumberOfMariachis={setNumberOfMariachis}
                                                setSelectedPrice={setSelectedPrice}
                                                selectedPrice={selectedPrice}
                                                mariachiPackageId={14}
                                                setMariachiPackageId={setMariachiPackageId}
                                                displayPrice="3 Hrs $2400"
                                                setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                numberOfHours={3}
                                                discountedPriceDisplay="3 Hrs $2200"
                                                discounted={true}
                                                discountedFeePrice={2200}
                                            // discountedMariachiPackageId={13}
                                            />


                                        ):
                                            (
                                            // $200 @ $70
                                                <div>
                                                    {selectedStartTimeMaxPossibleHours > 2 && (
                                                        <BookingFormPricesComponent
                                                            feePrice={2400}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="10 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            selectedPrice={selectedPrice}
                                                            setFeeTotal={setFeeTotal}
                                                            mariachiPackageId={14}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            displayPrice="3 Hrs $2400"
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={3}
                                                            discountedPriceDisplay="2 Hrs $2300"
                                                            discounted={true}
                                                            discountedFeePrice={2300}
                                                            // discountedMariachiPackageId={13}

                                                        />
                                                    )}
                                                </div>

                                            )}
                                        {/*600 @60*/}
                                        {/*400 @60*/}
                                        {/*200 @ $70*/}
                                        {selectedStartTimeMaxPossibleHours > 3 && dateWithinTwoWeeks ?  (
                                                <BookingFormPricesComponent
                                                    feePrice={3200}
                                                    setFeeTotal={setFeeTotal}
                                                    numberOfMariachis={numberOfMariachis}
                                                    mariachiSize="10 Mariachis"
                                                    setNumberOfMariachis={setNumberOfMariachis}
                                                    setSelectedPrice={setSelectedPrice}
                                                    mariachiPackageId={15}
                                                    setMariachiPackageId={setMariachiPackageId}
                                                    selectedPrice={selectedPrice}
                                                    displayPrice="4 Hrs $3200"
                                                    setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                    numberOfHours={4}
                                                    discountedPriceDisplay="4 Hrs $3000"
                                                    discounted={true}
                                                    discountedFeePrice={3000}
                                                    // discountedMariachiPackageId={13}
                                                />


                                            ):
                                            (
                                                // $600 @60
                                                // $400 @65
                                                // $300 @ $70
                                                <div>

                                                    {selectedStartTimeMaxPossibleHours > 3 &&(
                                                        <BookingFormPricesComponent
                                                            feePrice={3200}
                                                            setFeeTotal={setFeeTotal}
                                                            numberOfMariachis={numberOfMariachis}
                                                            mariachiSize="10 Mariachis"
                                                            setNumberOfMariachis={setNumberOfMariachis}
                                                            setSelectedPrice={setSelectedPrice}
                                                            mariachiPackageId={15}
                                                            setMariachiPackageId={setMariachiPackageId}
                                                            selectedPrice={selectedPrice}
                                                            displayPrice="4 Hrs $3200"
                                                            setSelectedNumberOfHours={setSelectedNumberOfHours}
                                                            numberOfHours={4}
                                                            discountedPriceDisplay="4 Hrs $3100"
                                                            discounted={true}
                                                            discountedFeePrice={3100}
                                                            // discountedMariachiPackageId={13}
                                                        />
                                                    )}

                                                </div>


                                            )}
                                    </IonCol>

                                </IonRow>
                                <IonRow>

                                </IonRow>

                            </div>


                    </IonRow>
                </>
            )}


        </IonGrid>

    )
}
export default BookingFormPrices;