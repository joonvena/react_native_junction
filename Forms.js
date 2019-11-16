import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

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
                <Text style={styles.screenTitle}>Scan nfc</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    returnKeyType="done"
                    blurOnSubmit
                    onChangeText={text => this.props.setText(text)}
                    value={this.props.text}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.runTest(this.props.text)}>
                    <Text style={styles.buttonText}>Run test</Text>
                </TouchableOpacity>
                {this.props.isTestRunning ? (<Text>Yes</Text>):(null)}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#3F4EA5',
    },
    screenTitle: {
        fontSize: 35,
        textAlign: 'center',
        margin: 10,
        color: '#FFF',
    },
    textInput: {
        height: 40,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#3F4EA5',
    },
    button: {
        backgroundColor: '#FD6592',
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