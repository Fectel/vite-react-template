import React, {useEffect, useState} from "react";
import { IonCard, IonIcon} from "@ionic/react";
import { pencilSharp as editIcon} from "ionicons/icons";
import { updateScheduleChange} from "../../../firebase";

export default function Schedule({bookingsArray}){


    const [ editSchedule, setEditSchedule ] = useState(false);

    const [dataMonday, setDataMonday ] = useState([])
    const [dataTuesday, setDataTuesday ] = useState([])
    const [dataWednesday, setDataWednesday ] = useState([])
    const [dataThursday, setDataThursday ] = useState([])
    const [dataFriday, setDataFriday ] = useState([])
    const [dataSaturday, setDataSaturday ] = useState([])
    const [dataSunday, setDataSunday ] = useState([])
    const [dataMonday2, setDataMonday2 ] = useState([])
    const [dataTuesday2, setDataTuesday2 ] = useState([])
    const [dataWednesday2, setDataWednesday2 ] = useState([])
    const [dataThursday2, setDataThursday2 ] = useState([])
    const [dataFriday2, setDataFriday2 ] = useState([])
    const [dataSaturday2, setDataSaturday2 ] = useState([])
    const [dataSunday2, setDataSunday2 ] = useState([])

    function setDayAndPopulateWeek(zeroDay, dayZero, dayOne,
                                   dayTwo, dayThree, dayFour,
                                   dayFive, daySix, daySeven,
                                   dayEight, dayNine, dayTen,
                                   dayEleven, dayTwelve, dayThirteen,

    ){
        console.log(zeroDay, dayOne, dayTwo, dayThree,
            dayFour, dayFive, daySix,
            daySeven, dayEight, dayNine, dayTen,
            dayEleven, dayTwelve, dayThirteen,
            )
        switch (zeroDay) {

            case "Mon":
                setDataMonday(dayZero)
                setDataTuesday(dayOne)
                setDataWednesday(dayTwo)
                setDataThursday(dayThree)
                setDataFriday(dayFour)
                setDataSaturday(dayFive)
                setDataSunday(daySix)
                setDataMonday2(daySeven)
                setDataTuesday2(dayEight)
                setDataWednesday2(dayNine)
                setDataThursday2(dayTen)
                setDataFriday2(dayEleven)
                setDataSaturday2(dayTwelve)
                setDataSunday2(dayThirteen)
                break;
            case "Tue":
                setDataMonday(dayThirteen)
                setDataTuesday(dayZero)
                setDataWednesday(dayOne)
                setDataThursday(dayTwo)
                setDataFriday(dayThree)
                setDataSaturday(dayFour)
                setDataSunday(dayFive)
                setDataMonday2(daySix)
                setDataTuesday2(daySeven)
                setDataWednesday2(dayEight)
                setDataThursday2(dayNine)
                setDataFriday2(dayTen)
                setDataSaturday2(dayEleven)
                setDataSunday2(dayTwelve)
                break;
            case "Wed":
                setDataMonday(dayTwelve)
                setDataTuesday(dayThirteen)
                setDataWednesday(dayZero)
                setDataThursday(dayOne)
                setDataFriday(dayTwo)
                setDataSaturday(dayThree)
                setDataSunday(dayFour)
                setDataMonday2(dayFive)
                setDataTuesday2(daySix)
                setDataWednesday2(daySeven)
                setDataThursday2(dayEight)
                setDataFriday2(dayNine)
                setDataSaturday2(dayTen)
                setDataSunday2(dayEleven)
                break;
            case "Thu":
                setDataMonday(dayEleven)
                setDataTuesday(dayTwelve)
                setDataWednesday(dayThirteen)
                setDataThursday(dayZero)
                setDataFriday(dayOne)
                setDataSaturday(dayTwo)
                setDataSunday(dayThree)
                setDataMonday2(dayFour)
                setDataTuesday2(dayFive)
                setDataWednesday2(daySix)
                setDataThursday2(daySeven)
                setDataFriday2(dayEight)
                setDataSaturday2(dayNine)
                setDataSunday2(dayTen)
                break;
            case "Fri":
                setDataMonday(dayTen)
                setDataTuesday(dayEleven)
                setDataWednesday(dayTwelve)
                setDataThursday(dayThirteen)
                setDataFriday(dayZero)
                setDataSaturday(dayOne)
                setDataSunday(dayTwo)
                setDataMonday2(dayThree)
                setDataTuesday2(dayFour)
                setDataWednesday2(dayFive)
                setDataThursday2(daySix)
                setDataFriday2(daySeven)
                setDataSaturday2(dayEight)
                setDataSunday2(dayNine)
                break
            case "Sat":
                setDataMonday(dayNine)
                setDataTuesday(dayTen)
                setDataWednesday(dayEleven)
                setDataThursday(dayTwelve)
                setDataFriday(daySix)
                setDataSaturday(dayZero)
                setDataSunday(dayOne)
                setDataMonday2(dayTwo)
                setDataTuesday2(dayThree)
                setDataWednesday2(dayFour)
                setDataThursday2(dayFive)
                setDataFriday2(daySix)
                setDataSaturday2(daySeven)
                setDataSunday2(dayEight)
                break;
            case "Sun":
                setDataMonday(dayEight)
                setDataTuesday(dayNine)
                setDataWednesday(dayTen)
                setDataThursday(dayEleven)
                setDataFriday(dayTwelve)
                setDataSaturday(dayThirteen)
                setDataSunday(dayZero)
                setDataMonday2(dayOne)
                setDataTuesday2(dayTwo)
                setDataWednesday2(dayThree)
                setDataThursday2(dayFour)
                setDataFriday2(dayFive)
                setDataSaturday2(daySix)
                setDataSunday2(daySeven)
                break;
        }

        console.log(dataMonday)
        console.log(dataTuesday)
        console.log(dataWednesday)
        console.log(dataThursday)
        console.log(dataFriday)
        console.log(dataSaturday)
        console.log(dataSunday)
        console.log(dataMonday2)
        console.log(dataTuesday2)
        console.log(dataWednesday2)
        console.log(dataThursday2)
        console.log(dataFriday2)
        console.log(dataSaturday2)
        console.log(dataSunday2)
    }

    function loadBookings(){
        console.log(bookingsArray)
        let result = Object.keys(bookingsArray)
            .map(key => ( bookingsArray[key]));

        console.log(result);
        // result.map(x => {
        //     console.log(x)

        // if()
        // })
        //filter or soemthing to get all the different date

        let currentDate= new Date();

        // currentDate.setHours(7)
        let zeroDay = new Date(currentDate.setHours(1))
        let oneDay  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let twoDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let threeDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let fourDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let fiveDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let sixDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let sevenDays = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let eightDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let nineDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let tenDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let elevenDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let twelveDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))
        let thirteenDays  = new Date(currentDate.setHours(currentDate.getHours()+ 24))


        console.log(result[0]?.performanceDate)
        console.log(zeroDay)
        console.log(oneDay)
        console.log(twoDays)
        console.log(threeDays)
        console.log(fourDays)
        console.log(fiveDays)
        console.log(sixDays)
        console.log(sevenDays)
        console.log(eightDays)
        console.log(nineDays)
        console.log(tenDays)
        console.log(elevenDays)
        console.log(twelveDays)
        console.log(thirteenDays)

        let dayZero = [];
        let dayOne = [];
        let dayTwo = [];
        let dayThree = [];
        let dayFour = [];
        let dayFive = [];
        let daySix = [];
        let daySeven = [];
        let dayEight = [];
        let dayNine = [];
        let dayTen = [];
        let dayEleven = [];
        let dayTwelve = [];
        let dayThirteen = [];

        result.map(booking => {
            console.log(booking.performanceDate)
            console.log(zeroDay.toString().substring(0,15))
            if (booking.performanceDate === zeroDay.toString().substring(0,15)){
                console.log(0)
                dayZero = [...dayZero, booking]

            }else if(booking.performanceDate === oneDay.toString().substring(0,15)){
                console.log(1)
                dayOne = [...dayOne, booking]

            }else if(booking.performanceDate === twoDays.toString().substring(0,15)){
                console.log(2)
                dayTwo = [...dayTwo, booking]
            }else if(booking.performanceDate === threeDays.toString().substring(0,15)){
                console.log(3)
                dayThree = [...dayThree, booking]
            }else if(booking.performanceDate === fourDays.toString().substring(0,15)){
                console.log(4)
                dayFour = [...dayFour, booking]
            }else if(booking.performanceDate === fiveDays.toString().substring(0,15)){
                console.log(5)
                dayFive = [...dayFive, booking]
            }else if(booking.performanceDate === sixDays.toString().substring(0,15)){
                console.log(6)
                daySix = [...daySix, booking]
            }else if(booking.performanceDate === sevenDays.toString().substring(0,15)){
                console.log(7)
                daySeven = [...daySeven, booking]
            }else if(booking.performanceDate === eightDays.toString().substring(0,15)){
                console.log(8)
                dayEight = [...dayEight, booking]
            }else if(booking.performanceDate === nineDays.toString().substring(0,15)){
                console.log(9)
                dayNine = [...dayNine, booking]
            }else if(booking.performanceDate === tenDays.toString().substring(0,15)){
                console.log(10)
                dayTen = [...dayTen, booking]
            }else if(booking.performanceDate === elevenDays.toString().substring(0,15)){
                console.log(11)
                dayEleven = [...dayEleven, booking]
            }else if(booking.performanceDate === twelveDays.toString().substring(0,15)){
                console.log(12)
                dayTwelve = [...dayTwelve, booking]
            }else if(booking.performanceDate === thirteenDays.toString().substring(0,15)){
                console.log(13)
                dayThirteen = [...dayThirteen, booking]
            }
        })
        console.log(dayZero)
        console.log(dayOne)
        console.log(dayTwo)
        console.log(dayThree)
        console.log(dayFour)
        console.log(dayFive)
        console.log(daySix)
        console.log(daySeven)
        console.log(dayEight)
        console.log(dayNine)
        console.log(dayTen)
        console.log(dayEleven)
        console.log(dayTwelve)
        console.log(dayThirteen)

        setDayAndPopulateWeek(zeroDay.toString().substring(0,3), dayZero, dayOne, dayTwo,
            dayThree, dayFour, dayFive, daySix, daySeven,
            dayEight, dayNine, dayTen, dayEleven, dayTwelve,
            dayThirteen,
            )

    }
    useEffect(() => {
        if (!bookingsArray) return;
        console.log(bookingsArray)

        // loadClassScheduleData()
        loadBookings()
    }, [bookingsArray])

    function renderSchedule(){
        console.log(dataMonday)

        return (
            <div style={{ textAlign: "center", width: "100%",
                overflowX:"none", backgroundColor:"white",

            }}>
                <div style={{display:"flex", width:"fit-content", margin: "auto"}}>
                    <div style={{fontSize: "1.5rem", fontWeight:"bold", marginTop:".3em",}}>
                        Class Schedule

                    </div>
                    <IonCard onClick={() => setEditSchedule(!editSchedule)} style={{marginTop:".3em", marginLeft:".5em", cursor:"pointer", padding: ".2em",fontSize: "1.3rem"}}>
                        <IonIcon icon={editIcon} />
                    </IonCard>
                </div>

                <div style={{display:"flex",
                    height:"25em",

                    justifyContent:"space-evenly",
                    border:"solid yellow",
                    overflowX: "scroll",
                }}>
                    {dataMonday.length > 0 && dataMonday[0].status !== "Confirming Availability" && (
                        <div style={{display: "flex", margin: "auto", overflowX:"scroll", border:"solid thin", width:"100%", fontSize:"1.2rem"}}>
                            <div style={{backgroundColor:"white", borderRadius:"12px"}}  >
                                <div
                                style={{
                                    position:"absolute"
                                }}>
                                    {dataMonday[0].performanceDate.toString().substring(0,10)}
                                </div>
                                <div>
                                    { dataMonday && dataMonday.map((data, i) => (
                                        <IndividualDaySchedule
                                            data={data}
                                            key={i}
                                            editSchedule={editSchedule}
                                            dayOfTheWeek="Monday"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {dataTuesday.length > 0 && dataTuesday[0].status !== "Confirming Availability" &&(
                        <div style={{backgroundColor: "rgba(0,0,0,0.06)", borderRadius:"12px"}}>
                            <div>
                                {dataTuesday[0].performanceDate.toString().substring(0,10)}

                            </div>
                            <div>
                                { dataTuesday && dataTuesday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Tuesday"
                                    />
                                ))}
                            </div>
                        </div>

                    )}
                    {dataWednesday.length > 0 && dataWednesday[0].status !== "Confirming Availability" && (
                        <div>
                            <div>
                                {dataWednesday[0].performanceDate.toString().substring(0,10)}

                            </div>
                            <div>
                                { dataWednesday && dataWednesday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Wednesday"
                                    />
                                ))}
                            </div>
                        </div>

                    )}
                    {dataThursday.length > 0 && dataThursday[0].status !== "Confirming Availability" &&(
                        <div style={{backgroundColor: "rgba(0,0,0,0.06)", borderRadius:"12px",
                            width:"8em"
                        }}>
                            <div style={{
                            }}
                            >
                                {dataThursday[0].performanceDate.toString().substring(0,10)}

                            </div>
                            <div style={{marginTop:"2em"}}>
                                { dataThursday && dataThursday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Thursday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataFriday.length > 0 && dataFriday[0].status !== "Confirming Availability" &&(
                        <div style={{
                            width:"10em"
                        }}>
                            <div>
                                {dataFriday[0].performanceDate.toString().substring(0,10).toString().substring(0,10)}

                            </div>
                            <div>
                                { dataFriday && dataFriday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Friday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataSaturday.length > 0 && dataSaturday[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataSaturday[0].performanceDate.toString().substring(0,10)}

                            </div>
                            <div>
                                { dataSaturday && dataSaturday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Saturday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataSunday.length > 0 && dataSunday[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataSunday[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataSunday && dataSunday.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Sunday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataMonday2.length > 0 && dataMonday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataMonday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataMonday2 && dataMonday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Monday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataTuesday2.length > 0 && dataTuesday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataTuesday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataTuesday2 && dataTuesday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Tuesday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataWednesday2.length > 0 && dataWednesday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataWednesday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataWednesday2 && dataWednesday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Wednesday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataThursday2.length > 0 && dataThursday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataThursday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataThursday2 && dataThursday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Thursday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataFriday2.length > 0 && dataFriday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataFriday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataFriday2 && dataFriday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Friday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataSaturday2.length > 0 && dataSaturday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataSaturday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataSaturday2 && dataSaturday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Saturday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {dataSunday2.length > 0 && dataSunday2[0].status !== "Confirming Availability" && (
                        <div style={{
                            width:"8em"
                        }}>
                            <div>
                                {dataSunday2[0].performanceDate.toString().substring(0,10)}
                            </div>
                            <div>
                                { dataSunday2 && dataSunday2.map((data, i) => (
                                    <IndividualDaySchedule
                                        data={data}
                                        key={i}
                                        editSchedule={editSchedule}
                                        dayOfTheWeek="Sunday"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                </div>
        )
    }

    return (<div>
        {renderSchedule()}
    </div>)
}

function IndividualDaySchedule({data, editSchedule, dayOfTheWeek}){


    console.log(data)
    const [description , setDescription] = useState(data.description)
    const [muscleFocus , setMuscleFocus] = useState(data.muscleFocus)
    const [showSaveButton, setShowSaveButton ] = useState(false)

    async function onClickSaveButton() {
        const dataObject = {
            description: description,
            muscleFocus: muscleFocus,
        }
        await updateScheduleChange(dayOfTheWeek, data.timeSlot, dataObject)
        setShowSaveButton(false)
    }
    function onDescriptionChange(e){

        setShowSaveButton(true)
        setDescription(e)
    }
    function onMuscleFocusChange(e){

        setShowSaveButton(true)
        setMuscleFocus(e)
    }
    function renderIndividualDaySchedule(){

        console.log(data.performanceAddress[0])
        return (
            <div style={{
                margin:"0 .1em"
            }}>
                {data.status !== "Confirming Availability" && (
                    <IonCard style={{fontSize:".7rem", width:"100%", margin:"1em auto", padding:"1em"}}>
                        <div style={{}}>
                            <div>
                                {data.performanceTime}
                            </div>
                            <div>
                                {data.performanceAddress[0]}
                            </div>
                            <div
                                style={{

                                }}
                            >
                                Status:<span style={{
                                color: data.status === "Ready For Performance!" ? ("green"):(""),
                                fontWeight: data.status === "Ready For Performance!" ? ("bold"):(""),
                                marginLeft:".3em"}}>
                         {data.status}
                    </span>
                            </div>
                            <div>
                                {data.name}
                            </div>
                            {data.status === "Reserved" && (
                                <div >
                                    Balance Due:
                                    <span style={{color:"red", marginLeft:".3em"}}>
                                ${data.balanceDue}
                            </span>
                                </div>
                            )}

                        </div>


                    </IonCard>

                )}
            </div>
        )
    }

    return <div>
        {renderIndividualDaySchedule()}
    </div>
}

