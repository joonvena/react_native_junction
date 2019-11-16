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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={{width: '100%', marginTop: 50}}
          source={require('./img/image3.png')}
        />
        <Text style={styles.screenTitle}>Hello 2 slide</Text>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.runTest(this.props.text)}>
            <Text style={styles.buttonText}>Next- nope</Text>
          </TouchableOpacity>
          {this.props.isTestRunning ? <Text>Yes</Text> : null}
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
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    color: '#0B1560',
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
