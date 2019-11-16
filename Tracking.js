import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';



export default function Tracking(props) {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [steps, setSteps] = React.useState(0);

    React.useEffect(() => {
        fetch(`https://junction.dev.qoco.fi/api/events/${props.baggageId}`, {headers: { "x-api-key": "jmdSHjy6WPaXwoR75E6mJ1ImhxKPRJb51v6DBS0A"}})
           .then(res => res.json())
           .then(data => {
               setEvents(data.events);
               setLoading(false);
           })
           .catch(error => console.log(error))
   }, [props.baggageId]);


    return (


       loading ? ( <Spinner visible={loading}/> ) : (

        <View style={{flex: 1}}>
            <ProgressSteps>
        {events.map((event, index) => {
            return (
                <React.Fragment>
                <ProgressStep key={index} label={event.airport}>
                <View style={{ alignItems: 'center' }}>
                    <Text>{event.type} {event.timestamp}</Text>
                </View>
                </ProgressStep>
                </React.Fragment>
        ) 
        })}
</ProgressSteps>
        </View>

       ) 
       

    ) 
}