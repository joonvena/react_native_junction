import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import NfcManager, {NdefParser, NfcTech, Ndef} from 'react-native-nfc-manager';
import Forms from './Forms';
import Customers from './Customers';
import UserData from './UserData';
import BottomNavigation from './BottomNavigationBar';
import {Container} from 'native-base';
import BagInfo from './BagInfo';
import ReadTag from './ReadTag';
import LuggageOnTheWay from './LuggageOnTheWay';
import LuggageOnBoard from './LuggageOnBoard';
import LuggageAllSet from './LuggageAllSet';
import Oops from './Oops';
import Thankyou from './Thankyou';
import { tsPropertySignature } from '@babel/types';

function strToBytes(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}

export default function App() {
  const [supported, setSupported] = React.useState(false);
  const [text, setText] = React.useState('');
  const [fragile, setFragile] = React.useState(false);
  const [specialBaggage, setSpecialBaggage] = React.useState(false);
  const [width, setWidth] = React.useState('');
  const [length, setLength] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [isTestRunning, setIsTestRunning] = React.useState(false);
  const [tag, setTag] = React.useState(null);
  const [parsedText, setParsedText] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [customer, setCustomer] = React.useState([]);
  const [customerId, setCustomerId] = React.useState('');
  const [customerTarget, setCustomerTarget] = React.useState('');
  const [baggages, setBaggages] = React.useState([]);


  NfcManager.registerTagEvent(tag => console.log(tag))
  .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
  .then(() => NfcManager.getTag())
  .then(tag => {
    console.log(JSON.stringify(tag));
  })
  .then(() => NfcManager.getNdefMessage())
  .then(tag => {
    _onTagDiscovered(tag)
  })

  const _onTagDiscovered = tag => {
    console.log('Tag Discovered', tag);

    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
        // ndefMessage is actually an array of NdefRecords, 
        // and we can iterate through each NdefRecord, decode its payload 
        // according to its TNF & type
        const ndefRecords = tag.ndefMessage;

        function decodeNdefRecord(record) {
            if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                return Ndef.text.decodePayload(record.payload);
            } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                return ['uri', Ndef.uri.decodePayload(record.payload)];
            }

            return ['unknown', '---']
        }

        parsed = ndefRecords.map(decodeNdefRecord);
        console.log(parsed);
        _fetchClientInfo(parsed[0])
    }
}

const _fetchClientInfo = (clientId) => {
  fetch(`https://qbd2axzahk.execute-api.eu-north-1.amazonaws.com/api/customers/${clientId}`)
     .then(res => res.json())
     .then(data => {
       setBaggages([data]);
        setIndex(1);
     })
     .catch(error => console.log(error))
}

  const _runTest = () => {
    const parseText = tag => {
      if (tag.ndefMessage) {
        return NdefParser.parseText(tag.ndefMessage[0]);
      }
      return null;
    };


    const _onTagDiscovered = tag => {
      console.log('Tag Discovered', tag);
  
      let parsed = null;
      if (tag.ndefMessage && tag.ndefMessage.length > 0) {
          // ndefMessage is actually an array of NdefRecords, 
          // and we can iterate through each NdefRecord, decode its payload 
          // according to its TNF & type
          const ndefRecords = tag.ndefMessage;
  
          function decodeNdefRecord(record) {
              if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                  return Ndef.text.decodePayload(record.payload);
              } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                  return ['uri', Ndef.uri.decodePayload(record.payload)];
              }
  
              return ['unknown', '---']
          }
  
          parsed = ndefRecords.map(decodeNdefRecord);
          console.log(parsed);
          _fetchClientInfo(parsed[0])
      }
  
  }

    NfcManager.registerTagEvent(tag => console.log(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getTag())
      .then(tag => {
        console.log(JSON.stringify(tag));
      })
      .then(() => NfcManager.getNdefMessage())
      .then(tag => {
        _onTagDiscovered(tag)
        let parsedText = parseText(tag);
        setTag(tag);
        setParsedText(parsedText);
      })
  };

  const _cancelTest = () => {
    NfcManager.cancelTechnologyRequest().catch(err => console.warn(err));
  };

  const _startNfc = () => {
    NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(enabled => setEnabled(enabled))
      .then(_runTest)
      .catch(err => {
        console.warn(err);
        setEnabled(false);
      });
  };

  const _clearMessages = () => {
    setTag(null);
    setParsedText(null);
  };

  const setTextValue = text => {
    setText(text);
  };

  const setFragileValue = fragile => {
    setFragile(fragile);
  };

  const setWidthValue = width => {
    setWidth(width);
  };

  const setLengthValue = length => {
    setLength(length);
  };

  const setHeightValue = height => {
    setHeight(height);
  };

  const setSpecialBaggageValue = specialBaggage => {
    setSpecialBaggage(specialBaggage);
  };

  const showUserData = user => {
    setCustomer([user]);
    setCustomerId(user.customerId);
    setCustomerTarget(user.target);
    setIndex(2);
  };

/*  React.useEffect(() => {
    NfcManager.isSupported().then(supported => {
      setSupported(true);
      console.log(index);
      if (supported) {
        console.log("her?");
        _startNfc();
      }
    });
  },[index])*/

  const confirm = () => {
    setIndex(9);
  };

  const next = () => {
    setIndex(3);
  };

  const setView = (index) => {
    setIndex(index);
  }

  return (
    <Container>
      <SwipeableViews
        style={styles.slideContainer}
        index={index}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ReadTag
            isTestRunning={isTestRunning}
            setText={setTextValue}
            runTest={_runTest}
            text={text}
            next={() => setIndex(1)}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Forms
            next={() => setIndex(2)}
            baggage={baggages}
            setScreen={setView}

          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LuggageAllSet next={() => setIndex(3)}/>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LuggageOnBoard next={() => setIndex(4)} setScreen={setView} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LuggageOnTheWay next={() => setIndex(5)}/>
        </View>


        <View style={{flex: 1, justifyContent: 'center'}}>
          <Oops next={() => setIndex(6)}/>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <BagInfo setText={setTextValue} text={text} confirm={() => setIndex(7)}/>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Thankyou />
        </View>
      </SwipeableViews>
    </Container>
  );
}

const styles = {
  slide: {
    padding: 15,
    minHeight: '100%',
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#Fff',
  },
  slide2: {
    backgroundColor: '#fff',
  },
  slide3: {
    backgroundColor: '#fff',
  },
  slide4: {
    backgroundColor: '#fff',
  },
  slide5: {
    backgroundColor: '#fff',
  },
  slide6: {
    backgroundColor: '#fff',
  },
  slide7: {
    backgroundColor: '#fff',
  },
  slide8: {
    backgroundColor: '#fff',
  },
};
