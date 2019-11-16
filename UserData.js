import React, { Component } from 'react'
import { View, Text, ScrollView, Button } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import { Container } from 'native-base';
import Baggages from './Baggages';


export default function UserData(props) {


    return (

        <Container>

            {props.customerdata.map((customer) => {
                return (
                    <ListItem centerElement={{primaryText: customer.name + customer.target
                      }} key={customer.customerId} />
                )
            })}

       


        {props.customerId != '' ? ( 
            
            <Baggages customerId={props.customerId} customertarget={props.customertarget}/> 
        
            ) : ( null )
    
            
        }

            
  
    <Button title="Back" onPress={props.goBackClientToList}/>

        </Container>
        ) 
}

