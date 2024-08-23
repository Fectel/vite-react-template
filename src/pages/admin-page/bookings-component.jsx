import React, { useState} from "react"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonIcon,
    IonLabel,
    IonList,
} from "@ionic/react";
import {card, chevronForward, chevronUp, remove,add, shareOutline} from "ionicons/icons";
import emailjs from "emailjs-com";
import {
    adminDeleteClientBookingRequestDocument,
    updateBookingStatusToContractReady
} from "../../firebase";
import {useAuth} from  "../../auth-context/auth-context.jsx"
import axios from "axios";

export default function BookingsComponent({booking, setRefresh}){

    const [showMariachiSearchWindow, setShowMariachiSearchWindow ] = useState(false)
    const { currentUser } = useAuth();


    const [expandBooking, setExpandBooking ] = useState(false)


    const [minimizeBooking , setMinimizeBooking ] = useState(true)

    function onDeleteBookingClick(){

        adminDeleteClientBookingRequestDocument(booking.docId, currentUser.uid).then( x => {
            // setDeletingBooking(false)
        })
    }
    function onMariachiButtonClick(){
        if (booking.confirmedMariachis){
            console.log("OFF2 Mariachi button click")

        }
        console.log("ON Mariachi button click")
        setShowMariachiSearchWindow(true)
    }

    function onCLickViewBooking(){
        window.location.href = `/contract-page/${booking.docId}`

    }
    function onApproveButtonClick(){

        console.log(booking)

         emailjs.send('service_cat1uat',
            'template_0258ppo',
            {name: booking.clientName,
                bookingDate: booking.performanceDate,
                url: `http://localhost:3000/contract-page/${booking.docId}`,
                email: booking.clientEmail, subject: "Your booking is ready!"},
            '81Ta3k98ORyxKyQ1E',
        )
            .then((result) => {
                console.log(result.text, result,booking.clientEmail)
            }, (error) => {
                console.log(error.text)
            }).then(() => {
            updateBookingStatusToContractReady(booking.clientId, booking.docId).then(() => {
                setRefresh(true)
                console.log("Emails sent and contract is ready")
            })
        })

    }

    function onPayRemainingBalanceClick(){

        axios({
            url: 'pay-mariachi-remaining-balance',
            // url: 'create-pay-deposit-session',
            baseURL: "https://triumphant-beauty-production.up.railway.app",

            method: 'post',
            params:
                {
                    name: booking.name + " (Remaining Balance)",
                    price: booking.balanceDue,
                    contractId: booking.docId,
                    clientId: booking.clientId,
                }

        }).then( response => {


            console.log(response.data.url)
            window.location.href = response.data.url;


        }).catch(error => {
            console.log("submit contract error: ", error)
        });
    }

    // function renderMariachiSearchWindow(){
    //     return (
    //
    //     )
    // }
    console.log(booking.status)
    return (
        <IonCard style={{ margin:".2em auto"}}>



            {expandBooking ? (
                <div style={{padding: "5em"}}>
                    <IonIcon
                        style={{
                            // margin:"1em",
                            cursor: "pointer",
                            left:"0em", position:"absolute",
                            // backgroundColor:"red",
                            zIndex:'10',
                        }}
                        onClick={() => setExpandBooking(!expandBooking)} icon={expandBooking ? (chevronUp):(chevronForward)}></IonIcon>


                    <IonList >
                        <div>

                            <IonCardSubtitle style={{textAlign: "center",
                                // backgroundColor:"red",
                                margin:"auto",
                                display: "flex",flexFlow: "row",
                                width:"fit-content", marginBottom: "1.2em"
                            }}>Contact Info
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
                        <div style={{ paddingBottom: "1em",}}>

                            <div style={{
                                fontSize: ".8rem",
                                display: "flex",
                                justifyContent: "space-between",
                                width:"80%",
                                margin: "auto",
                            }} >
                                <div >Name: </div>
                                <div >{booking.clientName}</div>
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
                                <div >{booking.clientEmail}</div>
                            </div>
                            <div style={{
                                fontSize: ".8rem",
                                display: "flex",
                                justifyContent: "space-between",
                                width:"80%",
                                margin: "auto",
                            }}>
                                <IonLabel>Phone: </IonLabel>
                                <div>{booking.clientPhone}</div>

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
                                <div>{booking.performanceDate.toString().substring(0,15)}</div>
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
                                <div>{booking.performanceTime}</div>

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
                                <div style={{fontSize: ".6rem", width: "70%", textAlign: "center"}}>{booking.performanceAddress}</div>
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
                            <div>{booking.name}</div>
                        </div>
                        {booking.grandTotal ? (
                            <div>
                                <div style={{
                                    fontSize: ".8rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width:"80%",
                                    margin: "auto",
                                }} >
                                    <div>Total ( Includes Travel Fee ): </div>
                                    <div>${booking.feeTotal} + ${(booking.grandTotal-booking.feeTotal)}</div>
                                    <div>$ {booking.grandTotal}</div>
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


                                    <div>$ {booking.grandTotal -  Math.round((booking.grandTotal/2)/50) * 50}</div>


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


                                    <div>$ {Math.round((booking.grandTotal/2)/50) * 50}</div>


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
                                <div>${booking.feeTotal}</div>
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


                                <div>$ {booking.feeTotal -  Math.round((booking.feeTotal/2)/50) * 50}</div>


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


                                <div>$ {Math.round((booking.feeTotal/2)/50) * 50}</div>


                                {/*<div>{selectedPrice.substring(7,11) }</div>*/}
                            </div>                                </div>)
                        }



                    </IonList>

                </div>


            ):(
                <div style={{padding: "5em"}} >

                                <IonCard style={{
                                    // display: "flex",
                                    justifyContent: "space-between",
                                    width:"100%",
                                    margin: 0,
                                }}>
                                    <IonIcon
                                        style={{
                                            // margin:"1em",
                                            cursor: "pointer",
                                            left:"0em", position:"absolute",
                                            // backgroundColor:"red",
                                            zIndex:'10',
                                        }}
                                        onClick={() => setExpandBooking(!expandBooking)} icon={expandBooking ? (chevronUp):(chevronForward)}></IonIcon>

                                    <IonIcon
                                        style={{right:"0em", position:"absolute",
                                            cursor: "pointer",
                                            // backgroundColor:"red",
                                            zIndex:'10',
                                        }}
                                        onClick={() => setMinimizeBooking(!minimizeBooking)}
                                        icon={minimizeBooking ? (remove):(add)}></IonIcon>
                                    <IonCardContent
                                    style={{
                                        fontSize:".7rem",
                                        padding: "0.3em",
                                    }}>
                                        <div style={{display:"flex", margin:"auto",width:"fit-content",}}>
                                            <div style={{margin:"0 .25em"}}>
                                                {booking.performanceDate}
                                            </div>
                                            <div style={{margin:"0 .25em"}}>
                                                {booking.performanceTime}
                                            </div>
                                            <div style={{margin:"0 .25em"}}>
                                                {booking.numberOfMariachis}
                                            </div>
                                        </div>

                                        <div style={{display:"flex", width:"fit-content", margin:"auto"}}>

                                            <div style={{margin:"0 .25em"}}>
                                                {booking.performanceAddress}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{
                                                margin:"auto",
                                                // color: booking.status === "Contract is Ready" ? ("green"):("black") ,
                                                // fontWeight: booking.status === "Contract is Ready" ? ("bold"):("none") ,
                                                backgroundColor: booking.status === "Contract is Ready" ? ("rgba(245,221,102,0.23)"):("rgba(245,221,102,0.45)") ,
                                                // color: "black",
                                                // border: "solid thin",
                                                padding: ".2em 1em",height: "fit-content", width:"fit-content",
                                                // borderRadius: "5px",
                                            }}>Status: {booking.status}</div>

                                            {booking.status === "Confirming Availability" && (
                                                <div style={{

                                                    margin:"auto",
                                                    width:"fit-content",

                                                    // backgroundColor:"rgba(245,221,102,0.23)",
                                                }}>
                                                    <IonButton style={{
                                                        // width: "5em",
                                                        height:"3em",
                                                        padding:"0",
                                                        fontSize:".6rem",
                                                    }} onClick={() => onApproveButtonClick()}>
                                                        approve
                                                    </IonButton>
                                                    <IonButton style={{
                                                        // width: "5em",
                                                        height:"3em",
                                                        padding:"0",
                                                        fontSize:".6rem",
                                                    }}color="danger" onClick={() => onDeleteBookingClick()}>
                                                        Delete
                                                    </IonButton>

                                                </div>

                                            )}
                                            {booking.status === "Contract is Ready" &&(

                                                <div style={{
                                                    margin:"auto",
                                                    width:"fit-content"
                                                }}>
                                                    <IonButton style={{fontSize: ".6rem",
                                                    }} color="primary"s
                                                               onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/contract-page/${booking.docId}`)}}

                                                    >
                                                        Copy Link To Contract
                                                        <IonIcon style={{marginLeft: ".5em"}} icon={shareOutline}/>

                                                    </IonButton>

                                                </div>

                                            )}
                                            {booking.status === "Reserved" &&(

                                                <div  style={{
                                                    margin:"auto",
                                                    width:"fit-content"
                                                }}>
                                                    <IonButton style={{fontSize: ".6rem", }} color="primary"s
                                                               onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/contract-page/${booking.docId}`)}}

                                                    >
                                                        Copy Link To Pay Remaining Balance
                                                        <IonIcon style={{marginLeft: ".5em"}} icon={shareOutline}/>

                                                    </IonButton>
                                                </div>


                                            )}

                                        </div>
                                    </IonCardContent>



                                </IonCard>

                                {minimizeBooking ? (<div></div>):(
                                    <div>



                                        <IonCard style={{
                                            width:"100%",
                                            margin: 0,
                                        }}>
                                            <IonCardContent style={{fontSize: ".6rem"}} >
                                                <div >Total:  <span style={{  marginLeft: ".3em"}}> ${booking.feeTotal}</span></div>

                                                <div >Reservation Deposit:
                                                    <span style={{ marginLeft: ".3em"}}> ${booking.feeDeposit}</span></div>
                                                <div >Due Before Performance:
                                                    <span style={{ marginLeft: ".3em"}}> ${booking.balanceDue}</span></div>

                                            </IonCardContent>
                                        </IonCard>


                                        <IonCard style={{
                                            width:"100%",
                                            margin: 0,
                                        }}>
                                            <IonCardContent style={{fontSize: ".6rem"}}>
                                                <div>{booking.clientName}</div>
                                                <div>{booking.clientEmail}</div>
                                                <div>{booking.clientPhone}</div>
                                            </IonCardContent>
                                        </IonCard>





                                        {showMariachiSearchWindow === true ? (
                                            // <MariachiSearchWindow
                                            //     setShowMariachiSearchWindow={setShowMariachiSearchWindow}
                                            // />
                                            <div>dicontinued for now in //</div>
                                        ):(
                                            <div>
                                                <div>{booking.confirmedMariachis}</div>
                                                <IonButton onClick={() => onMariachiButtonClick()} color="warning">
                                                    <div>{booking.numberOfMariachis}</div>
                                                </IonButton>
                                                {/*<div>Mariachis Confirmed 3/5</div>*/}



                                                <IonButton onClick={() => onCLickViewBooking()}>
                                                    view
                                                </IonButton>





                                                <IonButton style={{fontSize: ".9rem", }} color="secondary"
                                                           onClick={() => onPayRemainingBalanceClick()}
                                                >
                                                    <IonIcon style={{marginRight: ".5em"}} icon={card}/>

                                                    <div>
                                                        Pay Remaining Balance: ${booking.balanceDue}
                                                    </div>

                                                </IonButton>
                                                <IonButton color="secondary"><IonIcon icon={shareOutline} /></IonButton>

                                            </div>

                                        )}

                                    </div>

                                )}
                </div>
            )}




        </IonCard>
    )
}