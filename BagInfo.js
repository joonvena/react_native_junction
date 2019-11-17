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
  ImageBackground,
} from 'react-native';
import image from './img/Send_Baggage_backonly.png';

export default class BagInfo extends Component {
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
      <View behavior="padding" style={styles.container}>
        <ImageBackground style={{width: '100%', height: '100%'}} source={image}>
          <View style={styles.container2}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              returnKeyType="done"
              blurOnSubmit
              onChangeText={text => this.props.setText(text)}
              value={this.props.text}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.props.confirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  screenTitle: {
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    color: '#0B1560',
  },
  textInput: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 30,
    marginHorizontal: 20,
    fontSize: 18,
    color: '#0B1560',
    alignContent: 'center',
    marginTop: 350,
  },
  button: {
    backgroundColor: '#0B1560',
    borderRadius: 50,
    height: 50,
    marginBottom: 10,
    marginHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
