import React, {Component} from 'react'
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



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: false,
            enabled: false,
            isTestRunning: false,
            text: 'hi, nfc!',
            parsedText: null,
            tag: null,
        }
    }

    componentDidMount() {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            })
    }

    setText = (text) => {
      this.setState({text})
    }

    render() {
        return (
          <SwipeableViews style={styles.slideContainer}>
            <ScrollView style={{flex: 1}}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Forms isTestRunning={this.state.isTestRunning} setText={this.setText} runTest={this._runTest} text={this.state.text}/>
                </View>
            </ScrollView>
          </SwipeableViews>
        )
    }

    _runTest = textToWrite => {
        const cleanUp = () => {
            console.log(textToWrite);
            this.setState({isTestRunning: false});
            NfcManager.closeTechnology()
            NfcManager.unregisterTagEvent();
        }

        const parseText = (tag) => {
            if (tag.ndefMessage) {
                return NdefParser.parseText(tag.ndefMessage[0]);
            }
            return null;
        }

        this.setState({isTestRunning: true});
        NfcManager.registerTagEvent(tag => console.log(tag))
            .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
            .then(() => NfcManager.getTag())
            .then(tag => {
                console.log(JSON.stringify(tag));
            })
            .then(() => NfcManager.getNdefMessage())
            .then(tag => {
                let parsedText = parseText(tag);
                this.setState({tag, parsedText})
            })
            .then(() => NfcManager.writeNdefMessage(buildTextPayload(textToWrite)))
            .then(cleanUp)
            .catch(err => {
                console.warn(err);
                cleanUp();
            })
    }

    _cancelTest = () => {
        NfcManager.cancelTechnologyRequest()
            .catch(err => console.warn(err));
    }

    _startNfc = () => {
        NfcManager.start()
            .then(() => NfcManager.isEnabled())
            .then(enabled => this.setState({enabled}))
            .catch(err => {
                console.warn(err);
                this.setState({enabled: false})
            })
    }

    _clearMessages = () => {
        this.setState({tag: null, parsedText: null});
    }
}

export default App;