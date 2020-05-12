import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert, Picker, TouchableOpacity, TextInput} from 'react-native';
import {CheckBox} from 'react-native-elements';
import * as firebase from 'firebase';
import {CountDown} from 'react-native-countdown-component';
import {trivia_categories} from './categories';
import {decode} from "base-64";

export default function Quiz(props) {
  const[start, setStart] = useState(0);
  const[difficulty, setDifficulty] = useState('');
  const[cat, setCat] = useState(trivia_categories);
  const[category,setCategory] = useState('');
  const[amount, setAmount] = useState('');
  const[value, setValue] = useState({"Choose difficulty...":'', "easy":'easy', "medium":'medium', "hard":'hard'});

  const[result, setResult] = useState([]);
  const[question, setQuestion] = useState('');
  const[correct, setCorrect] = useState('');
  const[option, setOption] = useState([]);
  const[text, setText] = useState('NEXT');
  const[answer, setAnswer] = useState('');
  const[check, setCheck] = useState({s0:false, s1:false, s2:false, s3:false});
  
  const[score, setScore] = useState([]);
  const[not, setNot] = useState(0);
  const[bad, setBad] = useState(0);
  const[count, setCount] = useState(-2);
  const[number, setNumber] = useState(-1);
  const[time, setTime] = useState(1);
  const[timer, setTimer] = useState('');

  const[find, setFind] = useState('');
  const[name, setName] = useState('');

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

  const saveScore = (score) => {
    firebase.database().ref('/users/'+currentuser+'/score/').push(
      {'Score': score, 'Difficulty': difficulty, 'Category': name, 'Amount': amount});
  }

  const getQuestion = (difficulty, amount, category) => {
    if (number!=amount && difficulty!=''){
      setFind(cat.find( ({ id }) => id === category));
      setName(find.name);
      if (difficulty=='easy'){setTimer(25)};
      if (difficulty=='medium'){setTimer(20)};
      if (difficulty=='hard'){setTimer(15)};
      if (answer==correct) {setCount(count+1)};
      if (answer!=correct) {if (answer==''){setNot(not+1)} else {setBad(bad+1)}}
      const url = 'https://opentdb.com/api.php?amount=1&type=multiple&difficulty='+difficulty+'&category='+category+'&encode=base64';
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {   
        setResult(responseJson.results);
        result.map(question => (
          setQuestion(decode(question.question)), 
          setCorrect(decode(question.correct_answer)), 
          setOption([decode(question.correct_answer), decode(question.incorrect_answers[0]), decode(question.incorrect_answers[1]), decode(question.incorrect_answers[2])].sort()))),
          setNumber(number+1);
          setCheck({s0:false, s1:false, s2:false, s3:false});
          setAnswer('');
      if (number==(amount-1)){
        setText('FINISH')};
      })
      .catch((error) => { 
        Alert.alert('Error:', error.message); 
      }); 
    }
    else if (number==amount){
      var score = count;
      if (answer==correct) {
        score = count+1;}
      if (score==1){Alert.alert('You answered '+score+' question right');}
      else {Alert.alert('You answered '+score+' questions right')};
      saveScore(score);
      navigate ('Home');
    }
  } 

  const {navigate} = props.navigation;
 
  if (start==0){
    return (
      <View style={{flex: 1, flexDirection: 'column',backgroundColor: '#ff7f00', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 22, fontWeight:'bold', marginBottom: 5}}>Category</Text>
        <Picker
          mode="dropdown"
          style={{height: 50, width: 210}}
          selectedValue={category}
          onValueChange={(category)=> setCategory(category)}>
         {
           cat.map((category) =>                 
             <Picker.Item  key={category.id} label={category.name} value={category.id}/>)  
         }
        </Picker>
        <Text style={{fontSize: 22, fontWeight:'bold', marginTop:20}}>Difficulty</Text>
        <Picker
         mode="dropdown"
         style={{height: 50, width: 200}}
         selectedValue={difficulty}
         onValueChange={(difficulty)=> setDifficulty(difficulty)}>
         {
           Object.keys(value).map((item,index) =>                 
             <Picker.Item  key={index} label={item} value={item}/>)  
         }
        </Picker>
        <Text style={{fontSize: 22, fontWeight:'bold', marginBottom: 5}}>Number of questions</Text>
        <TextInput style={{width:40, borderColor:'#000000',  borderWidth: 1, marginBottom:20, textAlign:'center'}}
          keyboardType='numeric'
          placeholder='No.' placeholderTextColor='#000000'
          onChangeText={(amount) => setAmount(parseInt(amount))}
          value={amount}
          editable ={true} />
        <TouchableOpacity style={styles.button} 
          onPress={()=>{
            if (difficulty==''|| difficulty=='Choose difficulty...')
              {alert('DIFFICULTY MUST BE CHOSEN!')}
            if (category=='' || category==0)
              {alert('CATEGORY MUST BE CHOSEN!')}
            if (amount=='' || amount<1)
              {alert('NUMBER OF QUESTIONS MUST BE CHOSEN!')}
            if(difficulty!='' && difficulty!='Choose difficulty...' && amount!='' && amount>=1 && category!='' && category!=0)
              {getQuestion(difficulty, amount, category),setStart(1)}}}> 
          <Text style={{fontSize:20, color:'#ffffff', fontWeight:'bold'}}>START</Text>
        </TouchableOpacity>
      </View>
    )
  }
  if (start==1){
    return(
      <View style={{flex: 1, backgroundColor: '#ff7f00', alignItems: 'center', justifyContent: 'center'}}>
        <CountDown
          until={3}
          digitStyle={{backgroundColor: '#000000'}}
          digitTxtStyle={{color: '#ffffff'}}
          onFinish={()=>{getQuestion(difficulty, amount, category), setStart(2)}}
          size={40}
          timeToShow={['S']}
          timeLabels={{s: 'Get Ready'}}
          />
      </View>
    );
  }
  if (start==2){
    return (
      <View style={{flex: 1}}>
        <View style={styles.text}>
          <Text>Correct: {count}</Text>
          <Text>Not answered: {not}</Text>
          <Text>Wrong: {bad}</Text>
        </View>
        <View style={styles.up}>
          <CountDown
          id={time}
          until={timer}
          digitStyle={{backgroundColor: '#000000'}}
          digitTxtStyle={{color: '#ffffff'}}
          onFinish={()=>{getQuestion(difficulty, amount, category), setTime(time+1)}}
          size={18}
          timeToShow={['S']}
          timeLabels={{s: null}}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold', paddingTop:20}}>Question {number}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold', textAlign:'center'}}>{question}</Text>
        </View>
          <View style={styles.down}>
            <View style={styles.checkBoxField}>
              <CheckBox checked={check.s0} color="#ffffff" onPress={()=> {setCheck({s0: !check.s0}) , setAnswer(option[0])}}/>
              <Text style={{...styles.checkBoxText, fontWeight:check.s0? "bold" :"normal"}}>{option[0]}</Text>
            </View>
            <View style={styles.checkBoxField}>
              <CheckBox checked={check.s1} color="#ffffff" onPress={()=> {setCheck({s1: !check.s1}) , setAnswer(option[1])}}/>
              <Text style={{...styles.checkBoxText, fontWeight:check.s1? "bold" :"normal"}}>{option[1]}</Text>
            </View>
            <View style={styles.checkBoxField}>
              <CheckBox checked={check.s2} color="#ffffff" onPress={()=> {setCheck({s2: !check.s2}) , setAnswer(option[2])}}/>
              <Text style={{...styles.checkBoxText, fontWeight:check.s2? "bold" :"normal"}}>{option[2]}</Text>
            </View>
            <View style={styles.checkBoxField}>
              <CheckBox checked={check.s3} color="#ffffff" onPress={()=> {setCheck({s3: !check.s3}) , setAnswer(option[3])}}/>
              <Text style={{...styles.checkBoxText, fontWeight:check.s3? "bold" :"normal"}}>{option[3]}</Text>
            </View>
          </View>        
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ff7f00', alignItems: 'center', alignItems: 'flex-start', justifyContent: 'space-around', padding: 10}}>
          <TouchableOpacity style={styles.button} onPress={()=>{getQuestion(difficulty, amount, category), setTime(time+1)}}> 
            <Text style={{fontSize:20, color:'#ffffff', fontWeight:'bold'}}>{text}</Text>
          </TouchableOpacity>
        </View>      
      </View>
    );
}}

Quiz.navigationOptions= ({navigate}) => ({
  title:'Quiz', 
  headerTitleStyle: {fontWeight:'bold'}, 
  headerTintColor: '#ffffff', 
  headerStyle: {backgroundColor: '#000000'}
})

const styles = StyleSheet.create({
  up: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#ff7f00',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  down: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: '#ff7f00',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  checkBoxText:{
    marginLeft:20,
    color:"#ffffff",
    marginRight:50
  },
  checkBoxField:{
    width: 350,
    backgroundColor:"#000000", 
    borderRadius:20, 
    padding:10, 
    marginBottom:10,
    flexDirection:"row",
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#000000", 
    borderRadius: 20, 
    width:120, 
    height:50, 
    alignItems:'center', 
    justifyContent:'center'
  },
  text: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    backgroundColor: '#ff7f00',
    paddingStart: 5,
    paddingEnd: 5,
    paddingVertical:4
}
});