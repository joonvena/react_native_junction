import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import NfcManager, {NdefParser, NfcTech} from 'react-native-nfc-manager';
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
  const headerBytes = [
    0xd1,
    0x01,
    textBytes.length + 3,
    0x54,
    0x02,
    0x65,
    0x6e,
  ];
  return [...headerBytes, ...textBytes];
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

  const _runTest = textToWrite => {
    const cleanUp = () => {
      console.log(textToWrite);
      setIsTestRunning(false);
      NfcManager.closeTechnology();
      NfcManager.unregisterTagEvent();
    };

    const parseText = tag => {
      if (tag.ndefMessage) {
        return NdefParser.parseText(tag.ndefMessage[0]);
      }
      return null;
    };

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
      });
  };

  const _cancelTest = () => {
    NfcManager.cancelTechnologyRequest().catch(err => console.warn(err));
  };

  const _startNfc = () => {
    NfcManager.start()
      .then(() => NfcManager.isEnabled())
      .then(enabled => setEnabled(enabled))
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

  React.useEffect(() => {
    NfcManager.isSupported().then(supported => {
      setSupported(true);
      if (supported) {
        _startNfc();
      }
    });
  });

  const confirm = () => {
    setIndex(9);
  };

  const next = () => {
    setIndex(3);
  };

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
            isTestRunning={isTestRunning}
            setText={setTextValue}
            setFragile={setFragileValue}
            setWidth={setWidthValue}
            setLength={setLengthValue}
            setHeight={setHeightValue}
            setSpecialBaggage={setSpecialBaggageValue}
            runTest={_runTest}
            next={() => setIndex(2)}
            text={text}
            fragile={fragile}
            height={height}
            width={width}
            length={length}
            specialBaggage={specialBaggage}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LuggageAllSet next={() => setIndex(3)}/>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LuggageOnBoard next={() => setIndex(4)}/>
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
