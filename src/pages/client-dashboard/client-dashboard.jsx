import React, {useEffect, useRef, useState} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonIcon, IonList,
    IonPage
} from "@ionic/react";
import HeaderWithoutImg from "../../components/header/header-without-img";
import {
    auth,
    loadMyBookingRequests,
} from "../../firebase";
import BookingsComponent from "./bookings-component/bookings-component.jsx";
import {useAuth} from "../../auth-context/auth-context";
import { call} from "ionicons/icons";
const ClientDashboard = () => {

    const [currentBookingsBool, setCurrentBookingsBol ] = useState(true)
    const [deletingBooking, setDeletingBooking ] = useState(false)

    const [presentingElement, setPresentingElement] = useState(null);

    const [bookingRequestsArray, setBookingRequestsArray ] = useState([]);
    let loadedBookingRequestsArray = [];

    const [pastBookingRequestsArray, setPastBookingRequestsArray ] = useState([]);
    let loadedPastBookingRequestsArray = [];

    const [pageLoaded, setPageLoaded] = useState(false)

    const createNewBookingModal = useRef(null);
    const page = useRef(null);


    const { currentUser } = useAuth();

    async function loadBookings() {
        console.log("LoadBookings")
        let bookingsRef;
        let pastBookingsRef;

      if (currentUser !== undefined){
            console.log(currentUser)
            bookingsRef = await loadMyBookingRequests(currentUser?.uid);
            console.log(bookingsRef)

            bookingsRef.map(doc => {
                loadedBookingRequestsArray = [...loadedBookingRequestsArray, doc];
                console.log(doc)
            })
            console.log(loadedBookingRequestsArray)

            setBookingRequestsArray([...loadedBookingRequestsArray])

            let currentDate= new Date()
            // currentDate.setMonth(9)
            let pastBookings = []
            let futureBookings = []

            loadedBookingRequestsArray.map(booking => {
                console.log(booking.performanceDate)
                console.log(currentDate)
                let perfDate = new Date(booking.performanceDate)
                console.log(perfDate)
                if (perfDate < currentDate){
                    console.log("booking is in the pasts", booking.performanceDate)
                    pastBookings=[...pastBookings, booking]
                }else{
                    futureBookings = [...futureBookings, booking];
                    console.log("booking is in the future", booking.performanceDate )
                }
            })
            setPastBookingRequestsArray([...pastBookings])
            setBookingRequestsArray([...futureBookings])

            // pastBookingsRef = await loadMyPastBookingRequests(currentUser?.uid);
            //
            // pastBookingsRef.docs.map(doc => {
            //     loadedPastBookingRequestsArray = [...loadedPastBookingRequestsArray, doc.data()];
            //     console.log(doc.data())
            // })
        }
        console.log(currentUser, "setting page loaded true")
        setPageLoaded(true)
    }
    useEffect( () => {
        console.log(currentUser)
        if ((currentUser === null || currentUser === undefined) && pageLoaded ) {
            window.location.href= "./home"

            //setPAgeLoaded
        }
        console.log(currentUser)

        setPresentingElement(page.current);
        console.log(currentUser)
        loadBookings()



    }, [deletingBooking, currentUser]);

    function dismiss() {
        createNewBookingModal.current?.dismiss();
    }

    function onClickLogout(){
        auth.signOut().then(x => {
            window.location.href = '/home'});
    }


    console.log(bookingRequestsArray)
    console.log(pastBookingRequestsArray)

    return (
        <IonPage ref={page}>
            <IonContent>
                <HeaderWithoutImg />

                <IonCard>
                    <div style={{ display: "flex", width:"fit-content"}}>


                        <div style={{textAlign: "center",
                              padding: "1em",
                            fontSize: "1rem",

                            // borderBottom: currentBookingsBool === true ? ("solid #FFD454"):("none"),
                            fontWeight: currentBookingsBool === false ? ("bolder"):("normal"),
                            color: currentBookingsBool === false ? ("rgba(255,255,255,0.93)"):("black"),
                            cursor: "pointer",
                            backgroundColor: currentBookingsBool === false ? ("#490411"):(""),



                        }}
                             onClick={() => setCurrentBookingsBol(false)}
                        >Past Bookings</div>

                        <div style={{textAlign: "center",
                            padding: "1em",
                            fontSize: "1rem",

                            // borderBottom: currentBookingsBool === true ? ("solid #FFD454"):("none"),
                            fontWeight: currentBookingsBool === true ? ("bolder"):("normal"),
                            color: currentBookingsBool === true ? ("rgba(255,255,255,0.93)"):("black"),
                            cursor: "pointer",
                            backgroundColor: currentBookingsBool === true ? ("#490411"):(""),

                        }}
                             onClick={() => setCurrentBookingsBol(true)}
                        > Upcoming Bookings</div>
                    </div>
                    <IonCardContent
                    style={{
                        backgroundColor: currentBookingsBool === false ? ("rgba(73,4,17,0.8)"):("#490411"),

                    }}
                    >

                        {deletingBooking ? (<div>deleting Booking</div>):( <IonList>
                            <IonList>




                            </IonList>
                            {/*<IonItem lines="none">*/}
                            {/*    <IonButton id="open-create-new-booking-modal" >Create New Booking</IonButton>*/}
                            {/*</IonItem>*/}

                            {currentBookingsBool === true ? (
                                <div style={{display: "flex", flexDirection: "column", margin: "1em"}} lines="none">
                                    <div style={{margin: "2em auto", fontSize:"1.2em", textAlign:'center'}}>
                                        {Object.values(bookingRequestsArray).length < 1 ? (
                                                <div>No  Bookings Or Confirming Booking Availability</div>
                                            ):
                                            (

                                                <div>
                                                    {bookingRequestsArray.map((booking,i ) => (

                                                            <BookingsComponent
                                                                pastBooking={false}
                                                                key={i}

                                                                booking={booking}
                                                                performanceTime={booking.performanceTime}
                                                                performanceDate={booking.performanceDate}
                                                                numberOfMariachis={booking.numberOfMariachis}
                                                                performanceAddress={booking.performanceAddress}
                                                                docId={booking.docId}
                                                                clientEmail={booking.clientEmail}
                                                                clientName={booking.clientName}
                                                                clientPhone={booking.clientPhone}
                                                                feeDeposit={booking.feeDeposit}
                                                                feeTotal={booking.feeTotal}
                                                                mariachiPackageId={booking.mariachiPackageId}
                                                                setDeletingBooking={setDeletingBooking}
                                                                deletingBooking={deletingBooking}
                                                                status={booking.status}
                                                                balanceDue={booking.balanceDue}
                                                                clientId={booking.clientId}
                                                                packageName={booking.name}
                                                                grandTotal={booking.grandTotal}
                                                            />



                                                    ))}



                                                </div>

                                            )}
                                    </div>
                                    <div style={{margin: "auto", display:"flex", flexDirection: "column"}}>

                                        <IonButton  color="secondary"

                                                    style={{display:"flex", flexDirection:"column"}}
                                                    href="tel:+14804207629"
                                        >
                                            <div style={{marginRight:"1em"}}>
                                                Quick & Easy
                                                Bookings

                                            </div>

                                            <IonIcon  style={{marginRight: ".5em"}} icon={call} />

                                            <div>(480) 420-7629</div>
                                        </IonButton>


                                    </div>


                                </div>

                            ):(
                                <div style={{display: "flex", flexDirection: "column"}} lines="none">
                                    <div style={{margin: "2em auto", fontSize:"1.2em", textAlign:'center'}}>
                                        {Object.values(pastBookingRequestsArray).length < 1 ? (
                                                <div>No  Bookings Or Confirming Booking Availability</div>
                                            ):
                                            (

                                                <div>
                                                    {pastBookingRequestsArray.map(booking => (
                                                        <>
                                                            <BookingsComponent

                                                                pastBooking={true}
                                                                booking={booking}
                                                                performanceTime={booking.performanceTime}
                                                                performanceDate={booking.performanceDate}
                                                                numberOfMariachis={booking.numberOfMariachis}
                                                                performanceAddress={booking.performanceAddress}
                                                                docId={booking.docId}
                                                                clientEmail={booking.clientEmail}
                                                                clientName={booking.clientName}
                                                                clientPhone={booking.clientPhone}
                                                                feeDeposit={booking.feeDeposit}
                                                                feeTotal={booking.feeTotal}
                                                                mariachiPackageId={booking.mariachiPackageId}
                                                                setDeletingBooking={setDeletingBooking}
                                                                deletingBooking={deletingBooking}
                                                                status={booking.status}
                                                                balanceDue={booking.balanceDue}
                                                                clientId={booking.clientId}
                                                                packageName={booking.name}
                                                                grandTotal={booking.grandTotal}
                                                            />
                                                        </>


                                                    ))}



                                                </div>

                                            )}
                                    </div>
                                    <div style={{margin: "auto", display:"flex", flexDirection: "column"}}>

                                        <IonButton  color="secondary"

                                                    style={{display:"flex", flexDirection:"column"}}
                                                    href="tel:+14804207629"
                                        >
                                            <div style={{marginRight:"1em"}}>
                                                Quick & Easy
                                                Bookings

                                            </div>

                                            <IonIcon  style={{marginRight: ".5em"}} icon={call} />

                                            <div>(480) 420-7629</div>
                                        </IonButton>


                                    </div>


                                </div>

                            )}


                        </IonList>)}



                    </IonCardContent>

                </IonCard>
                {/*<IonModal ref={createNewBookingModal}*/}
                {/*          presentingElement={!presentingElement}*/}
                {/*          trigger="open-create-new-booking-modal">*/}
                {/*    <IonButtons slot="end">*/}
                {/*        <IonButton onClick={() => dismiss()}>Close</IonButton>*/}
                {/*    </IonButtons>*/}
                {/*    <CreateNewBookingForm />*/}

                {/*</IonModal>*/}
            </IonContent>


            <IonButton  color="tertiary" style={{width:"50%", margin:"1em auto", height:"5em"}} onClick={() => onClickLogout()}>
                Logout
            </IonButton>

        </IonPage>


    )
}
export default ClientDashboard;