import React, { Component } from 'react'
import { View, Text, ScrollView, Image } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import { ListItem } from 'react-native-material-ui';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import Tracking from './Tracking';


export default function Baggages(props) {
    const [baggages, setBaggages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [tracking, setTracking] = React.useState(false);


    React.useEffect(() => {
        fetch(`https://junction.dev.qoco.fi/api/baggage/?customerId=${props.customerId}`, {headers: { "x-api-key": "jmdSHjy6WPaXwoR75E6mJ1ImhxKPRJb51v6DBS0A"}})
           .then(res => res.json())
           .then(data => {
               setBaggages(data.baggage);
               setLoading(false);
           })
           .catch(error => console.log(error))
   }, [props.customerId]);


   const showTracking = () => {
       setTracking(true);
   }

   const setBaggageEventIds = (ids) => {
    console.alert(ids);
   }




    return (
        loading ? ( <Spinner visible={loading} /> ) : (
        
        <Container>
              <Content padder>
            {baggages.map((baggage) => {
                return (
            <Card style={{flex: 0}}>
            <CardItem header bordered>
              <Text>Baggage ID: {baggage.baggageId}</Text>
            </CardItem>
              <Left>
              </Left>
            <CardItem>
              <Body>
              <Tracking baggageId={baggage.baggageId} /> 
              </Body>
            </CardItem>
            <CardItem>
              <Left>

              {props.customertarget == baggage.airport ? ( <Text>Everything good</Text> ) : (null) }
            
              </Left>
            </CardItem>
          </Card>
                )
            })}
            </Content>

        </Container>
        
        )
    )
}