import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";


function sum(a: number, b: number) {
    return a + b
}

export type FilterValuesType = 'all' | 'completed' | 'active'


function App() {
    let [tasks,setTasks] = useState<Array<TasksType>>([
        {id: v1(),title: 'react', active: true},
        {id: v1(),title: 'css', active: true},
        {id: v1(),title: 'redux', active: false},
    ])
    let [filter,setFilter] = useState<FilterValuesType>('all')

    const removeTasks = (id:string) => {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }
    const changeFilter = (valueFilter:FilterValuesType) => {
        setFilter(valueFilter)
    }
    const addTask = (title:string) => {
        let newTask = {id: v1(),title: title, active: false}
        let newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }

    let filteredTasks = tasks

    if (filter === 'completed'){
        filteredTasks = filteredTasks.filter(t => t.active === true)
    }
    if (filter === 'active'){
        filteredTasks = filteredTasks.filter(t => t.active === false)
    }

    return (
        <div className="App">
            <Todolist title={"First title"} tasks={filteredTasks} removeTasks={removeTasks} changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;

