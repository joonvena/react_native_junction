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

export default class ReadTag extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  resetForm = () => {
    Keyboard.dismiss();
    this.setState(this.initialState);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={{width: '100%', height: 400, marginTop: 50}}
          source={require('./img/readTag.jpeg')}
        />
        <View style={styles.container2} onPress={this.props.next}>
          <Text style={[styles.bodyText, {padding: 30}]}>
            Put your phone close to the NFC tag on your suitcase
          </Text>
        </View>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 35}}>
          <Text style={styles.bodyText}>Having trouble reading NFC tag?</Text>
          <Text
            style={[styles.bodyText, {color: '#0B1560', fontWeight: 'bold'}]}>
            See FAQ here
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  container2: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
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
  bodyText: {
    color: '#707070',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20,
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
    borderRadius: 3,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
