import React, {useEffect, useState} from "react"
import {APIProvider, Map, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";

export default function GoogleMapsAndDirections({coordinates, loaded, address, directionsArray,
                                                    mainLeg,
                                                    setMainLeg,
                                                    setDirectionsArray}){

        return (
            <APIProvider apiKey="AIzaSyCzaURp616lCtyMi3WgjWEdKRODf4_6NVA">

                    <Map
                        center={coordinates}
                        // zoom={9}
                        fullscreenControl={false}
                        zoomControl={true}
                        draggableCursor={true}

                    >

                    </Map>

                <Directions
                    destination={address}
                    directionsArray={directionsArray}
                    setDirectionsArray={setDirectionsArray}
                    mainLeg={mainLeg}
                    setMainLeg={setMainLeg}
                />

            </APIProvider>

    )
}

function Directions({destination, directionsArray, setDirectionsArray,
                        mainLeg, setMainLeg,
}
                    ){
    const google = window.google

    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    // const directionsRenderer = new google.maps.DirectionsRenderer();
    // const directionsService = new google.maps.DirectionsService();
    const [ routes, setRoutes ] = useState([]);

    const [ directionsService, setDirectionsService ] = useState();
    const [ directionsRenderer, setDirectionsRenderer ] = useState();
    const [routeIndex, setRouteIndex ] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];
    const [eventAddress, setEventAddress ] = useState("")


    console.log(directionsArray)

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer ) return;
        // if (!directionsService || !directionsRenderer || destination === "") return;

        directionsService
            .route({
                origin: "5851 W Indian School Rd, Phoenix AZ",
                destination: "5851 W Indian School Rd, Phoenix AZ",
                // destination: destination,
                // waypoints: [
                //     {
                //         location: "4830 N. 94th Ln, Phoenix AZ",
                //         stopover: true,
                //     },
                //     {
                //         location: "3243 N 3rd StPhoenix, AZ",
                //         stopover: true,
                //     },
                //     {
                //         location: "W Surprise Farms Loop S",
                //         stopover: true,
                //     },
                //     {
                //         location: "4824 W Thomas Rd, Phoenix, AZ ",
                //         stopover: true,
                //     },
                //     {
                //         location: "8824 W Thomas Rd, Phoenix, AZ",
                //         stopover: true,
                //     },
                //
                // ],
                waypoints: directionsArray,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                optimizeWaypoints: true,
            })
            .then((response) => {
                directionsRenderer.setDirections(response)
                setRoutes(response.routes);
                setMainLeg(response.routes);
                console.log(response.routes)

            })
    },[directionsService, directionsRenderer, destination]);


    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex)

    },[routeIndex, directionsRenderer]);
    console.log(routes, selected, directionsArray,)


    if (!leg) return null;

    // console.log(leg)
    return (
        <div style={{
            position: "relative",
            // right: "4em",
            backgroundColor: "rgba(0,0,0,0.4)"}}>

            {/*{selected.legs.map((lg, i) => (*/}
            {/*    <div> {i} {lg.start_address}</div>*/}
            {/*))}*/}
            {/*<div> {selected.legs.length} {selected.legs[selected.legs.length -1 ].end_address}</div>*/}

            {/*<h2>{selected.summary}</h2>*/}
            {/*<p>{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}</p>*/}
            {/*<p>Distance:  {leg.distance?.text}</p>*/}
            {/*<p>Duration:  {leg.duration?.text}</p>*/}

            {/*<h2>Other Routes</h2>*/}
            {/*<ul>*/}
            {/*    {routes.map((route , index) => (*/}
            {/*        <li key={route.summary}>*/}
            {/*            /!*<button onClick={() => setRouteIndex(index)}>*!/*/}
            {/*            /!*    {route.summary}*!/*/}
            {/*            /!*</button>*!/*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}