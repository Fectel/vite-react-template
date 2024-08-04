import React, {useEffect, useRef, useState} from "react"
import {useAuth} from "../../auth-context/auth-context.jsx"
import {
    auth,
    loadAllBookingRequests,
} from "../../firebase";
import {IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonList, IonModal, IonPage} from "@ionic/react";
import BookingsComponent from "./bookings-component";
import Schedule from "./schedule/schedule";
import FirebaseUiComponent from "../../components/firebase-ui-component/firebase-ui-component.jsx";
import {callOutline} from "ionicons/icons";

export default function AdminPage(){

    const [bookingsState, setBookingsState ] = useState("current")
    const [deletingBooking, setDeletingBooking ] = useState(false)
    const [bookingRequestsArray, setBookingRequestsArray ] =useState([]);
    const { currentUser } = useAuth();
    let loadedBookingRequestsArray = [];
    const page = useRef(null);
    const [refresh, setRefresh ] = useState(false)
    const [showSignInWithPhone, setShowSignInWithPhone ] = useState(false)
    const modal = useRef(null);
    const [ isOpen, setIsOpen ] = useState(true)

    console.log(currentUser)

    async function loadBookingRequests() {
        const bookingsRef = await loadAllBookingRequests();
        bookingsRef.docs.map(doc => {
            loadedBookingRequestsArray = [...loadedBookingRequestsArray, doc.data()];
            // console.log(doc.data())
        })
        setBookingRequestsArray({...loadedBookingRequestsArray})
        console.log(loadedBookingRequestsArray)


    }
    const adminId = "qnl3OYGb2takdqjsMTVNA6AuVKB2";


    useEffect( () => {
       loadBookingRequests()

        loadCurrentUser()
        if (refresh === true){
            console.log("Refresh ", refresh)
            setRefresh(false)
        }

    }, [currentUser, refresh]);

    console.log(bookingRequestsArray)

    function onClickLogout(){
        auth.signOut()
    }

    async function loadCurrentUser(){

        if (currentUser !== null && currentUser !== undefined) {
            console.log(currentUser, "0")
            if (currentUser.uid !== adminId){
                console.log(currentUser.uid, adminId, "1")
                window.location.href = "/home"
            }else if (currentUser.uid === adminId){
                console.log(currentUser.uid, adminId, "2")
                setIsOpen(false)
                setShowSignInWithPhone(false)

            }

        }else if(currentUser === null || currentUser === undefined){
            console.log(currentUser)
            setIsOpen(true)

        }

    }
    function renderAdminPage(){
        return (
            <IonPage ref={page}>


                <IonContent>

                    {currentUser === undefined || currentUser === null && (
                        <IonModal
                            style={{
                                // width:"70%",
                                margin:"8em auto 0",
                            }}
                            ref={modal}
                            isOpen={isOpen}
                            canDismiss={false}
                        >
                            {showSignInWithPhone === true ? (
                                <FirebaseUiComponent />
                            ):(
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
                            )}


                        </IonModal>
                    )}

                    {!isOpen && (
                        <IonCard>
                            <div style={{ display: "flex", width:"fit-content"}}>
                                <div style={{textAlign: "center",
                                    fontSize: "1rem",
                                    // margin: "1em",
                                    width: "100%",
                                    padding: "1em",
                                    // borderBottom: currentBookingsBool === false ? ("solid #FFD454"):("none"),
                                    fontWeight: bookingsState === "past" ? ("bolder"):("normal"),
                                    color:  bookingsState === "past" ? ("rgba(255,255,255,0.93)"):("black"),
                                    cursor: "pointer",
                                    backgroundColor:  bookingsState === "past" ? ("rgba(73,4,17,0.8)"):(""),


                                }}
                                     onClick={() => setBookingsState("past")}
                                >Past Bookings</div>

                                <div style={{textAlign: "center",
                                    padding: "1em",
                                    fontSize: "1rem",

                                    fontWeight:  bookingsState === "current" ? ("bolder"):("normal"),
                                    color:  bookingsState === "current" ? ("rgba(255,255,255,0.93)"):("black"),
                                    cursor: "pointer",
                                    backgroundColor:  bookingsState === "current" ? ("#490411"):(""),


                                }}
                                     onClick={() => setBookingsState("current")}
                                >Current Bookings</div>

                                <div style={{textAlign: "center",
                                    padding: "1em",
                                    fontSize: "1rem",

                                    // borderBottom: currentBookingsBool === true ? ("solid #FFD454"):("none"),
                                    fontWeight:  bookingsState === "14 Days" ? ("bolder"):("normal"),
                                    color:  bookingsState === "14 Days" ? ("rgba(255,255,255,0.93)"):("black"),
                                    cursor: "pointer",
                                    backgroundColor:  bookingsState === "14 Days" ? ("#490411"):(""),


                                }}
                                     onClick={() => setBookingsState("14 Days")}
                                >14 Days</div>

                            </div>
                            <IonCardContent
                                style={{
                                    backgroundColor:  "#490411",

                                    padding:".3em",
                                }}
                            >
                                {bookingsState === "14 Days" && (
                                    <Schedule
                                        bookingsArray={bookingRequestsArray}
                                    />
                                )}


                                {deletingBooking ? (<div>deleting Booking</div>):( <IonList>
                                    {bookingsState === "current" && (
                                        <IonList>

                                            <div style={{backgroundColor: "rgba(0,0,0,0.67)"}}>
                                                {Object.values(bookingRequestsArray).map(booking => (
                                                    <>
                                                        <BookingsComponent
                                                            booking={booking}
                                                            setRefresh={setRefresh}
                                                        />
                                                    </>


                                                ))}

                                            </div>


                                        </IonList>

                                    )}
                                    {/*<IonItem lines="none">*/}
                                    {/*    <IonButton id="open-create-new-booking-modal" >Create New Booking</IonButton>*/}
                                    {/*</IonItem>*/}
                                    <div style={{display: "flex", flexDirection: "column"}} lines="none">
                                        <div style={{margin: "2em auto", fontSize:"1.5em"}}>
                                            {Object.values(bookingRequestsArray).length < 1 && (
                                                <div>No Current Bookings</div>
                                            )}
                                        </div>
                                        <div style={{margin: "auto"}}>
                                            <IonButton  color="secondary" href="/create-booking-page" >Create New Booking</IonButton>

                                        </div>

                                    </div>
                                </IonList>)}



                            </IonCardContent>

                        </IonCard>

                    )}


                </IonContent>
                <IonButton
                    onClick={() => onClickLogout()}
                >
                    Logout
                </IonButton>

            </IonPage>


        )
    }


    return (
        <div>
            {renderAdminPage()}
        </div>
    )
}