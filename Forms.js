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

export default class Forms extends Component {
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
          style={{width: '100%', marginTop: 10}}
          source={require('./img/details.png')}
        />
        <View style={[styles.container2]}>
          <View style={[styles.rows, {alignItems: 'flex-start'}]}>
            <Image
              style={{width: 30, height: 30, marginEnd: 10}}
              source={require('./img/icon_weight.png')}
            />
            <Text style={styles.textRight}>Weight</Text>
            <Text style={styles.textLeft}> 21.4 kg</Text>
          </View>
          <View style={[styles.rows, {alignItems: 'flex-start'}]}>
            <Image
              style={{width: 30, height: 30, marginEnd: 10}}
              source={require('./img/icon_size.png')}
            />
            <Text style={styles.textRight}>Size</Text>
            <Text style={styles.textLeft}> 42 cm x 32 cm x 64 cm</Text>
          </View>
          <View style={[styles.rows, {alignItems: 'flex-start'}]}>
            <Image
              style={{width: 30, height: 30, marginEnd: 10}}
              source={require('./img/icon_fragile.png')}
            />
            <Text style={styles.textRight}>Fragile</Text>
            <Switch
              style={{alignSelf: 'flex-end'}}
              onValueChange={fragile => this.props.setFragile(fragile)}
              value={this.props.fragile}
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
              onValueChange={specialBaggage =>
                this.props.setSpecialBaggage(specialBaggage)
              }
              value={this.props.specialBaggage}
              trackColor={{false: 'grey', true: '#0B1560'}}
            />
          </View>
          <View style={[styles.rows, {alignItems: 'flex-start'}]}>
            <Image
              style={{width: 30, height: 30, marginEnd: 10}}
              source={require('./img/icon_co2.png')}
            />
            <Text style={styles.textRight}>CO2 Emission</Text>
            <Text style={styles.textLeft}> 13</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.runTest(this.props.text)}>
            <Text style={styles.buttonText}>Next</Text>
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
    //justifyContent: 'flex-start',
    marginTop: 30,
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
  textLeft: {
    textAlign: 'center',
    color: '#0B1560',
    padding: 5,
    alignSelf: 'center',
  },
  textRight: {flex: 2, alignSelf: 'center', color: '#707070'},
});
