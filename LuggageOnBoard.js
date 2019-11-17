import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, Keyboard, Image} from 'react-native';

export default function LuggageOnBoard(props) {


    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          style={{width: '100%', marginTop: 10}}
          source={require('./img/Luggages_onboard.png')}
          onPress={() => props.setScreen(2)}
        />
      </KeyboardAvoidingView>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
});
