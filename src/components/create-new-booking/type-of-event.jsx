import {IonCard} from "@ionic/react";
import React from "react"

function TypeOfEvent() {
  const [count, setCount] = useState(0)

    const  EVENT_TYPES = [
        {
          name: "Birthday"
        },
        {
          name: "Anniversary"
        },
        {
          name: "Proposal"
        },
        {
          name: "Serenata"
        },
        {
          name: "Quinceñera"
        },
        {
          name: "Graduation"
        },
        {
            name: "Funerals"
        },
        {
            name: "Concert Events "
        },
        {
          name: "Other"
        },
    ]
  return (
    <>
        <IonCard style={{
            width:"90%"
        }}>
            <div>What cater to all types of events!</div>
            <div>Whats the occasion?</div>
            <div
                style={{
                    display:"flex",
                    flexWrap: "wrap",
                    width:"80%",
                    border:"solid thin",
                    margin:"5em auto"

                }}
            >
                {EVENT_TYPES.map((event, i ) => (
                    <IonCard
                        style={{
                            width:"13em",
                            height:"15em",
                            margin:"1em ",
                        }}
                    >

                        {event.name}
                    </IonCard>
                ))}

            </div>
        </IonCard>

    </>
  )
}

export default TypeOfEvent;
