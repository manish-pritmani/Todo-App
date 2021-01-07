import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const firstLoad = useRef(true);
  const [inputValue,setInputValue] = useState('');
  const [allTodos,setAllTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if(inputValue.trim() === '')
        return;
    setAllTodos([...allTodos, {
    text: inputValue,
    id: uuidv4(),
    }]);

    setInputValue('');
  }

  const removeTodo = (id) =>{
    setAllTodos(allTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() =>{
      if (firstLoad.current){
        firstLoad.current = false;
      } else {
        localStorage.setItem("todoList", JSON.stringify([...allTodos]));
      }
    },[allTodos]);

  useEffect(() => {
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
