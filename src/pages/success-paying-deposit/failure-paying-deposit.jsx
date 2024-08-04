import React, {useEffect, useState} from "react"
import HeaderWithoutImg from "../../components/header/header-without-img";
import {
    IonButton,
    IonContent,
     IonModal,
    IonPage
} from "@ionic/react";

import { w3cwebsocket as W3CWebSocket} from "websocket";


import {deleteContractImgFromFirestore} from "../../firebase";

import { useParams } from 'react-router-dom';
const FailurePayingDeposit = () => {
    console.log("failure page")
    const client = new W3CWebSocket('ws://127.0.0.1:8000');

    const [url , setUrl ] = useState("")
    const [amount , setAmount ] = useState(0)

    const params = useParams();


    console.log("failure pag paramse", params)

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
            console.log(params)

            // await updateBookingStatusToReserved(params.clientId,params.contractId, msgArr[0], msgArr[4]).then(r =>
            // {
            //     //also add the link to download the pdf
            //     // and include tha link in the client dashboard bookings component
            //     window.location.href = '/client-dashboard'
            // })
            await deleteContractImgFromFirestore(params.clientId,params.contractId,).then(() => {
                    window.location.href = '/client-dashboard'

            })

        }
        console.log("checkClientWSConnection", client)

    }

    useEffect(() => {
        checkClientWSConnection()

        console.log("failure page")


        console.log(params)


    },[])


    console.log(url)
    // console.log(ms)
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

                Failure Deleting Contract Img


            </IonContent>

        </IonPage>
    )
}

export default FailurePayingDeposit;

function PdfViewer({amount, url}){

    function onClose(){
        window.location.href = '/client-dashboard'
    }
    console.log(url)
    return(
        <div>
            <IonButton
                href={url}
                // src={url.url} >
            >

                Download Invoice of ${amount}
            </IonButton>
            <IonButton onClick={() => onClose()
            } color="danger">
                Close
            </IonButton>
            {/*<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">*/}
            {/*    <Viewer fileUrl={url.url} />;*/}
            {/*</Worker>*/}
        </div>
    )
}