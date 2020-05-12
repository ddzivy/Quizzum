import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import * as firebase from 'firebase';

export default function Home(props) {
  
  const {navigate} = props.navigation;

  return (
    <View style={{flex:1, backgroundColor:'#ff7f00'}}>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Image style={{width:300, height:100}} source={require('./quizzum.png')}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', paddingBottom: 50}}>Welcome to Quizzum!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Quiz')}> 
          <Text style={{fontSize:25, color:'#ffffff', fontWeight:'bold'}}>PLAY</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Instructions')}> 
          <Text style={styles.text}>Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Score')}> 
          <Text style={styles.text}>Score</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => firebase.auth().signOut()}> 
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </View>      
    </View>
  );
}

Home.navigationOptions= ({navigate}) => ({
  title:'Home', 
  headerShown: false
})

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "#000000", 
    borderRadius: 20, 
    width:120, 
    height:50, 
    alignItems:'center', 
    justifyContent:'center'
  },
  text:{
    fontSize:18, 
    color:'#ffffff'
  }
});