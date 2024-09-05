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
    const socket = io.connect('https://mariachihero.com'
        , {
            transports: ['websocket'],
        }, 
            
                             )

    const [url , setUrl ] = useState("")
    const [amount , setAmount ] = useState(0)

    const [loading, setLoading ] = useState(false)
    const params = useParams();

    let depositInvoiceUrl;
    let contractImgUrl;
    let contractSignatureUrl;

    console.log("Success page")

   
    function checkClientWSConnection(){

      
        socket.on("message", (message) => {
            console.log(message)
        } )
        socket.on("invoice_pdf",  (message) => {
            console.log(message, "INVOICE_PDF")
            console.log("Params clientId: ", params.clientId, ", Params contractId: ", params.contractId)
            depositInvoiceUrl = message;
            
        } )
        socket.on("contractSignatureUrl", (message) => {
          console.log(message, "contractSignatureUrl")
            contractSignatureUrl = message;
        })
       socket.on("contractImgUrl", (message) => {
            console.log(message, "contractImgUrl")
            contractImgUrl = message;
        })
        socket.on("invoice_number", (message) => {
            console.log(message, "INVOICE_NUMBER")
        } )
        socket.on("transactionAmountInCents", (message) => {
            console.log(message, "TRANSACTIONAMOUNTINCENTS")
        } )
        socket.on("contractSignatureUrl", (message) => {
            console.log(message, "CONTRACT-SIGNATURE-URL")
        } )
        socket.on("contractImgUrl", async (message) => {
            setLoading(false)
            console.log(message, "CONTRACT-IMG-URL")
             await updateBookingStatusToReserved(params.clientId,params.contractId, depositInvoiceUrl, message).then(r =>
                {
                    //also add the link to download the pdf
                    // and include tha link in the client dashboard bookings component
                    window.location.href = '/client-dashboard'
                })
        } )
        socket.on("connect", () => {
            console.log("connected")
        })
        socket.on("connect_error", (err) => {
            console.log(err.message, "message");
    
            console.log(err.description, "description");
    
            console.log(err.context, "context");
        })
      
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

            // await updateBookingStatusToReserved(params.clientId,params.contractId, msgArr[0], msgArr[4]).then(r =>
            // {
            //     //also add the link to download the pdf
            //     // and include tha link in the client dashboard bookings component
            //     window.location.href = '/client-dashboard'
            // })
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

    function Loading(){
        return (
            <div style={{width: "fit-content", margin: "auto", height:"fit-content"}}>
                <ReactLoading type="bars" color="#0000FF"
                height={100} width={50} />
            </div>
        )
    }

    useEffect(() => {
        setLoading(true)
        checkClientWSConnection()
        console.log("PArams",params)

    },[])


    console.log(url)
    return (

        <IonPage>
            <HeaderWithoutImg />
            {loading ? (
            <div>{Loading}
            </div>
            ):(
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
            )}
            

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
