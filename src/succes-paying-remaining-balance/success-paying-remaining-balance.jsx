import React, {useEffect, useState} from "react"
import HeaderWithoutImg from "../components/header/header-without-img.jsx";
import {
    IonButton,

    IonContent, IonModal,
    IonPage
} from "@ionic/react";
import { w3cwebsocket as W3CWebSocket} from "websocket";
import {updateBookingStatusToBookingPayed,} from "../firebase.js";
import { useParams } from 'react-router-dom';

const SuccessPayingRemainingBalance = () => {
    const client = new W3CWebSocket('ws://127.0.0.1:8000');
    const [url , setUrl ] = useState("")
    const [amount , setAmount ] = useState(0)

    const params = useParams();

    console.log("Succds page")
    function checkClientWSConnection(){

        console.log("checkClientWSConnection")
        client.onopen = () => {
            console.log('Websocket CLiecnt Connected')
        }

        client.onmessage = async (message) => {
            console.log("REceived a message@const", message.data)
            // const dataFromServer = JSON.parse(message.data);
            // console.log('got reply! ', dataFromServer)
            // messagesArr.push(message.data)
            console.log(message.data)
            const msgArr = message.data.split("@")
            console.log(msgArr)
            setUrl(msgArr[0])
            setAmount(msgArr[1]/100)

            updateBookingStatusToBookingPayed(params.clientId,params.contractId, msgArr[0]).then(r =>
            {
                //also add the link to download the pdf
                // and include tha link in the client dashboard bookings component
                window.location.href = '/client-dashboard'
                //     window.location.href = '/admin-dashboard'

            })
            // await saveNewMembership(msgArr[1], msgArr[0], msgArr[2], msgArr[3])

            // await saveNewMembershipSubscriptionTransaction(msgArr[1], msgArr[4],msgArr[5]).then((res) => {
            //    console.log(res)
            //     if (res === true){
            //         navigate("/sign-in-dashboard-page")
            //
            //     }else{
            //         window.prompt("Error Saving Transaction")
            //     }
            // })
        }
        console.log("checkClientWSConnection", client)

    }


    useEffect(() => {

        checkClientWSConnection()

        // updateBookingStatusToBookingPayed(params.clientId,params.contractId).then(r =>
        // {
        //     window.location.href = '/admin-dashboard'
        // })
        console.log(params)


    },[])


    return (

        <IonPage>
            <HeaderWithoutImg />
            <IonContent>

                {url !== "" && (
                    <IonModal style={{


                        marginTop:"8em",
                    }}
                              isOpen={true}
                              canDismiss={true}
                    >

                        <PdfViewer url={url}
                                   amount={amount}
                        />
                    </IonModal>
                )}

                SUCCESS!


            </IonContent>

        </IonPage>
    )
}

export default SuccessPayingRemainingBalance;

function PdfViewer({amount, url}){

    console.log(url)
    return(
        <div>
            <IonButton
                href={url}
                // src={url.url} >
            >

                Download Invoice of ${amount}
            </IonButton>
            <IonButton onClick={() =>
                window.location.href = '/client-dashboard'} color="danger">
                Close
            </IonButton>
            {/*<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">*/}
            {/*    <Viewer fileUrl={url.url} />;*/}
            {/*</Worker>*/}
        </div>
    )
}