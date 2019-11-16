import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, Keyboard, Image} from 'react-native';

export default class Thankyou extends Component {
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
          source={require('./img/Thankyou.png')}
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
    marginTop: 30,
  },
});