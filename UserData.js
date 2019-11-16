import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import { ListItem } from 'react-native-material-ui';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import Baggages from './Baggages';


export default function UserData(props) {

    return (

        <Container>

            {props.customerdata.map((customer) => {
                return (
                    <ListItem centerElement={{primaryText: customer.name
                      }} key={customer.customerId} />
                )
            })}

       


        {props.customerId != '' ? ( 
            
            <Baggages customerId={props.customerId}/> 
        
            ) : ( null )
    
            
        }

            
  
    <Button title="Back" onPress={props.goBackClientToList}/>

        </Container>
        ) 
}

