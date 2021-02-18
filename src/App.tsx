import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active"


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'redux', isDone: false},
        {id: v1(), title: 'redux', isDone: false},
        {id: v1(), title: 'html', isDone: true},
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(){
       let newTask = {id:v1(), title: 'newtask',isDone: false}
       let newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title='what to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
