import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

class LoadingScreen extends Component {
    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user)
            {
                this.props.navigation.navigate('Home');
            } else{
                this.props.navigation.navigate('LoginScreen');
            }
        }.bind(this))
    }

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size='large' />
                <Text>Loading...</Text>
            </View>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create ({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})