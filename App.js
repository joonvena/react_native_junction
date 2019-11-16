import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import NfcManager, { NdefParser, NfcTech } from 'react-native-nfc-manager';
import Forms from './Forms';
import Customers from './Customers';
import UserData from './UserData';
import BottomNavigation from './BottomNavigationBar';
import { Container } from 'native-base';


function strToBytes(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}

function buildTextPayload(valueToWrite) {
  const textBytes = strToBytes(valueToWrite);
  // in this example. we always use `en`
  const headerBytes = [0xD1, 0x01, (textBytes.length + 3), 0x54, 0x02, 0x65, 0x6e];
  return [...headerBytes, ...textBytes];
}


export default function App() {

  const [supported, setSupported] = React.useState(false);
  const [text, setText] = React.useState('');
  const [isTestRunning, setIsTestRunning] = React.useState(false);
  const [tag, setTag] = React.useState(null);
  const [parsedText, setParsedText] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [customer, setCustomer] = React.useState([]);
  const [customerId, setCustomerId] = React.useState('');
  const [customerTarget, setCustomerTarget] = React.useState('');



  const _runTest = textToWrite => {
    const cleanUp = () => {
      console.log(textToWrite);
      setIsTestRunning(false);
      NfcManager.closeTechnology()
      NfcManager.unregisterTagEvent();
    }

    const parseText = (tag) => {
      if (tag.ndefMessage) {
        return NdefParser.parseText(tag.ndefMessage[0]);
      }
      return null;
    }

    setIsTestRunning(false);
    NfcManager.registerTagEvent(tag => console.log(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getTag())
      .then(tag => {
        console.log(JSON.stringify(tag));
      })
      .then(() => NfcManager.getNdefMessage())
      .then(tag => {
        let parsedText = parseText(tag);
        setTag(tag);
        setParsedText(parsedText);
      })
      .then(() => NfcManager.writeNdefMessage(buildTextPayload(textToWrite)))
      .then(cleanUp)
      .catch(err => {
        console.warn(err);
        cleanUp();
      })
  }

  const _cancelTest = () => {
    NfcManager.cancelTechnologyRequest()
      .catch(err => console.warn(err));
  }

  const _startNfc = () => {
    NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(enabled => setEnabled(enabled))
      .catch(err => {
        console.warn(err);
        setEnabled(false);
      })
  }

  const _clearMessages = () => {
    setTag(null);
    setParsedText(null);
  }

  const setTextValue = (text) => {
    setText(text);
  };


  const showUserData = (user) => {
    setCustomer([user]);
    setCustomerId(user.customerId);
    setCustomerTarget(user.target);
    setIndex(2);
  }


  React.useEffect(() => {
    NfcManager.isSupported()
      .then(supported => {
        setSupported(true);
        if (supported) {
          _startNfc();
        }
      });
  });

  

  return (


    <Container>
    
    <SwipeableViews style={styles.slideContainer} index={index} disabled={index == 2 ? true : false}>

        <View style={{ flex: 1, justifyContent: 'center'}}>
        <Forms isTestRunning={isTestRunning} setText={setTextValue} runTest={_runTest} text={text}/>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Customers showuserdata={showUserData} />
        </View>


        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
         <UserData customerdata={customer} customerId={customerId} customertarget={customerTarget}  goBackClientToList={() => setIndex(1)}/>
        </View>  

        <BottomNavigation />

    </SwipeableViews>

   </Container>

  
  )
}

const styles = {
  slide: {
    padding: 15,
    minHeight: "100%",
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};