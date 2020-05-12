import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import * as firebase from 'firebase';

export default function Score() {

    const [score, setScore] = useState([]);
    const currentuser = firebase.auth().currentUser.uid;
  
    useEffect(() => {
        firebase.database().ref('/users/'+currentuser+'/score/').on('value', snapshot=> {
          const data = snapshot.val();
          if (data!=null)
          {const prods = Object.values(data);
          setScore(prods);}
          else{setScore([])}
        });
      }, []);

    const listSeparator = () => {
        return (
          <View style={{
            height: 1,
            width: "100%",
            backgroundColor: '#000000',
            }}/>
        );
      };    
    
    return(
      <View style={{flex:1, backgroundColor: '#ff7f00'}}>
        <View style={styles.text}>
          <Text style={styles.column}>Category</Text>
          <Text style={styles.column}>Difficulty</Text>
          <Text style={styles.column}>No.</Text> 
          <Text style={styles.column}>Score</Text>
        </View>
        <FlatList 
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View style={styles.text}>
              <Text style={{fontSize: 12, width:'32%'}}>{item.Category}</Text>
              <Text style={{fontSize: 12, width:'25%'}}>{item.Difficulty}</Text>
              <Text style={{fontSize: 12, width:'24%'}}>{item.Amount}</Text> 
              <Text style={{fontSize: 12}}>{item.Score}</Text>
            </View>} 
          data={score} 
          ItemSeparatorComponent={listSeparator} 
        />
        <Text>No. = Number of questions</Text>
      </View>      
    );
}

Score.navigationOptions= ({navigate}) => ({
  title:'Score History', 
  headerTitleStyle: {fontWeight:'bold'}, 
  headerTintColor: '#ffffff', 
  headerStyle: {backgroundColor: '#000000'}
})

const styles = StyleSheet.create({
    text: {
      flexDirection: 'row', 
      justifyContent:'space-between',
      paddingStart: 5,
      paddingEnd: 5,
      paddingVertical:4
  },
  column:{
    fontSize: 17, 
    fontWeight:'bold'
  }
});