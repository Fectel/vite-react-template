import React, {useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent, IonCardSubtitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonList,
    IonRow
} from "@ionic/react";
import emailjs from 'emailjs-com';
import {adminDeleteClientBookingRequestDocument, updateBookingStatusToContractReady} from "../../../firebase";
import {useAuth} from "../../../auth-context/auth-context";
import {
    chevronForward,
    chevronUp,
    pricetagsOutline, checkmark, downloadOutline
} from "ionicons/icons";
import ClientBookingComponentPaymentProgress
    from "../../../components/booking-component-payment-progress/client-booking-component-payment-progress";
import axios from "axios";

const BookingsComponent = ({performanceDate,booking,
    status, balanceDue, clientId,packageName,
                               docId,pastBooking,
                               clientName,
                               clientEmail,
                               clientPhone,
                               feeDeposit,grandTotal,
                               feeTotal,
    setDeletingBooking, deletingBooking,
                               performanceAddress,
                               performanceTime,
                               numberOfMariachis}) => {

    // const adminId = process.env.REACT_APP_ADMIN_USER_ID;
    const adminId = "e3T5fDj8RGbJCZ0fnpH6iKwGJIc2";

    const [expandBooking, setExpandBooking] = useState(false)

    console.log(booking)
    // console.log(booking.bookingDate.ut.toDateString())
    // console.log(booking.performanceDate.toDateString())
    const { currentUser } = useAuth();
    // console.log(currentUser, adminId)


    function onDeleteBookingClick(){
        setDeletingBooking(true)
        adminDeleteClientBookingRequestDocument(docId, currentUser.uid).then( x => {

            setDeletingBooking(false)
        })
    }

    function onCLickViewBooking(){
        window.location.href = `/contract-page/${docId}`

    }
    function onApproveButtonClick(){

        emailjs.send('service_cat1uat',
            'template_0258ppo',
            {name: clientName,
                bookingDate: performanceDate,
                url: `http://localhost:8101/contract-page/${docId}`,
                email: clientEmail, subject: "Your booking is ready!"},
            '81Ta3k98ORyxKyQ1E',
            )
            .then((result) => {
                console.log(result.text, clientEmail)
            }, (error) => {
                console.log(error.text)
            }).then(() => {
            updateBookingStatusToContractReady(clientId, docId).then(console.log("Emails sent and contract is ready"))
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


    return (
        <IonCard  style={{width:"100%", margin: "1em auto",
            paddingTop:"1em",
        }}>



            <IonCardContent>




                <IonIcon
                    style={{
                        left:".5em",
                        top:"0",
                        position:"absolute",
                    }}
                    onClick={() => setExpandBooking(!expandBooking)} icon={expandBooking ? (chevronUp):(chevronForward)}></IonIcon>


              {expandBooking ? (
                  <div  >
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
                                  <div style={{
                                      fontSize:".7rem"
                                  }} >{clientName}</div>
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
                                  <div style={{fontSize:".7rem"}} >{clientEmail}</div>
                              </div>
                              <div style={{
                                  fontSize: ".8rem",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width:"80%",
                                  margin: "auto",
                              }}>
                                  <IonLabel>Phone: </IonLabel>
                                  <div>{clientPhone}</div>

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
                                  <div>{performanceDate.toString().substring(0,15)}</div>
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
                                  <div>{performanceTime}</div>

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
                              <div>{packageName}</div>
                          </div>
                          <div>




                          </div>
                          <div style={{fontSize:"1rem"}}>Total:  <span style={{  marginLeft: ".3em",
                              fontWeight: "bolder", }}> ${feeTotal}</span></div>

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

                              {/*<div style={{*/}
                              {/*    fontSize: ".8rem",*/}
                              {/*    display: "flex",*/}
                              {/*    justifyContent: "space-between",*/}
                              {/*    width:"80%",*/}
                              {/*    margin: "auto",*/}
                              {/*}} >*/}
                              {/*    <div>Due Before Performance: </div>*/}

                              {/*    /!*<div>$ {feeTotal * .30}</div>*!/*/}


                              {/*    <div>$ {feeTotal -  Math.round((feeTotal/2)/50) * 50}</div>*/}


                              {/*    /!*<div>{selectedPrice.substring(7,11) }</div>*!/*/}
                              {/*</div>*/}
                              <div style={{
                                  fontSize:".75rem",

                                  width:"100%",

                                  backgroundColor: status === "Ready For Performance!" && "#72f367",
                                  // color: status !== "Contract is Ready" && "white",
                              }}>
                                  <div style={{
                                      backgroundColor: status !== "Ready For Performance!" ? ("rgba(245,44,44,0.69)"):(""),

                                  }}>
                                      <div style={{
                                          // textAlign:"center",
                                          margin:"auto",
                                          display:"flex",
                                          flexDirection:"row",
                                          fontWeight:"bold",
                                          color:"black",
                                          justifyContent:"space-evenly",
                                          // color: status !== "Ready for Performance!" ? ("white"):("back")

                                      }} >
                                          {/*{status === "Ready For Performance!" && (*/}
                                          {/*  <div  style={{*/}
                                          {/*      fontSize:".55rem"*/}
                                          {/*  }}>*/}
                                          {/*      PAID 🙏🏽*/}
                                          {/*  </div>*/}
                                          {/*)}*/}

                                          Due Before Performance:

                                          <span style={{fontWeight: "bold",
                                              // color: "green",
                                              fontSize:".75rem",
                                              marginLeft: ".2em"}}>   ${balanceDue}</span>
                                          {status === "Ready For Performance!" && (
                                              <div style={{
                                                  fontSize:"1rem"
                                              }}>

                                                  <IonIcon icon={checkmark}/>
                                              </div>
                                          )}
                                      </div>





                                  </div>

                              </div>

                              {booking.status === "Ready For Performance!" && (
                                  <IonButton

                                      size="small"
                                      // fill="outline"
                                      color="secondary"
                                      href={booking.remainingBalanceInvoiceUrl}
                                  >
                                      <IonIcon
                                          style={{
                                              marginRight:".5em",
                                              marginBottom:".2em",
                                          }}
                                          icon={downloadOutline}/>

                                      Remaining Balance Invoice
                                      <IonIcon style={{marginLeft: ".5em"}} icon={pricetagsOutline}/>

                                  </IonButton>
                              )}
                              {/*<div style={{*/}
                              {/*    fontSize: ".8rem",*/}
                              {/*    display: "flex",*/}
                              {/*    justifyContent: "space-between",*/}
                              {/*    width:"80%",*/}
                              {/*    margin: "auto",*/}
                              {/*}} >*/}
                              {/*    <div>Due On Contract Signing : </div>*/}

                              {/*    /!*<div>$ {feeTotal * .30}</div>*!/*/}


                              {/*    <div>$ {Math.round((feeTotal/2)/50) * 50}</div>*/}


                              {/*    /!*<div>{selectedPrice.substring(7,11) }</div>*!/*/}
                              {/*</div>*/}
                              <div style={{
                                  fontSize:".75rem",

                                  width:"100%",

                                  backgroundColor: status !== "Contract is Ready" && "#72f367",
                                  // color: status !== "Contract is Ready" && "white",
                              }}>

                                  <div style={{
                                      // textAlign:"center",
                                      margin:"auto",
                                      display:"flex",
                                      flexDirection:"row",
                                      justifyContent:"space-evenly",
                                      fontWeight:"bold",
                                      color:"black",
                                  }} >
                                      {/*{status !== "Conract is Ready" && (*/}
                                      {/*  <div  style={{*/}
                                      {/*      fontSize:".55rem"*/}
                                      {/*  }}>*/}
                                      {/*      PAID 🙏🏽*/}
                                      {/*  </div>*/}
                                      {/*)}*/}

                                      Reservation Deposit:
                                      <span style={{fontWeight: "bold",
                                          // color: "green",
                                          fontSize:".75rem",
                                          marginLeft: ".2em"}}> ${feeDeposit}</span>
                                      {/*{status !== "Conract is Ready" && (*/}
                                      {/*    <div style={{*/}
                                      {/*        fontSize:".55rem"*/}
                                      {/*    }}>*/}
                                      {/*          🙏🏽 Gracias!*/}
                                      {/*    </div>*/}
                                      {/*)}*/}

                                      {status !== "Contract is Ready" && (
                                          <div style={{
                                              fontSize:"1rem"
                                          }}>

                                              <IonIcon icon={checkmark}/>
                                          </div>
                                      )}


                                  </div>


                              </div>
                              <IonButton


                                  size="small"
                                  // fill="outline"
                                  color="secondary"
                                  href={booking.depositInvoiceUrl}
                              >
                                  <IonIcon
                                      style={{
                                          marginRight:".5em",
                                          marginBottom:".2em",
                                      }}
                                      icon={downloadOutline}/>
                                  Deposit Invoice
                                  <IonIcon style={{marginLeft: ".5em"}} icon={pricetagsOutline}/>

                              </IonButton>
                          </div>)
                          }



                      </IonList>

                  </div>
              ):(
                  <IonGrid style={{
                      margin:"auto", width: "100%"}}>



                      <IonRow>


                          <IonCol style={{textAlign: "center"}}>
                              {/*<div style={{*/}
                              {/*    color: booking.status === "Contract is Ready" ? ("green"):("black") ,*/}
                              {/*    fontWeight: booking.status === "Contract is Ready" ? ("bold"):("none") ,*/}
                              {/*    backgroundColor: booking.status === "Contract is Ready" ? ("rgba(245,221,102,0.23)"):("rgba(245,221,102,0.45)") ,*/}
                              {/*    // color: "black",*/}
                              {/*    border: "solid thin",*/}
                              {/*    padding: ".2em 1em",height: "fit-content", width:"fit-content",*/}
                              {/*    borderRadius: "5px", margin: " 1em auto"}}>Status: {status}</div>*/}


                              <div style={{fontWeight: "bold", fontSize:".8rem"}}>
                                  {performanceDate}
                              </div>

                              <div style={{fontWeight: "bold",fontSize:".8rem"}}>
                                  {performanceTime}
                              </div>
                              {/*<div>{clientName}</div>*/}
                              {/*<div>{clientEmail}</div>*/}

                              <div style={{ padding: ".2em", fontSize:".8rem"}}>
                                  {performanceAddress}
                              </div>
                              <div style={{fontWeight: "bold",
                                  fontSize:".75rem",

                              }}>
                                  {packageName}
                              </div>

                              {!pastBooking && (
                                  <div style={{
                                      fontSize: ".9em",
                                  }}>
                                      <ClientBookingComponentPaymentProgress
                                          setExpandBooking={setExpandBooking}
                                          // expandBooking={expandBooking}
                                          remainingBalance={
                                              booking.feeTotal -  Math.round((booking.feeTotal/2)/50) * 50
                                          }
                                          contract={booking}
                                      />
                                  </div>
                              )}






                              {/*{booking.status === "Contract is Ready" && (*/}

                              {/*    <div style={{*/}
                              {/*        fontSize:"1.1rem",*/}
                              {/*        fontFamily: "Libre Baskerville",*/}
                              {/*        padding: ".5em",*/}
                              {/*        fontWeight: "bold",*/}
                              {/*        border:"solid thin",*/}
                              {/*        borderRadius: "2px",*/}
                              {/*        display: "flex",*/}
                              {/*        flexDirection: "column",*/}

                              {/*        backgroundColor: "rgba(245,221,102,0.45)"*/}

                              {/*    }}>We are Available and ready to sign the Contract!*/}
                              {/*        <IonButton color="secondary" onClick={() => onCLickViewBooking()}>*/}
                              {/*            Go To Contract*/}
                              {/*        </IonButton>*/}
                              {/*    </div>*/}

                              {/*)}*/}
                              {/*{booking.status === "Confirming Availability" && (*/}
                              {/*    <div style={{*/}
                              {/*        fontSize:"1.1rem",*/}
                              {/*        fontFamily: "Libre Baskerville",*/}
                              {/*        padding: ".5em",*/}
                              {/*        fontWeight: "bold",*/}
                              {/*        border:"solid thin",*/}
                              {/*        borderRadius: "2px",*/}

                              {/*        backgroundColor: "rgba(245,221,102,0.45)"*/}

                              {/*    }}>We are double checking our calendar to confirm your reservation.*/}
                              {/*    </div>*/}
                              {/*)}*/}


                              {/*<div style={{color:"white", marginTop:".8em"}}>💵 ${booking.remainingBalance} due before performance.</div>*/}


                          </IonCol>


                      </IonRow>


                      {currentUser?.uid === adminId &&(
                          <IonRow >
                              <IonButton onClick={() => onCLickViewBooking()}>
                                  view
                              </IonButton>

                              {status !== "Reserved" && (
                                  <IonButton onClick={() => onApproveButtonClick()}>
                                      approve
                                  </IonButton>
                              )}


                              {status === "Confirming Availability" && (
                                  <IonButton color="danger" onClick={() => onDeleteBookingClick()}>
                                      Delete
                                  </IonButton>
                              )}

                          </IonRow>
                      )}


                  </IonGrid>

              )}
                </IonCardContent>
        </IonCard>

    )
    // return (
    //     <IonCard  style={{width:"30em"}} >
    //         <IonGrid>
    //             <IonRow>
    //
    //                 <IonCol style={{textAlign: "center"}}>
    //                     {/*<div style={{*/}
    //                     {/*    color: booking.status === "Contract is Ready" ? ("green"):("black") ,*/}
    //                     {/*    fontWeight: booking.status === "Contract is Ready" ? ("bold"):("none") ,*/}
    //                     {/*    backgroundColor: booking.status === "Contract is Ready" ? ("rgba(245,221,102,0.23)"):("rgba(245,221,102,0.45)") ,*/}
    //                     {/*    // color: "black",*/}
    //                     {/*    border: "solid thin",*/}
    //                     {/*    padding: ".2em 1em",height: "fit-content", width:"fit-content",*/}
    //                     {/*    borderRadius: "5px", margin: " 1em auto"}}>Status: {status}</div>*/}
    //
    //
    //                     <div style={{fontWeight: "bold"}}>
    //                         {performanceDate}
    //                     </div>
    //
    //                     <div style={{fontWeight: "bold"}}>
    //                         {performanceTime}
    //                     </div>
    //                     <div>{clientName}</div>
    //                     <div>{clientEmail}</div>
    //
    //                     <div style={{ padding: ".2em"}}>
    //                         {performanceAddress}
    //                     </div>
    //                     <div style={{fontWeight: "bold"}}>
    //                         {numberOfMariachis}
    //                     </div>
    //                     <div>
    //                         <div >Reservation Deposit:
    //                             <span style={{fontWeight: "bold",
    //                                 // color: "green",
    //                                  marginLeft: ".3em"}}> ${feeDeposit}</span></div>
    //                         <div >Due Before Performance:
    //                             <span style={{ marginLeft: ".3em", fontWeight: "bold"}}> ${balanceDue}</span></div>
    //
    //                     </div>
    //                     <div style={{fontSize:"1.1rem"}}>Total:  <span style={{  marginLeft: ".3em", fontWeight: "bolder", }}> ${feeTotal}</span></div>
    //
    //                     {status === "Reserved" && (
    //                             <div>
    //
    //                                 <IonButton style={{fontSize: ".9rem", marginTop: "1em"}} color="secondary">
    //                                     <IonIcon style={{marginRight: ".5em"}} icon={card}/>
    //
    //                                     <div>
    //                                         Pay Remaining Balance: ${balanceDue}
    //                                     </div>
    //                                     </IonButton>
    //                             </div>
    //
    //                         )}
    //
    //                     {booking.status === "Contract is Ready" && (
    //
    //                         <div style={{
    //                             fontSize:"1.1rem",
    //                             fontFamily: "Libre Baskerville",
    //                             padding: ".5em",
    //                             fontWeight: "bold",
    //                             border:"solid thin",
    //                             borderRadius: "2px",
    //                             display: "flex",
    //                             flexDirection: "column",
    //
    //                             backgroundColor: "rgba(245,221,102,0.45)"
    //
    //                         }}>We are Available and ready to sign the Contract!
    //                             <IonButton color="secondary" onClick={() => onCLickViewBooking()}>
    //                                 Go To Contract
    //                             </IonButton>
    //                         </div>
    //
    //                     )}
    //                     {booking.status === "Confirming Availability" && (
    //                         <div style={{
    //                             fontSize:"1.1rem",
    //                             fontFamily: "Libre Baskerville",
    //                             padding: ".5em",
    //                             fontWeight: "bold",
    //                             border:"solid thin",
    //                             borderRadius: "2px",
    //
    //                             backgroundColor: "rgba(245,221,102,0.45)"
    //
    //                         }}>We are double checking our calendar to confirm your reservation.
    //                         </div>
    //                     )}
    //
    //
    //                 </IonCol>
    //
    //
    //             </IonRow>
    //
    //
    //             {currentUser?.uid === adminId &&(
    //                 <IonRow >
    //                     <IonButton onClick={() => onCLickViewBooking()}>
    //                         view
    //                     </IonButton>
    //
    //                     {status !== "Reserved" && (
    //                         <IonButton onClick={() => onApproveButtonClick()}>
    //                             approve
    //                         </IonButton>
    //                     )}
    //
    //
    //                     {status === "Confirming Availability" && (
    //                         <IonButton color="danger" onClick={() => onDeleteBookingClick()}>
    //                             Delete
    //                         </IonButton>
    //                     )}
    //
    //                 </IonRow>
    //             )}
    //
    //
    //         </IonGrid>
    //
    //
    //
    //     </IonCard>
    // )
}
export default BookingsComponent;