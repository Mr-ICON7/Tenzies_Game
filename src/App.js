import React from "react";//importing react
import Die from "./components/die"; //importing die component
import { nanoid } from "nanoid";//npm module for generating ids
import "./style.css";//importing styles.css file
import Confetti from "react-confetti" //npm module for confetii effect

function App() {
  const [dice, setDice] = React.useState(allNewDice());//intializing the state of dice.
  const [tenzies, setTenzies] = React.useState(false);//intializing the state for game.
  const [count,setCount]=React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);//only becomes true when all die are held === True
    const firstValue = dice[0].value;
    //getting one value and checking if all the remainng are same
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }//this state will change for every change in the dice value.
  }, [dice]);

  function generateNewDie() {
    //we'll return an obj having die value ,id,and a isheld property. 
    return {
      //using random function generating random number from 1-6 for die.
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),//giving each die an Id.
    };
  }

  function allNewDice() {
    const newDice = [];//creating new array for storing the die values
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      //if not game over then we'll roll the un-held dice.
      setCount(count=>count+=1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      
    } else {
      //creating new game.
      setTenzies(false);
      setDice(allNewDice());
      setCount(count=>0)
    }
    console.log(count);
  }

  function holdDice(id) {
    //giving id as argument to find the dice clicked.
    //taking all die values a mapping them to set the values.
    setDice((oldDice) =>
      oldDice.map((die) => {
        //if equal then all values will be kept same except the is held property.
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    //mapping the die values and creating a react component
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="terms">Turns: {count}</div>
      <div className="die--container">{diceElements}</div>
      <button onClick={rollDice} className="roll--dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
