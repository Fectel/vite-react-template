import React, {useEffect, useState} from "react"
import "./time-start-container.styles.scss"

const TimeStartContainer = ({
                                startTime,
                                setSelectedFormattedStartTime,
                                setSelectedStartTime,
                                selectedFormattedStartTime,
                                selectedStartTime,
                                formattedStartTime,
                                setSelectedStartTimeMaxPossibleHours,
                                numberOfHoursArrays,
                            }) => {

    const [bgColor, setBgColor] = useState("");
    const [selected, setSelected] = useState(false)


    useEffect(() => {

        if (selectedFormattedStartTime === formattedStartTime){
            setBgColor("#63bfff")
            // console.log(selectedStartTime)
            setSelected(true)



        }else{
            setBgColor("white")
            setSelected(false)
        }


        if ( selectedStartTime !== undefined ){
            // console.log("selected Start Time is not undefined!!!")

            const oneHourTimes = numberOfHoursArrays[0];
            let oneHourTimeStarts = [];
            if (oneHourTimes.length > 0 ) {

                oneHourTimes.map(time => {
                    oneHourTimeStarts = [... oneHourTimeStarts, time.timeStart]
                })

                if (oneHourTimeStarts.includes(selectedStartTime)){
                    // console.log("1 hour array has, ", selectedStartTime);
                    setSelectedStartTimeMaxPossibleHours(1);
                }

                const twoHourTimes = numberOfHoursArrays[1];
                let twoHourTimeStarts = [];
                if ( twoHourTimes.length > 0) {
                    twoHourTimes.map(t => {
                        twoHourTimeStarts = [...twoHourTimeStarts, t.timeStart]
                    })

                    if (twoHourTimeStarts.includes(selectedStartTime)) {
                        // console.log("2 hour array has, ", selectedStartTime)
                        setSelectedStartTimeMaxPossibleHours(2)
                    }

                    const threeHourTimes = numberOfHoursArrays[2];
                    let threeHourTimeStarts = [];
                    if( threeHourTimes.length > 0 ) {

                        threeHourTimes.map(t => {
                            threeHourTimeStarts = [...threeHourTimeStarts, t.timeStart]
                        })

                        if ( threeHourTimeStarts.includes(selectedStartTime)) {
                            // console.log("3 hour array has, ", selectedStartTime)
                            setSelectedStartTimeMaxPossibleHours(3)

                        }

                        const fourHourTimes = numberOfHoursArrays[3];
                        let fourHourTimeStarts = [];
                        if ( fourHourTimes.length > 0) {

                            fourHourTimes.map(t => {
                                fourHourTimeStarts = [...fourHourTimeStarts, t.timeStart]
                            })

                            if ( fourHourTimeStarts.includes(selectedStartTime)) {
                                // console.log("4 hour array has, ", selectedStartTime)
                                setSelectedStartTimeMaxPossibleHours(4)

                            }

                            const fiveHourTimes = numberOfHoursArrays[4];
                            let fiveHourTimeStarts = [];
                            if ( fiveHourTimes.length >0 ) {

                                fiveHourTimes.map( t => {
                                    fiveHourTimeStarts = [...fiveHourTimeStarts, t.timeStart]
                                })

                                if ( fiveHourTimeStarts.includes(selectedStartTime)) {
                                    // console.log("5 hour array has, ", selectedStartTime)
                                    setSelectedStartTimeMaxPossibleHours(5)

                                }

                                const sixHourTimes = numberOfHoursArrays[5];
                                let sixHourTimeStarts = [];
                                if ( sixHourTimes.length > 0 ) {

                                    sixHourTimes.map(t => {
                                        sixHourTimeStarts = [...sixHourTimeStarts, t.timeStart]
                                    })

                                    if ( sixHourTimeStarts.includes(selectedStartTime)) {
                                        // console.log("6 hour array has, ", selectedStartTime)
                                        setSelectedStartTimeMaxPossibleHours(6)

                                    }
                                }

                            }


                        }

                    }



                }else {
                    // console.log("No 2 hour times")
                }

            }else {
                // console.log("no 1 hour times")
            }



            // console.log(numberOfHoursArrays)




        }

    },[selectedStartTime])

    function handleStartTimeClick(){
        setSelectedStartTime(startTime)
        setSelectedFormattedStartTime(formattedStartTime)
        // setResetSelectedMariachiPackage(true);
    }

    const style = {
        border: selected ? "solid #490411FF" : "solid thin",
        backgroundColor: selected ? "#490411" : "#fff",
        color: selected ? "#fff" : "black",
    }

    return (<div
            onClick={handleStartTimeClick}
            className="time-start-container-div"
            style={style}
    >
        {formattedStartTime}

    </div>)
}
export default TimeStartContainer;