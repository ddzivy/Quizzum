import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Instructions() {
    
    return(
        <View style={styles.text}>
            <Text style={styles.normal}>
                Quizzum is a simple quiz game where you can test your knowledge. In the beginning, 
            </Text>
            <Text style={styles.bold}>YOU MUST CHOOSE</Text>
            <Text style={styles.normal}>difficulty, category, and number of questions.</Text>
            <Text style={styles.bold}>You cannot go back to the previous question</Text>
            <Text style={styles.normal}>so please think before you move to next question.</Text>
            <Text style={styles.bold}>Only one answer is always correct.</Text>
            <Text style={styles.bold}>For answering the question you have 25, 20, or 15 SECONDS (depends on difficulty).</Text>        
            <Text style={styles.normal}>If timer hits 0, you will be redirected to the next question, even you did not mark any option.</Text>
            <Text style={styles.bold}>To mark the option you think is right,</Text>
            <Text style={styles.normal}>
                click on CHECKBOX next to the option. 
                Then you can press the NEXT button and you will be redirected straight to the next question.
            </Text>
            <Text style={styles.normal}>After answering all questions you will get your final score, that will be stored in database.</Text>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>Have fun!</Text>
        </View>
    );
}

Instructions.navigationOptions= ({navigate}) => ({
    title:'Instructions', 
    headerTitleStyle: {fontWeight:'bold'}, 
    headerTintColor: '#ffffff', 
    headerStyle: {backgroundColor: '#000000'}
})

const styles = StyleSheet.create({
    text: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ff7f00',
      alignItems: 'center',
      justifyContent: 'flex-start',       
    },
    bold:{
        fontSize:17, 
        fontWeight: 'bold',
        textAlign:'center'
    },
    normal:{
        fontSize:17, 
        textAlign:'center'
    }
  });