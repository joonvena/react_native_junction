import React, {Component} from 'react';
import {StyleSheet, View, Keyboard, Image} from 'react-native';

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
      <View behavior="padding" style={styles.container}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('./img/Thankyou.png')}
          onPress={this.props.next}
        />
      </View>
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