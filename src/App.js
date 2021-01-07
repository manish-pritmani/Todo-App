import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const firstLoad = useRef(true);
//Initial states won't allow us to change the input value
  const [inputValue,setInputValue] = useState('');
  const [allTodos,setAllTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if(inputValue.trim() === '')
        return;
//    console.log('test');
//Spread operator ...  will fetch all previous todos first
    setAllTodos([...allTodos, {
//    We can have as many object values as we want.
    text: inputValue,
    id: uuidv4(),
    }]);

    setInputValue('');
  }

  const removeTodo = (id) =>{
//    allTodos.delete((id)=> todo.id);
    setAllTodos(allTodos.filter((todo) => todo.id !== id));
  };

//  use effect will be fired each time the array got new event
  useEffect(() =>{
      if (firstLoad.current){
//        console.log('true');
        firstLoad.current = false;
      } else {
//    for first render we don't need the local storage, but after first the local storage comes into play
        localStorage.setItem("todoList", JSON.stringify([...allTodos]));
//        console.log('false');
      }
    },[allTodos]);

//  This fires everytime as the array is left blank
  useEffect(() => {
//  here null condition is there because if we don't have localStorage instance then we can't get that and will throw the error in console.
  if (localStorage.getItem("todoList") !== null){
        const newTodos = localStorage.getItem("todoList");
        setAllTodos(JSON.parse([...allTodos, newTodos]));
    };
  },[]);

  return (
    <div className="App">
        <div className="container">
            <form onSubmit={addTodo}>
            <input autoFocus type="text" placeholder="Enter Todo Task..."
            value={inputValue}
//          Whatever we type get stored in the input value
//          Our Todos are in array, so we use array mapping, every time we have array we need to use map
//          If allTodos map has parenthesis then it processes whats inside it, unlike the curly braces we don't need array braces.
//          In React its className in stead of class.
            onChange={(e) => setInputValue(e.target.value) }/>
            <button type="submit">Add Todo</button>
            </form>
            {allTodos.map(todo => (
                <div key={todo.id} className="todo">
                    <p>{todo.text}</p>
                    <i onClick={()=> removeTodo(todo.id)} className="far fa-trash-alt"></i>
                </div>
            ))}
        </div>
    </div>
  );
}

export default App;
