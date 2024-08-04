import React, {useEffect, useState} from "react";
import TimeStartContainer from "../../time-start-container/time-start-container.jsx";
import axios from "axios";
import {
    TIME_START_AFTERNOON,
    TIME_START_EVENING,
    TIME_START_MORNING, TIME_START_NIGHT
} from "../../time-of-day-choices/time-of-day-choices.data";
import "./booking-form-start-times.styles.scss"

const BookingFormStartTimes = ({
                                value,
                                timeOfDayChoice,
                                   selectedFormattedStartTime,
                                   setSelectedStartTimeMaxPossibleHours,
                                   setSelectedStartTime,
                                   selectedStartTime,
                                   setSelectedFormattedStartTime,
                                    setSelectedPrice,

                               }) => {

    const [ unavailableStartTimes, setUnavailableStartTimes ] = useState([]);

    //used for checking date availability functions
    const [ eveningHoursArrays, setEveningHoursArrays ] = useState(undefined);
    const [ morningHoursArrays, setMorningHoursArrays ] = useState(undefined);
    const [ afternoonHoursArrays, setAfternoonHoursArrays ] = useState(undefined);
    const [ nightHoursArrays, setNightHoursArrays ] = useState(undefined)

    //used as props for startTimeContainer
    const [ availableTimesMorning, setAvailableTimesMorning ] = useState([]);
    const [ availableTimesAfternoon, setAvailableTimesAfternoon ] = useState([])
    const [ availableTimesEvening, setAvailableTimesEvening ] = useState([])
    const [ availableTimesNight, setAvailableTimesNight ] = useState([])

    useEffect(() =>{
        console.log("handleChoice Click", timeOfDayChoice)

        if(timeOfDayChoice!== "" && timeOfDayChoice !== undefined) {
            setSelectedStartTimeMaxPossibleHours("")
            setSelectedStartTime("")
            setSelectedFormattedStartTime("")
            loadAvailableTimes()
        }

        setSelectedPrice("none selected")



    },[timeOfDayChoice])


    function filterUnavailableTimes(unavailableStartTimes, data, name){

        let oneHourAvailableTimes = [];
        let twoHourAvailableTimes = [];
        let threeHourAvailableTimes = [];
        let fourHourAvailableTimes = [];
        let fiveHourAvailableTimes = [];
        let sixHourAvailableTimes = [];

        //for each start time in the current time of day
        // check if the unavalableStartTimes includes the end time of the start time from 1-6 hours

        /// first creat the 1-6 hours endtimes from the startTime
        data.map(startTime => {

            let oneHourAdded = parseInt(startTime.timeStart.substring(0, 2)) + 1;
            if (oneHourAdded < 10) {
                oneHourAdded = "0" + oneHourAdded;
            }
            const oneHourAfterStartTime = oneHourAdded + startTime.timeStart.substring(2, 16);


            let twoHoursAdded = parseInt(startTime.timeStart.substring(0, 2)) + 2;
            if (twoHoursAdded < 10) {
                twoHoursAdded = "0" + twoHoursAdded;
            }
            const twoHoursAfterStartTime = twoHoursAdded + startTime.timeStart.substring(2, 16);

            let threeHoursAdded = parseInt(startTime.timeStart.substring(0, 2)) + 3;
            if (threeHoursAdded < 10) {
                threeHoursAdded = "0" + threeHoursAdded;
            }
            const threeHoursAfterStartTime = threeHoursAdded + startTime.timeStart.substring(2, 16);

            let fourHoursAdded = parseInt(startTime.timeStart.substring(0, 2)) + 4;
            if (fourHoursAdded < 10) {
                fourHoursAdded = "0" + fourHoursAdded;
            }
            const fourHoursAfterStartTime = fourHoursAdded + startTime.timeStart.substring(2, 16);

            let fiveHoursAdded = parseInt(startTime.timeStart.substring(0, 2)) + 5;
            if (fiveHoursAdded < 10) {
                fiveHoursAdded = "0" + fiveHoursAdded;
            }
            const fiveHoursAfterStartTime = fiveHoursAdded + startTime.timeStart.substring(2, 16);

            let sixHoursAdded = parseInt(startTime.timeStart.substring(0, 2)) + 6;
            if (sixHoursAdded < 10) {
                sixHoursAdded = "0" + sixHoursAdded;
            }
            const sixHoursAfterStartTime = sixHoursAdded + startTime.timeStart.substring(2, 16);


            //check if the unavailable start times does not include the initial start time
            // and then the 1-6 hours after that
            if (!unavailableStartTimes.includes(startTime.timeStart)) {
                oneHourAvailableTimes = [...oneHourAvailableTimes, startTime]

                //after adding the available startimes this check if the 1 hour after is unavailable
                //then take it off otherwise check 2-hours after start time then 3,4,5,6
                if (unavailableStartTimes.includes(oneHourAfterStartTime)) {
                    oneHourAvailableTimes.pop();
                }

                if (!unavailableStartTimes.includes(twoHoursAfterStartTime)
                    && !unavailableStartTimes.includes(oneHourAfterStartTime)) {
                    // console.log(startTime.timeStart, "<-- 2 hours")
                    twoHourAvailableTimes = [...twoHourAvailableTimes, startTime];

                }

                if (!unavailableStartTimes.includes(threeHoursAfterStartTime)
                    && !unavailableStartTimes.includes(oneHourAfterStartTime)
                    && !unavailableStartTimes.includes(twoHoursAfterStartTime)) {
                    // console.log(startTime.timeStart, "<-- 2 hours")
                    threeHourAvailableTimes = [...threeHourAvailableTimes, startTime];

                }

                if (!unavailableStartTimes.includes(fourHoursAfterStartTime)
                    && !unavailableStartTimes.includes(threeHoursAfterStartTime)
                    && !unavailableStartTimes.includes(twoHoursAfterStartTime)
                    && !unavailableStartTimes.includes(oneHourAfterStartTime)) {

                    fourHourAvailableTimes = [...fourHourAvailableTimes, startTime]

                }

                if (!unavailableStartTimes.includes(fiveHoursAfterStartTime)
                    && !unavailableStartTimes.includes(fourHoursAfterStartTime)
                    && !unavailableStartTimes.includes(threeHoursAfterStartTime)
                    && !unavailableStartTimes.includes(twoHoursAfterStartTime)
                    && !unavailableStartTimes.includes(oneHourAfterStartTime)) {

                    fiveHourAvailableTimes = [...fiveHourAvailableTimes, startTime]

                }

                if (!unavailableStartTimes.includes(sixHoursAfterStartTime)
                    && !unavailableStartTimes.includes(fiveHoursAfterStartTime)
                    && !unavailableStartTimes.includes(fourHoursAfterStartTime)
                    && !unavailableStartTimes.includes(threeHoursAfterStartTime)
                    && !unavailableStartTimes.includes(twoHoursAfterStartTime)
                    && !unavailableStartTimes.includes(oneHourAfterStartTime)) {

                    sixHourAvailableTimes = [...sixHourAvailableTimes, startTime]
                }


            }

        })


        let allAvailableTimes = [oneHourAvailableTimes, twoHourAvailableTimes, threeHourAvailableTimes, fourHourAvailableTimes, fiveHourAvailableTimes, sixHourAvailableTimes];

        console.log(allAvailableTimes, "**************")




        //here we are going to set all the times of days with the oneHourAvailable times
        //so we can give it as a prop to the startimes contaiers in a later function

        if ( oneHourAvailableTimes.length > 0 ){
            switch (name) {
                case "morning":
                    setAvailableTimesMorning(oneHourAvailableTimes);
                    break;
                case "afternoon":
                    setAvailableTimesAfternoon(oneHourAvailableTimes);
                    break;
                case "evening":
                    setAvailableTimesEvening(oneHourAvailableTimes);
                    break;
                case "night":
                    setAvailableTimesNight(oneHourAvailableTimes);
                    break;
            }
        }

        return allAvailableTimes;



    }


    function calculateAvailableTimes(unavailableStartTimes){

        //populate available times for each time of dat
        let morningTimesHours = filterUnavailableTimes(unavailableStartTimes, TIME_START_MORNING, "morning");
        let afternoonTimesHours = filterUnavailableTimes(unavailableStartTimes, TIME_START_AFTERNOON, "afternoon");
        let eveningTimesHours = filterUnavailableTimes(unavailableStartTimes, TIME_START_EVENING, "evening");
        let nightTimesHours = filterUnavailableTimes(unavailableStartTimes, TIME_START_NIGHT, "night");

        setMorningHoursArrays(morningTimesHours);
        setAfternoonHoursArrays(afternoonTimesHours);
        setEveningHoursArrays(eveningTimesHours);
        setNightHoursArrays(nightTimesHours)
    }


    function loadAvailableTimes(){
        console.log(value)
        //set up day to check
        console.log(timeOfDayChoice)
        const dateStart = new Date(value);
        const dateEnd = new Date(value);
        dateStart.setHours(2)
        dateEnd.setHours(23, 59)
        // dateEnd.setHours(16, 59)
        console.log(dateStart)
        console.log(dateEnd)

        //call server
        axios({
            url: 'check-availability',
            method: 'get',
            params: {
                dateStart: dateStart,
                dateEnd: dateEnd
            }
        }).then(response => {
            console.log("Check-Availability succeeded", response)
            setUnavailableStartTimes(response.data);
            let unavailableStartTimes2 = response.data

            //push late night times
            unavailableStartTimes2.push("26:00:00-07:00");
            unavailableStartTimes2.push("26:15:00-07:00");
            unavailableStartTimes2.push("26:30:00-07:00");
            unavailableStartTimes2.push("26:45:00-07:00");
            unavailableStartTimes2.push("27:00:00-07:00");

            calculateAvailableTimes(unavailableStartTimes2)

        }).catch(error => {
            console.log("check-availability error: ", error)
        });
    }




    function renderCorrectStartTimes(){


        switch (timeOfDayChoice){
            case "Morning":
                if( availableTimesMorning !== undefined && availableTimesMorning.length !== 0 && morningHoursArrays !== undefined) {

                    return (
                        <div className="booking-form-time-start-containers-div">

                            {availableTimesMorning.map(x => (

                                    <TimeStartContainer
                                        setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                        setSelectedStartTime={setSelectedStartTime}
                                        selectedStartTime={selectedStartTime}
                                        selectedFormattedStartTime={selectedFormattedStartTime}
                                        formattedStartTime={x.timeStartFormated}
                                        startTime={x.timeStart}
                                        numberOfHoursArrays={morningHoursArrays}
                                        setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}

                                    />

                            ))}
                        </div>
                    )
                }else {
                    return <div>Loading Available Morning Times</div>
                }
                break;

            case "Afternoon":
                if(availableTimesAfternoon !==  undefined && availableTimesAfternoon.length !== 0 && afternoonHoursArrays !== undefined) {

                    return (
                        <div className="booking-form-time-start-containers-div">
                            {availableTimesAfternoon.map(x => (
                                <TimeStartContainer
                                    setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                    setSelectedStartTime={setSelectedStartTime}
                                    selectedStartTime={selectedStartTime}
                                    selectedFormattedStartTime={selectedFormattedStartTime}
                                    startTime={x.timeStart}
                                    formattedStartTime={x.timeStartFormated}
                                    numberOfHoursArrays={afternoonHoursArrays}
                                    setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}
                                />
                            ))}
                        </div>
                    )
                }else {
                    return <div>Loading Available Afternoon Times</div>
                }

            case "Evening":
                if(availableTimesEvening !== undefined && availableTimesEvening.length !== 0 && eveningHoursArrays !== undefined ) {

                    return  (
                        <div className="booking-form-time-start-containers-div">
                            {availableTimesEvening.map(x => (
                                <TimeStartContainer
                                    setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                    setSelectedStartTime={setSelectedStartTime}
                                    selectedStartTime={selectedStartTime}
                                    selectedFormattedStartTime={selectedFormattedStartTime}
                                    startTime={x.timeStart}
                                    formattedStartTime={x.timeStartFormated}
                                    numberOfHoursArrays={eveningHoursArrays}
                                    setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}
                                />
                            ))}
                        </div>
                    )
                }else {
                    return <div>Loading Available Evening Times</div>
                }

            case "Night":
                if( availableTimesNight !== undefined && availableTimesNight.length !== 0 && nightHoursArrays !== undefined) {

                    return (
                        <div className="booking-form-time-start-containers-div">
                            {availableTimesNight.map(x => (
                                <TimeStartContainer
                                    setSelectedFormattedStartTime={setSelectedFormattedStartTime}
                                    setSelectedStartTime={setSelectedStartTime}
                                    selectedStartTime={selectedStartTime}
                                    selectedFormattedStartTime={selectedFormattedStartTime}
                                    startTime={x.timeStart}
                                    formattedStartTime={x.timeStartFormated}
                                    numberOfHoursArrays={nightHoursArrays}
                                    setSelectedStartTimeMaxPossibleHours={setSelectedStartTimeMaxPossibleHours}
                                />
                            ))}
                        </div>
                    )
                }else {
                    return <div>Loading Available Night Times</div>
                }
        }
    }



    return (
        <div className="render-correct-start-times-div">
            {renderCorrectStartTimes()}
        </div>

    )
}
export default BookingFormStartTimes;