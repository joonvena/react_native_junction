import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import { ListItem } from 'react-native-material-ui';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Customers(props) {
    const [customers, setCustomers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
      


    React.useEffect(() => {
            fetch("https://junction.dev.qoco.fi/api/customers", {headers: { "x-api-key": "jmdSHjy6WPaXwoR75E6mJ1ImhxKPRJb51v6DBS0A"}})
                .then(res => res.json())
                .then(data => {
                    setCustomers(...customers, data.customers);
                    setLoading(false);
                })
                .catch(error => setError(error) && setLoading(false))
    }, []);


    return (
        loading ? (  <Spinner visible={loading} /> ) : (
        
        <ScrollView>
            {customers.map((customer) => {
                return (
                    <ListItem centerElement={{primaryText: customer.name
                      }} key={customer.customerId} onPress={() => props.showuserdata(customer)}/>
                )
            })}
        </ScrollView>
        
        )
    )
}