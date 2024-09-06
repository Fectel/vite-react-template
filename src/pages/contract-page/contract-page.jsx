import React, {useEffect, useRef, useState} from "react"
import HeaderWithoutImg from "../../components/header/header-without-img";

import ReactLoading from "react-loading";

import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonCheckbox,
    IonContent, IonIcon,
    IonItem, IonModal,
    IonPage
} from "@ionic/react";
import {card, callOutline, downloadOutline} from "ionicons/icons";
// import adminSignature from "../..//assets/s"
import { useParams } from 'react-router-dom';
import {createUserProfileDocumentAndAddContractToClient,
    loadContract, saveContractPng,
    saveContractSignature,
} from "../../firebase";
import axios from "axios";
import SignatureCanvas from "react-signature-canvas";
import {useAuth} from "../../auth-context/auth-context";
import BookingComponentPaymentProgress
    from "../../components/booking-component-payment-progress/booking-component-payment-progress";
import FirebaseUiComponent from "../../components/firebase-ui-component/firebase-ui-component";
import {toPng} from "html-to-image";
import  adminSignature from "../../assets/signature.png"



const ContractPage = () => {
    const [ contractImgUrl, setContractImgUrl ] = useState("")
    const signaturePadRef = useRef(null);
    const signPadRef = useRef(null);

    const [checked, setChecked ] = useState(false)

    const[ mouseEntered, setMouseEntered] = useState(false);

    const [ currentKey, setCurrentKey ] = useState(0)
    const params = useParams();
    // console.log(params)
    const [contract, setContract] = useState();
    const currentDate = new Date()
    // console.log(currentDate.toString().substring(0,15))
    // const [ resetPageClearSig, setResetPageClearSig ] = useState(false)

    const [ mouseInsideSignPad, setMouseInsideSignPad ] = useState(false)
    const [showSignInWithPhone, setShowSignInWithPhone ] = useState(false)

    const [ signPadClicked, setSignPadClicked] = useState(false)
    const [ buttonDisabled, setButtonDisabled ] = useState(true)
    let element;
    const [contractSignedBool, setContractSignedBool ]= useState(false)
    const [ isOpen, setIsOpen ] = useState(true)

    const [loading, setLoading] = useState(false)



    // const ADMIN_SIGNATURE_URL = "https://firebasestorage.googleapis.com/v0/b/mariachi-amador.appspot.com/o/admin-signature%2Fsignature?alt=media&token=1db9eb29-02fb-4e79-ac01-938b00e1c6a2";

    const [sign,setSign] = useState()
    const [url,setUrl] = useState()
    const elementRef = useRef(null);


    const handleClear= () =>{
        sign.clear()
        setUrl('')
        setContractSignedBool(false)
    }
    const handleGenerate= () =>{
        console.log((sign.getTrimmedCanvas().toDataURL('image/png')))


        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
        return sign.getTrimmedCanvas().toDataURL('image/png');


    }


    const { currentUser } = useAuth();

    function Loading(){
        return (
            <div style={{width: "fit-content", margin: "auto", height:"fit-content"}}>
                <ReactLoading type="bars" color="#0000FF"
                height={100} width={50} />
            </div>
        )
    }

    async function loadCurrentUser(){

        if (currentUser !== null && currentUser !== undefined) {
            console.log(currentUser)
            await createUserProfileDocumentAndAddContractToClient
            (currentUser, params.id).then( x =>{
                    console.log("DOne SAVING CONTRACT TO USER")
                    console.log(currentUser)
                    setIsOpen(false)
                }

            )
        }else if(currentUser === null || currentUser === undefined){
            console.log(currentUser)
            setIsOpen(true)

        }
        const contractRef = await loadContract(params.id);
        console.log(contractRef.data())
        if (contractRef.data().status === "Contract is Ready" && contractRef.data().contractSignatureUrl){
            let temp = contractRef.data();
            temp.contractSignatureUrl = "";
            console.log(temp)
            setContract({...temp})

        }else{
            setContract({...contractRef.data()})
        }
    }
    // auth.signOut()

    useEffect(() => {
        console.log(currentUser)
        loadCurrentUser();
        // auth.signOut()
        // setResetPageClearSig(false)
    },[ mouseInsideSignPad , currentUser, sign])

    function mouseOver(){
        console.log("mouseOver")
        setMouseEntered(true);
    }

    function handleCaptureButtonMouseDown(){

    }
    function handleCaptureButtonMouseUp(){

    }

    function onSignPadClick(){
        const element = signaturePadRef.current;

        setSignPadClicked(true)
        console.log("Signature Pad is empty: ", element.signaturePad.isEmpty());

        console.log("signpad clicked ", signPadClicked)
        if(!element.signaturePad.isEmpty() && mouseInsideSignPad === true){
            setButtonDisabled(false)
        }
    }

    function onMouseEntersSignaturePad(){

        console.log("Mousr inside!")

        setMouseInsideSignPad(true)

    }

    function onClearSignatureClick(){
        setCurrentKey(currentKey + 1)
        const element = signaturePadRef.current;
        setButtonDisabled(true)

        console.log("Signature Pad is empty: ", element.signaturePad.isEmpty());

    }
    function onSaveSignature(){
        console.log(signaturePadRef)
        let canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
        let dataURL = canvas.toDataURL("image/png");
        document.getElementById("saveSignature").src = dataURL;
        console.log(dataURL, canvas)
    }

    const openImg = (src) => {
        const base64ImageData = src;
        const contentType = 'image/png';
        const byteCharacters = atob(base64ImageData.substring(`data:${contentType};base64,`.length));
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
            const slice = byteCharacters.slice(offset, offset + 1024);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        const blobUrl = URL.createObjectURL(blob);

        // window.open(blobUrl, '_blank');
        return blobUrl
    }

    const htmlToImageConvert = (bUrl) => {
        console.log("hellooo")
        toPng(elementRef.current, { cacheBust: false })
            .then(async (dataUrl) => {
                // const link = document.createElement("a");
                // link.download = "my-image-name.png";
                // link.href = dataUrl;
                // link.click();


                const blob = await fetch(dataUrl).then(res => {
                    return res.blob()
                })

                console.log(blob)
                const pictureUrlConst = window.URL.createObjectURL(blob);
                console.log('created URL: ', pictureUrlConst)
                // setContractImgUrl(pictureUrlConst)
                let url = await saveContractPng(pictureUrlConst, currentUser.uid, contract.docId)


                console.log(url)



                axios({
                    url: 'pay-mariachi-deposit',
                    // url: 'create-pay-deposit-session',
                    baseURL: "https://mariachihero.com",

                    method: 'post',
                    params:
                        {
                            name: contract.name + " (Deposit)",
                            price: .5,
                            // price: contract.feeDeposit,
                            contractId: contract.docId,
                            clientId: currentUser.uid,
                                contractSignatureUrl: bUrl,
                            contractImgUrl: url,

                        }

                }).then(response => {
                    console.log(response.data.url)
                    setLoading(false)

                    window.location.href= response.data.url;

                }).catch(error => {
                    console.log("submit contract error: ", error)
                });



                return url;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    async function onContractSubmit() {
        setLoading(true)

        let bUrl;
        console.log(contract, "onSubmitContracvgt")
        if(!contract.contractSignatureUrl || contract.contractSignatureUrl === ""){
            let ret = await handleGenerate()
            console.log(ret)
            bUrl = openImg(ret)
            console.log(bUrl)
        }


       let url = await saveContractSignature(contract.docId, bUrl)
        console.log(url)
       let urlContract =  await htmlToImageConvert(url)



        console.log( urlContract)
        console.log(contractImgUrl)
            // axios({
            //     url: 'pay-mariachi-deposit',
            //     // url: 'create-pay-deposit-session',
            //     method: 'post',
            //     params:
            //         {
            //             name: contract.name + " (Deposit)",
            //             price: contract.feeDeposit,
            //             contractId: contract.docId,
            //             clientId: currentUser.uid,
            //                 contractSignatureUrl: bUrl,
            //             contractImgUrl,
            //
            //         }
            //
            // }).then(response => {
            //     console.log(response.data.url)
            //
            //     window.location.href= response.data.url;
            //
            // }).catch(error => {
            //     console.log("submit contract error: ", error)
            // });


    }
    function onPayRemainingBalanceClick(){

        setLoading(true)
        axios({
            url: 'pay-mariachi-remaining-balance',
            // url: 'create-pay-deposit-session',
            baseURL: "https://mariachihero.com",

            method: 'post',
            params:
                {
                    name: `${contract.name} (Remaining Balance ${contract.balanceDue})`,
                    price: contract.balanceDue,
                        contractId: contract.docId,
                    clientId: contract.clientId,
                }

        }).then( response => {


            setLoading(false)
            console.log(response.data.url)
            window.location.href = response.data.url;


        }).catch(error => {
            console.log("submit contract error: ", error)
        });
    }

    const modal = useRef(null);
    const page = useRef(null);

    function dismiss() {
        modal.current?.dismiss();
    }
    console.log(contract?.contractSignatureUrl)


    function renderCheckbox(){
        console.log(signaturePadRef)
        console.log(signPadRef)
        console.log(signaturePadRef.isEmpty)
        console.log(signPadRef.isEmpty)
        return (
            <IonItem disabled={!contractSignedBool} style={{backgroundColor: "black"}}>
               

                <div style={{display:"flex", flexDirection: "column"}}>
                <div>
                <h2>Electronic Signature Consent</h2>
            </div>
            <div>
            <div
                style={{display:"flex", flexDirection:"row"}}
                >
                    <IonCheckbox style={{
                        width:"2em",
                        // backgroundColor:"blue",
                    }}

                 checked={checked || contract.status === "Reserved"|| contract.status === "Ready For Performance!"} onIonChange={e => setChecked(e.detail.checked)} />

                </div>

            <div style={{fontSize: ".8rem",
                    // backgroundColor:"red",
                    marginLeft:"1em", }}>I accept contract terms and conditions
                </div>
                   
            </div>
                
                </div>
                <div style={{fontSize:".65rem"}}>
                        By checking here, you are consenting to the use of your electronic signautre in lieu of an 
                        original signature on paper. You have the right to request that you sign a paper copy instead. By checking here, you are waiving that right.
                        After consent, you may obtain an img of this contract.
                    </div>
           
            </IonItem>
        )
    }

    function onSignEnd(){
        console.log(sign, sign.isEmpty())
        if(sign.isEmpty() === false){
            setContractSignedBool(true)
        }
    }

    async function onDownloadContractCLick() {
        // toPng(elementRef.current, { cacheBust: false })
        //     .then(async (dataUrl) => {
        //         const link = document.createElement("a");
        //         link.download = "my-image-name.png";
        //         link.href = dataUrl;
        //         link.click();
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        const link = document.createElement('a');
        link.href = contract.contractImgUrl;

        link.download = "mariachi-contract.png";
        link.click();

    }

    return (

        <IonPage ref={page} >
            <HeaderWithoutImg />

                {contract !== undefined ? (
                    <IonContent >
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

                       
                            <IonCard style={{width:"95%", maxWidth:"55em", margin:"1em auto",
                                // backgroundColor:"rgba(255,249,187,0.5)"}}
                                     backgroundColor:"black"}}
                            >
                                <BookingComponentPaymentProgress
                                    remainingBalance={
                                        contract.feeTotal -  Math.round((contract.feeTotal/2)/50) * 50
                                    }
                                    contract={contract}
                                />
                                <div ref={elementRef}
                                     style={{backgroundColor:"white"}}
                                     crossOrigin="anonymous"
                                >
                                    <IonCardHeader style={{textAlign: "center"}}>
                                        <IonCardTitle style={{color: "black"}}>Mariachi</IonCardTitle>
                                        <IonCardTitle style={{color: "black"}}>Hermanos Azteca</IonCardTitle>
                                        <IonCardSubtitle style={{color: "black"}}>Performance Contract</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent style={{padding: "0", }}>
                                        <div style={{width: "90%",  margin: "auto", fontSize:".8rem"}}>
                                            <div>This contract Agreement is made on this day of
                                                <span style={{color:"#FFD454",fontWeight:"bold", margin:"0 .2em",backgroundColor:"black", padding:"0 1em"}}> {currentDate.toString().substring(0,15)} </span>
                                                between
                                                <span  style={{color:"#FFD454",margin:"0 .2em",fontWeight:"bold", backgroundColor:"black", padding:"0 1em"}}> {contract.clientName} </span>
                                                and Mariachi Hermanos Azteca for the hiring of Mariachi Hermanos Azteca.
                                            </div>
                                        </div>
                                        <div  style={{
                                            margin:"auto",
                                            width:"fit-content",
        
        
                                        }}>
                                            <div style={{margin: "1em auto", width:"fit-content",}}>It is agreed as follows: </div>
        
                                            <div                                   >
                                                <div>1. Date Of Performance:</div>
                                                <div  style={{color:"#FFD454",
                                                    margin:"auto",
                                                    fontWeight:"bold", backgroundColor:"black", padding:"0 1em", width:"fit-content" }}> {contract.performanceDate}</div>
                                            </div>
                                            <div
                                            >
                                                <div>2. Performance Time:</div>
                                                <div  style={{color:"#FFD454",
                                                    margin:"auto",
        
                                                    fontWeight:"bold", backgroundColor:"black", padding:"0 1em",width:"fit-content"  }}> {contract.performanceTime}</div>
                                            </div>
                                            <div
                                            >
                                                <div>3. Mariachi Group Size:</div>
                                                <div style={{color:"#FFD454",
                                                    margin:"auto",                                        fontWeight:"bold", backgroundColor:"black", padding:"0 1em",width:"fit-content"  }}> {contract.numberOfMariachis}</div>
                                            </div>
                                            <div
                                            >
                                                <div>4. Performance Address:</div>
                                                <div style={{color:"#FFD454",fontWeight:"bold",
                                                    margin:"auto",
                                                    backgroundColor:"black", padding:"0 1em",width:"fit-content"  }}> {contract.performanceAddress}</div>
                                            </div>
                                            <div
                                            >
                                                <div>5. Fee Total:</div>
                                                <div style={{color:"#FFD454",fontWeight:"bold",
                                                    margin:"auto",
                                                    backgroundColor:"black", padding:"0 1em",width:"fit-content" }}> ${contract.feeTotal}</div>
                                            </div>
                                            <div
                                            >
                                                <div>6. Fee Deposit:</div>
                                                <div style={{color:"#FFD454",fontWeight:"bold",
                                                    margin:"auto",
                                                    backgroundColor:"black", padding:"0 1em",width:"fit-content" }}> ${contract.feeDeposit}</div>
                                            </div>
                                            <div
                                            >
                                                <div>6. Fee Remaining:</div>
                                                <div style={{color:"#FFD454",fontWeight:"bold",
                                                    margin:"auto",
                                                    backgroundColor:"black", padding:"0 1em" , width:"fit-content" }}> ${contract.feeTotal -contract.feeDeposit}</div>
                                            </div>
        
        
                                        </div>
                                        <div style={{
                                            fontSize: ".6rem",
                                            textAlign: "left",
                                            padding: "0em 1.5em",
                                            marginTop: "2em",
                                        }}>
                                            <div>   * Payment: Compensation for the the musical performance
                                                will be  <span>${contract.feeTotal} </span>dollars, payable by cash, or card.
                                                A ${contract.feeDeposit} deposit Fee is due on the signing of this contract.
                                                This is a required condition for the contract to proceed;
                                                if a ${contract.feeDeposit} deposit Fee is not tendered upon the signing
                                                of this contract, no further obligation for either party
                                                comes due. The remaining ${contract.feeTotal - contract.feeDeposit} Fee is due immediately
                                                prior to Mariachi Hermanos Azteca's Performance, but may be made earlier.
                                            </div>
                                            <br></br>
        
                                            <div >
                                                * Cancellation: If full payment is not made by the time immediately
                                                prior to Mariachi Hermanos Azteca's performance, The performance may
                                                be cancelled by Mariachi Hermanos Azteca, and <span>{contract.clientName}</span> may not seek
                                                any damages.Cancellation may be made by <span>{contract.clientName}</span> in which case Operator's ${contract.feeDeposit} deposit
                                                of Fee is non-refundable, but Operator will not have to pay the remaining
                                                ${contract.feeTotal - contract.feeDeposit} of Fee. Mariachi Hermanos Azteca may cancel at any time prior, in which
                                                case Mariachi Hermanos Azteca must refund Fee in its entirety.
        
                                            </div>
                                            <br/>
                                            <div> * Missing Musicians: In the event that there are less than the agreed upon musicians at the performance from unpredictable occurrences.
                                                The client will be refunded $75 per musician missing per hour.
        
        
                                            </div>
                                            <br></br>
                                            <div>* Force Majeure. In the event Show cannot reasonably be put on because of unpredictable occurrences
                                                such as an act of nature, government, or illness/disability of Mariachi Hermanos Azteca, the
                                                50% deposit of Fee is non-refundable, but no other portion of Fee is due, and the parties may
                                                negotiate a substitute Show on the same terms as this Agreement save for the time of
                                                with no further deposit of Fee due, in which case a new Agreement reflecting this will be
                                                signed by the parties.
                                                No further damages may be sought for failure to perform because of force majeure.</div>
                                            <br></br>
                                            <div>*
                                                Break: Typically the performance will have a 15 minute break after the first hour,
                                                then again after 45 minutes, until the completion of the time. We are flexible
                                                and will cooperate with the client.
        
                                            </div>
        
        
                                        </div>
                                        <div
        
                                            style={{
                                                padding: "1em",
                                                textAlign: "center",
                                                fontSize: ".7rem",
                                            }}
                                        >
                                            <div >The below-signed Mariachi Hermanos Azteca Representative warrants
                                                he has authority to enforceably sign this agreement for Mariachi
                                                Hermanos Azteca in its entirety. The below signed Operator's Representative
                                                warrants s/he has authority to bind Operator and Venue.
        
                                            </div>
                                            <div >
                                                <div>Signature of Band Representative:</div>
                                                <img style={{
                                                    // backgroundColor:"white",
                                                    maxWidth:"35em",
                                                }} src={adminSignature} />
                                                <div>
                                                    <div>Hector Amador</div>
                                                    <div>Mariachi Hermanos Azteca</div>
                                                </div>
        
        
        
        
        
                                            </div>
                                            <div
                                            >
                                                <div>Client Signature:</div>
        
                                                <div>
        
                                                    {(!contract.contractSignatureUrl  )||contract.contractSignatureUrl === undefined || contract.contractSignatureUrl === "" && (
        
                                                        <div >
                                                            <div style={{border:"2px solid gold",
                                                                backgroundColor: "white", margin:"auto",
                                                                width: "100%", maxWidth:"40em", height: 200}}>
                                                                <SignatureCanvas
        
                                                                    canvasProps={{width: 800, height: 200,
                                                                        backgroundColor:"white",
                                                                    }}
                                                                    ref={data=>setSign(data)}
                                                                    // onBegin={() => console.log("on begin!")}
                                                                    onEnd={() => onSignEnd()}
                                                                />
                                                            </div>
        
                                                            <br></br>
                                                            {contract.status !== "Reserved" && contract.status !== "Ready For Performance!"&& (
                                                                <button style={{height:"30px",width:"60px"}} onClick={handleClear}>Clear</button>
        
                                                            )}
                                                        </div>
                                                    )}
        
                                                    {/*<button  style={{height:"30px",width:"60px"}} onClick={handleGenerate}>Save</button>*/}
        
                                                    <br/><br/>
                                                    {(contract.contractSignatureUrl && contract.contractSignatureUrl !== "") ? (
                                                        <div style={{backgroundColor:"white",
                                                            // width: 800,
                                                            maxWidth:"40em",
                                                            height: 80,
                                                            margin: "1em auto",
                                                        }}>
                                                         {contract.status !== "Reserved" && contract.status !== "Ready For Performance!"&& (
                                                                <button color="danger" style={{height:"30px",width:"60px"}} onClick={handleClear}>Clear</button>
        
                                                                )}
        
                                                            <img  style={{
                                                                // backgroundColor:"white",
                                                                width: "70%", height: "80%",
                                                            }}
                                                                  src={contract.contractSignatureUrl} />
        
                                                           
                                                        </div >
                                                    ):(
                                                        <div >
                                                            <div style={{border:"2px solid gold",
                                                                backgroundColor: "white", margin:"auto",
                                                                width: "100%", maxWidth:"40em", height: 200}}>
                                                                <SignatureCanvas
        
                                                                    canvasProps={{width: 800, height: 200,
                                                                        backgroundColor:"white",
                                                                    }}
                                                                    ref={data=>setSign(data)}
                                                                    // onBegin={() => console.log("on begin!")}
                                                                    onEnd={() => onSignEnd()}
                                                                />
                                                            </div>
        
                                                            <br></br>
                                                            {contract.status !== "Reserved" && (
                                                                <button style={{height:"30px",width:"60px"}} onClick={handleClear}>Clear</button>
        
                                                            )}
                                                        </div>
                                                    )}
        
                                                </div>
        
        
                                            </div>
        
                                            {renderCheckbox()}
        
        
                                            <div >Client's typed name:</div>
                                            <div>{contract.clientName}</div>
                                            {/*</div>*/}
                                        </div>
        
        
        
                                    </IonCardContent>
                                </div>
        
                                {checked && contract.status === "Contract is Ready" && (
                                    <IonButton disabled={loading} onClick={() => onContractSubmit()} color="primary" style={{textAlign: "center",width: "100%" , height:"5em",color: "white", padding: ".5em", backgroundColor: "white", margin: "auto"}}>
                                       {loading ? (
                                            <div>{Loading()}</div>
                                            ):(
                                                <div>

                                        <IonIcon icon={card} style={{marginRight:".5em"}}/>
        
                                        Deposit Fee Due: $<span style={{fontWeight: "bold"}}>{contract.feeDeposit}</span>
                                            </div>
                                        )}
                                    </IonButton>
        
                                    // <IonItem style={{height: "fit-content", padding: "0",}}>
                                    //     <IonGrid style={{ width: "100%", padding: "0", margin: ".2em"}}>
                                    //         <IonRow >
                                    //
                                    //         </IonRow>
                                    //         <IonRow style={{ width: "100%"}}>
                                    //             <IonButton onClick={() => onContractSubmit()} color="secondary" >
                                    //                 Pay with Card</IonButton>
                                    //             {/*<IonButton color="secondary" >Pay with Zelle</IonButton>*/}
                                    //             {/*<IonButton color="secondary" >Google Pay</IonButton>*/}
                                    //
                                    //         </IonRow>
                                    //     </IonGrid>
                                    // </IonItem>
        
        
        
                                )}
                                {contract.status === "Ready For Performance!" && (
                                    <IonButton
                                        onClick={() => onDownloadContractCLick()}
                                    >
                                        <IonIcon  style={{
                                            marginRight:".5em",
                                            marginBottom:".3em",
        
                                        }}icon={downloadOutline} />
                                        Open Contract Img</IonButton>
        
                                )}
        
                                {contract.status === "Reserved" && (
                                    <div>
                                        {loading ? (
                                            <div>{Loading()}</div>
                                        ):(
                                            <IonButton
                                            disabled={loading}
                                                onClick={() => onPayRemainingBalanceClick()}
                                                expand="block" style={{fontSize: ".9rem", marginTop: "1em auto"}} color="secondary">
                                                <IonIcon style={{marginRight: ".5em"}} icon={card}/>
            
                                                <div>
                                                    Pay Remaining Balance: ${contract.balanceDue}
                                                </div>
                                            </IonButton>
                                        )}
        
                                       
                                    </div>
        
                                )}
        
        
        
        
                            </IonCard>
                        

                  

                    </IonContent>

                ):(<div>Loading</div>)}

                {/*<IonButton   disabled={buttonDisabled} expand="block" color="secondary" onClick={() => onContractSubmit()}>I accept this contract</IonButton>*/}

        </IonPage>
    )
}

export default ContractPage;
