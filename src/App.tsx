import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";


function sum(a: number, b: number) {
    return a + b
}

let task1 = [
    {id: 1,title: 'react', active: true},
    {id: 1,title: 'css', active: true},
    {id: 1,title: 'redux', active: false},
]
let task2 = [
    {id: 1,title: 'json', active: true},
    {id: 1,title: 'store', active: true},
    {id: 1,title: 'book', active: false},
]
function App() {

    return (
        <div className="App">
            <Todolist title={"First title"} tasks={task1}/>
            <Todolist title={"Second title"} tasks={task2}/>
        </div>
    );
}

export default App;

