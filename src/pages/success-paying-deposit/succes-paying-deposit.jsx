import React, {useEffect, useState} from "react"
import HeaderWithoutImg from "../../components/header/header-without-img";
import {
    IonButton,

    IonContent,
     IonModal,
    IonPage
} from "@ionic/react";
import { w3cwebsocket as W3CWebSocket} from "websocket";
import { updateBookingStatusToReserved} from "../../firebase";
import io from "socket.io-client"
import { useParams } from 'react-router-dom';


const SuccessPayingDeposit = () => {
    // const socket = io.connect('https://badassmariachi.com/'
    const socket = io.connect('https://mariachihero.com/:2096'
        , {transports: ['websocket'],}, 
                             )

    const [url , setUrl ] = useState("")
    const [amount , setAmount ] = useState(0)

    const params = useParams();


    console.log("Success page")

    

    function checkClientWSConnection(){

        socket.on("connect", () => {
            console.log(connected)
        })
        socket.on("connect_error", (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});
        // console.log("checkClientWSConnection")
        // client.onopen = () => {
        //     console.log('Websocket CLiecnt Connected')
        // }

        // client.onmessage = async (message) => {
        //     console.log("REceived a message@const", message.data)
        //     // const dataFromServer = JSON.parse(message.data);
        //     // console.log('got reply! ', dataFromServer)
        //     // messagesArr.push(message.data)
        //     console.log(message.data)
        //     const msgArr = message.data.split("@")
        //     console.log(msgArr)
        //     setUrl(msgArr[0])
        //     setAmount(msgArr[1]/100)
        //     console.log(params)

        //     await updateBookingStatusToReserved(params.clientId,params.contractId, msgArr[0], msgArr[4]).then(r =>
        //     {
        //         //also add the link to download the pdf
        //         // and include tha link in the client dashboard bookings component
        //         window.location.href = '/client-dashboard'
        //     })
        //     // await saveNewMembership(msgArr[1], msgArr[0], msgArr[2], msgArr[3])

        //     // await saveNewMembershipSubscriptionTransaction(msgArr[1], msgArr[4],msgArr[5]).then((res) => {
        //     //    console.log(res)
        //     //     if (res === true){
        //     //         navigate("/sign-in-dashboard-page")
        //     //
        //     //     }else{
        //     //         window.prompt("Error Saving Transaction")
        //     //     }
        //     // })
        // }
        // console.log("checkClientWSConnection", client)

    }

    useEffect(() => {
        checkClientWSConnection()
        console.log("PArams",params)

    },[])


    console.log(url)
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

export default SuccessPayingDeposit;

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
