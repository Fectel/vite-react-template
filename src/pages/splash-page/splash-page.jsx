import {useEffect, useRef} from "react"
import {useAuth} from "../../auth-context/auth-context.jsx";
import {call} from "ionicons/icons";
import { IonButton, IonContent, IonPage, IonIcon, } from "@ionic/react"
import Header from "../../components/header/header.jsx";


export default function SplashPage(){


    const page = useRef(null);
    const { currentUser } = useAuth();

    function checkUserAuth(){
        if (currentUser !== null && currentUser !== undefined) {
            console.log(currentUser)
            window.location.href = '/client-dashboard'
        }
    }

    useEffect(() => {
      checkUserAuth()
    }, [currentUser]);


    return (
        <IonPage ref={page}>
            <IonContent>
                <Header />


                    <div style={{margin: "1em auto", display:"flex",
                        // border:"solid yellow",
                        width:"fit-content", flexDirection: "column"}}>

                        <IonButton
                            color="warning"

                                    // size="medium"
                                    style={{display:"flex",
                                        width:"fit-content",
                                        fontSize:".8rem",
                                        // backgroundColor:"red",
                                        // border:"solid thin",
                                        flexDirection:"column"}}
                                    href="tel:+14804207629"
                        >
                            <div style={{marginRight:"1em"}}>
                                Easy Online
                                Bookings

                            </div>
                            <IonIcon  style={{marginRight: ".5em"}} icon={call} />
                            <div>(480) 420-7629</div>
                        </IonButton>
                    </div>
            </IonContent>

        </IonPage>

    )
}