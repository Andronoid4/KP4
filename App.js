import React, { useState } from 'react';
import './styles.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const handleNumberClick = (number) => {
    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperatorClick = (op) => {
    if (display === 'Error') {
      setDisplay('0');
      return;
    }
    
    const currentNumber = parseFloat(display);
    
    if (firstNumber === null) {
      setFirstNumber(currentNumber);
    } else if (operator) {
      const result = calculate(firstNumber, currentNumber, operator);
      setDisplay(result.toString());
      setFirstNumber(result);
    }
    
    setOperator(op);
    setWaitingForSecondNumber(true);
  };

  const calculate = (num1, num2, op) => {
    switch (op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': 
        if (num2 === 0) return 'Error';
        return num1 / num2;
      default: return num2;
    }
  };

  const handleEqualClick = () => {
    if (operator && firstNumber !== null && display !== 'Error') {
      const currentNumber = parseFloat(display);
      const result = calculate(firstNumber, currentNumber, operator);
      setDisplay(result.toString());
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const handleDecimalClick = () => {
    if (display === 'Error') {
      setDisplay('0.');
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      
      <div className="buttons">
       
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>

          
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>

          
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>

        <button onClick={() => handleNumberClick('0')}>0</button>

        <button onClick={handleDecimalClick}>.</button>
          
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
        
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
        
        <button className="operator" onClick={() => handleOperatorClick('/')}>÷</button>
        <button className="operator" onClick={() => handleOperatorClick('*')}>×</button>
        
        <button className="clear" onClick={handleClearClick}>C</button>
          
        <button className="equals" onClick={handleEqualClick}>=</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Мини-калькулятор</h1>
      <Calculator />
      <p className="description">Базовые операции: сложение, вычитание, умножение, деление</p>
    </div>
  );
}

export default App;
