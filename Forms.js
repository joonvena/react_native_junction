import React, {Component} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from 'react-native';
import {Switch} from 'native-base';

export default function Forms(props){
  const [baggageEvent, setbaggageEvents] = React.useState([]);


    const checkBaggageStatus = (events) => {
      console.log("hello");
      var mostRecentDate = new Date(Math.max.apply(null, events.map(function(e) {
        return new Date(e.timestamp);
      })));
      var mostRecentObject = events.filter( e => { 
        var d = new Date( e.timestamp ); 
        return d.getTime() == mostRecentDate.getTime();
    })[0];
    
      if(mostRecentObject.type == "LOADED") {
        props.setScreen(3);
      }
    }

    return (
    
      props.baggage.map((bag) => {
        return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
                  <Image
          style={{width: '100%'}}
          source={require('./img/nav.png')}
        />
          <Image
            style={{width: '100%'}}
            source={require('./img/details.png')}
          />
          <View style={[styles.container2]}>
            <View style={[styles.rows, {alignItems: 'flex-start'}]}>
              <Image
                style={{width: 30, height: 30, marginEnd: 10}}
                source={require('./img/icon_weight.png')}
              />
              <Text style={styles.textRight}>Weight</Text>
              <Text style={styles.textLeft}>{bag.weight} kg</Text>
            </View>
            <View style={[styles.rows, {alignItems: 'flex-start'}]}>
              <Image
                style={{width: 30, height: 30, marginEnd: 10}}
                source={require('./img/icon_size.png')}
              />
              <Text style={styles.textRight}>Size</Text>
              <Text style={styles.textLeft}>{bag.size}</Text>
            </View>
            <View style={[styles.rows, {alignItems: 'flex-start'}]}>
              <Image
                style={{width: 30, height: 30, marginEnd: 10}}
                source={require('./img/icon_fragile.png')}
              />
              <Text style={styles.textRight}>Fragile</Text>
              <Switch
                style={{alignSelf: 'flex-end'}}
                value={bag.fragile}
                trackColor={{false: 'grey', true: '#0B1560'}}
              />
            </View>
            <View style={[styles.rows, {alignItems: 'flex-start'}]}>
              <Image
                style={{width: 30, height: 30, marginEnd: 10}}
                source={require('./img/icon_special.png')}
              />
              <Text style={styles.textRight}>Special</Text>
              <Switch
                style={{alignSelf: 'flex-end'}}
                value={bag.special}
                trackColor={{false: 'grey', true: '#0B1560'}}
              />
            </View>
            <View style={[styles.rows, {alignItems: 'flex-start'}]}>
              <Image
                style={{width: 30, height: 30, marginEnd: 10}}
                source={require('./img/icon_co2.png')}
              />
              <Text style={styles.textRight}>CO2 Emission</Text>
              <Text style={styles.textLeft}>{bag.co}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}>
              <Text style={styles.buttonText} onPress={() => checkBaggageStatus(bag.events)}>Check status</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        )
      
      })
    );
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'flex-start',
  },
  container2: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 20,
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: 10,
    color: '#0B1560',
    borderBottomColor: 'black',
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  screenTitle: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    color: '#0B1560',
  },
  textInput: {
    height: 35,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    color: '#0B1560',
  },
  button: {
    backgroundColor: '#0B1560',
    borderRadius: 50,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 60,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  textLeft: {
    textAlign: 'center',
    color: '#0B1560',
    padding: 5,
    alignSelf: 'center',
  },
  textRight: {flex: 2, alignSelf: 'center', color: '#707070'},
});
