import React, { useState} from "react"
import {
    IonBreadcrumb,
    IonBreadcrumbs,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent, IonGrid,
    IonList,
    IonPage, IonRow,
} from "@ionic/react";
import TA_logo from "../../assets/TA_Logo.png"
import HeaderWithoutImg from "../../components/header/header-without-img.jsx";
import "./create-booking-page.styles.scss"
import BookingFormContactInfo
    from "../../components/create-new-booking/booking-form-contact-info/booking-form-contact-info.jsx";
import BookingFormPerformanceAddress
    from "../../components/create-new-booking/booking-form-performance-address/booking-form-performance-address.jsx";
import BookingFormSchedule from "../../components/create-new-booking/booking-form-schedule/booking-form-schedule.jsx";
import BookingFormConfirmation
    from "../../components/create-new-booking/booking-form-confirmation/booking-form-confirmation.jsx";
import BookingFormContactInfoEdit
    from "../../components/create-new-booking/booking-form-contact-info/booking-form-contact-info-edit.jsx";
import BookingDetailsComplete from "../../components/create-new-booking/booking-complete/booking-details-complete";


const CreateBookingPage = () => {

    const [ feeTotal, setFeeTotal ] = useState();
    const [ clientName , setClientName ] = useState();
    const [ clientEmail, setClientEmail ] = useState();
    const [ clientPhoneNumber, setClientPhoneNumber ] = useState();
    const [ addressDistance, setAddressDistance ] = useState();
    const [ addressTravelTime, setAddressTravelTime ] = useState();
    const [grandTotal, setGrandTotal ] = useState(0)

    const [travelFee, setTravelFee ] = useState(0)
    const [ numberOfMariachis, setNumberOfMariachis] = useState()

    const [ selectedStartTimeMaxPossibleHours, setSelectedStartTimeMaxPossibleHours ] = useState();

    const [mariachiPackageId, setMariachiPackageId ] = useState();


    const [address, setAddress ]= useState("");
    const [performanceAddress, setPerformanceAddress ]= useState("");
    const [currentBookingStep, setCurrentBookingStep] = useState(0)


    const [ selectedFormattedStartTime , setSelectedFormattedStartTime ] = useState();
    const [ selectedStartTime, setSelectedStartTime ] = useState();
    const [value, onChange] = useState(new Date());
    const [ selectedPrice, setSelectedPrice ] = useState()
    const [bookingPackageName, setBookingPackageName ] = useState("")

    return(
        <IonPage>
            <HeaderWithoutImg />

            <IonContent>
                <IonCard className="create-booking-card">
                    {currentBookingStep !== 5 && (
                        <IonCardHeader style={{backgroundColor: "#490411"}}>

                            <IonCardTitle style={{ textAlign: "center", color: "white"}}>Create Booking</IonCardTitle>
                        </IonCardHeader>
                    )}


                    <IonCardContent style={{ padding: ".2em",backgroundColor: "#490411"}}>
                                <IonList >
                                    {currentBookingStep !== 5 && (
                                        <IonGrid>

                                            <IonRow>
                                                <IonBreadcrumbs style={{margin: "auto"}}>
                                                    <IonBreadcrumb className="booking-page-breadcrumb" style={{  color: currentBookingStep > -1 ? ("#490411"):("")}} >
                                                        Contact Info
                                                    </IonBreadcrumb>
                                                    <IonBreadcrumb className="booking-page-breadcrumb" style={{  color: currentBookingStep > 0 ? ("#490411"):("")}}>
                                                        Address
                                                    </IonBreadcrumb>
                                                    <IonBreadcrumb className="booking-page-breadcrumb" style={{  color: currentBookingStep > 1 ? ("#490411"):("")}} >
                                                        Schedule & Quotes
                                                    </IonBreadcrumb>
                                                    {/*<IonBreadcrumb  className="booking-page-breadcrumb"style={{  color: currentBookingStep > 2 ? ("#490411"):("")}} >*/}
                                                    {/*    Prices*/}
                                                    {/*</IonBreadcrumb>*/}
                                                </IonBreadcrumbs>

                                            </IonRow>
                                        </IonGrid>
                                    )}

                                            {/*//fill in name and email / phone from auth object*/}
                                    {currentBookingStep === 0 && (
                                        <BookingFormContactInfo
                                            clientEmail={clientEmail}
                                            setClientEmail={setClientEmail}
                                            clientName={clientName}
                                            setClientName={setClientName}
                                            clientPhoneNumber={clientPhoneNumber}
                                            setClientPhoneNumber={setClientPhoneNumber}
                                            setCurrentBookingStep={setCurrentBookingStep}
                                            />
                                    )}

                                    {currentBookingStep === 1 && (
                                        <BookingFormPerformanceAddress
                                            setCurrentBookingStep={setCurrentBookingStep}
                                            setPerformanceAddress={setPerformanceAddress}
                                            performanceAddress={performanceAddress}
                                            currentBookingStep={currentBookingStep}
                                            setAddress={setAddress}
                                            setAddressTravelTime={setAddressTravelTime}
                                            setAddressDistance={setAddressDistance}

                                        />
                                    )}

                                    {currentBookingStep === 2 && (
                                        <BookingFormSchedule
                                            selectedStartTime={selectedStartTime}
                                            setSelectedStartTime={setSelectedStartTime}
                                            selectedFormattedStartTime={selectedFormattedStartTime}
                                            setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                            value={value}
                                            onChange={onChange}
                                            currentBookingStep={currentBookingStep}
                                            setCurrentBookingStep={setCurrentBookingStep}
                                            selectedPrice={selectedPrice}
                                            setSelectedPrice={setSelectedPrice}
                                            setNumberOfMariachis={setNumberOfMariachis}
                                            numberOfMariachis={numberOfMariachis}
                                            setFeeTotal={setFeeTotal}
                                            feeTotal={feeTotal}
                                            mariachiPackageId={mariachiPackageId}
                                            setMariachiPackageId={setMariachiPackageId}
                                            bookingPackageName={bookingPackageName}
                                            setBookingPackageName={setBookingPackageName}
                                            address={address}
                                            addressTravelTime={addressTravelTime}
                                            addressDistance={addressDistance}
                                            setTravelFee={setTravelFee}
                                            setGrandTotal={setGrandTotal}
                                            grandTotal={grandTotal}



                                        />
                                    )}
                                    {currentBookingStep === 3 && (
                                        <BookingFormConfirmation
                                            performanceAddress={address}
                                            currentBookingStep={currentBookingStep}
                                            setCurrentBookingStep={setCurrentBookingStep}
                                            clientEmail={clientEmail}
                                            clientName={clientName}
                                            clientPhoneNumber={clientPhoneNumber}
                                            selectedStartTime={selectedStartTime}
                                            selectedFormattedStartTime={selectedFormattedStartTime}
                                            value={value}
                                            numberOfMariachis={numberOfMariachis}
                                            selectedPrice={selectedPrice}
                                            feeTotal={feeTotal}
                                            mariachiPackageId={mariachiPackageId}
                                            setMariachiPackageId={setMariachiPackageId}
                                            bookingPackageName={bookingPackageName}
                                            travelFee={travelFee}
                                            grandTotal={grandTotal}
                                            // number={num}

                                        />
                                    )}

                                    {currentBookingStep === 4 && (
                                        <BookingFormContactInfoEdit
                                            clientEmail={clientEmail}
                                            setClientEmail={setClientEmail}
                                            clientName={clientName}
                                            setClientName={setClientName}
                                            clientPhoneNumber={clientPhoneNumber}
                                            setClientPhoneNumber={setClientPhoneNumber}
                                            setCurrentBookingStep={setCurrentBookingStep}
                                        />
                                    )}

                                    {currentBookingStep === 5 && (

                                        <BookingDetailsComplete />
                                    )}
                                    {/*check distance from phx to asses out of town pricing*/}




                                </IonList>

                        <div style={{ width: "9em", margin: " 1em auto"}}>
                            <img src={TA_logo} alt="mariachi tierra azteca logo"/>
                        </div>

                    </IonCardContent>

                </IonCard>

            </IonContent>
        </IonPage>
    )
}
export default CreateBookingPage;