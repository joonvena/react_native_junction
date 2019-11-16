import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';



export default function Tracking(props) {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [steps, setSteps] = React.useState(0);
    const [missingColor, setMissingColor] = React.useState("#CCC");

    React.useEffect(() => {
        fetch(`https://junction.dev.qoco.fi/api/events/${props.baggageId}`, {headers: { "x-api-key": "jmdSHjy6WPaXwoR75E6mJ1ImhxKPRJb51v6DBS0A"}})
           .then(res => res.json())
           .then(data => {
               setEvents(data.events);
               setLoading(false);
           })
           .catch(error => console.log(error))
   }, [props.baggageId]);


   const check_if_missing = (event_missing) => {
        if(event_missing == "MISSING") {
            setMissingColor("red");
        }
   }


    return (


       loading ? ( <Spinner visible={loading} overlayColor={"white"}/> ) : (

        <View style={{flex: 1}}>
            <ProgressSteps completedStepIconColor={missingColor}>
        {events.map((event, index) => {
            return (

                <ProgressStep key={index} label={event.airport} onNext={() => check_if_missing(event.type)}>
                <View style={{ alignItems: 'center' }}>
                    <Text>{event.type} {event.timestamp}</Text>
                </View>
                </ProgressStep>

        ) 
        })}
</ProgressSteps>
        </View>

       ) 
       

    ) 
}