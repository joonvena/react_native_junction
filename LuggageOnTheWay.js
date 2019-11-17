import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, Keyboard, Image} from 'react-native';

export default class LuggageOnTheWay extends Component {
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
          style={{width: '100%', height: '100%'}}
          source={require('./img/Baggage_Claim.png')}
          onPress={this.props.next}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'flex-start',
  },
});
