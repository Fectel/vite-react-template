import React from "react"
import {IonButton, IonIcon} from "@ionic/react";
import {addOutline, cardOutline, newspaperOutline} from "ionicons/icons";
import axios from "axios";

export default function ClientBookingComponentPaymentProgress({remainingBalance, contract, setExpandBooking}){

    console.log(contract.status)

    function onPayRemainingBalanceClick(){

        axios({
            url: 'pay-mariachi-remaining-balance',
            // url: 'create-pay-deposit-session',
            baseURL: "https://triumphant-beauty-production.up.railway.app",

            method: 'post',
            params:
                {
                    name: contract.name + " (Remaining Balance)",
                    price: contract.balanceDue,
                    contractId: contract.docId,
                    clientId: contract.clientId,
                }

        }).then( response => {


            console.log(response.data.url)
            window.location.href = response.data.url;


        }).catch(error => {
            console.log("submit contract error: ", error)
        });
    }

    function onCLickViewBooking(){
        window.location.href = `/contract-page/${contract.docId}`

    }
    return (
        <div style={{display: "flex",
        flexDirection: "column",
            backgroundColor: "white"

        }}>
            {contract.status === "Contract is Ready" && (
                <div style={{display: "flex",
                    flexDirection: "row",
                    // backgroundColor: "blue",
                    border: "solid thin",
                    padding: ".4em",
                    backgroundColor: "#faf5b0"
                }}>
                    <input disabled={true} style={{marginRight: ".5em"}}type={"checkbox"}></input>
                    <div> 📑 Contract signed and reservation fee payed!</div>
                    <IonButton

                        onClick={() => onCLickViewBooking()}
                        fill="outline"  style={{fontSize: ".9rem", marginTop: "1em"}} color="secondary">
                        <IonIcon style={{marginRight: ".5em"}} icon={newspaperOutline}/>

                        <div>
                            View Contract
                        </div>
                    </IonButton>

                </div>
            )}
            {contract.status === "Reserved" && (
                <div>
                    <div style={{display: "flex",
                        flexDirection: "row",
                        // backgroundColor: "blue",
                        border: "solid thin",
                        padding: ".4em",
                        backgroundColor: "white"
                    }}>
                        <div>✅</div>
                        <div> 📑 Contract signed and reservation fee payed!</div>
                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                            <div>

                                <IonButton

                                    onClick={() => onCLickViewBooking()}
                                    fill="outline"  style={{fontSize: ".9rem", marginTop: "1em"}} color="secondary">
                                    <IonIcon style={{marginRight: ".5em"}} icon={newspaperOutline}/>

                                    <div>
                                        View Contract
                                    </div>
                                </IonButton>
                            </div>

                        </div>
                    </div>

                    <div  style={{display: "flex",
                        flexDirection: "row",
                        // backgroundColor: "blue",
                        border: "solid thin",
                        padding: ".4em",
                        backgroundColor: "rgba(245,44,44,0.69)"

                    }}>
                        <input  disabled={true} style={{marginRight: ".5em"}}type={"checkbox"}></input>
                        <div style={{color:"white", marginTop:".8em"}}>💵 Remaining balance ${remainingBalance} due before performance.</div>
                        <IonButton
                            onClick={() => onPayRemainingBalanceClick()}
                            // fill="outline"
                            expand="block" style={{fontSize: ".9rem", marginTop: "1em auto", marginLeft:"1em"}}
                            color="secondary">
                            <IonIcon style={{marginRight: ".5em"}} icon={cardOutline}/>

                            <div>
                                ${remainingBalance}
                            </div>
                        </IonButton>
                        {/*    <div>*/}
                        {/*        <IonButton*/}
                        {/*            onClick={() => onPayRemainingBalanceClick()}*/}
                        {/*            // fill="outline"*/}
                        {/*            expand="block"*/}
                        {/*            style={{fontSize: ".8rem", marginTop: "1em auto", marginLeft:"0em"}}*/}
                        {/*            color="secondary">*/}
                        {/*            <IonIcon style={{marginRight: ".5em"}} icon={cardOutline}/>*/}

                        {/*            <div>*/}
                        {/*                Pay Remaining Balance<br/> ${remainingBalance}*/}
                        {/*            </div>*/}
                        {/*        </IonButton>*/}

                        {/*    </div>*/}

                    </div>
                </div>
            )}

            {contract.status === "Ready For Performance!" && (
                <div>
                    <div style={{display: "flex",
                        flexDirection: "row",
                        // backgroundColor: "blue",
                        border: "solid thin",
                        padding: ".4em",
                        // backgroundColor: "#faf5b0"
                    }}>
                        <div>✅</div>
                        <div> 📑 Contract signed and reservation fee payed!</div>
                        <IonButton

                            onClick={() => onCLickViewBooking()}
                            fill="outline"  style={{fontSize: ".9rem", marginTop: "1em"}} color="secondary">
                            <IonIcon style={{marginRight: ".5em"}} icon={newspaperOutline}/>

                            <div>
                                View Contract
                            </div>
                        </IonButton>
                    </div>


                    <div style={{display: "flex",
                        flexDirection: "row",
                        // backgroundColor: "blue",
                        border: "solid thin",
                        fontWeight: "bolder",
                        padding: ".4em",
                        // backgroundColor: "rgba(78,245,112,0.7)"
                    }}>
                        <div>✅</div>
                        <div>💵 Full Payment Complete </div>
                        <div>
                            <IonIcon style={{fontSize:"1.5rem", marginTop:"0em", fontWeight:"bold",
                            cursor: "pointer",
                            }} icon={addOutline}
                            onClick={() => setExpandBooking(true)}
                            />
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}