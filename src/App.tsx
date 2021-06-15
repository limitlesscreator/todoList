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
        {id: 1,title: 'react', active: true},
        {id: 2,title: 'css', active: true},
        {id: 3,title: 'redux', active: false},
    ])
    let [filter,setFilter] = useState<FilterValuesType>('all')
    let filteredTasks = tasks

    if (filter === 'completed'){
        filteredTasks = filteredTasks.filter(t => t.active === true)
    }
    if (filter === 'active'){
        filteredTasks = filteredTasks.filter(t => t.active === false)
    }
    const removeTasks = (id:number) => {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }
    const changeFilter = (valueFilter:FilterValuesType) => {
        setFilter(valueFilter)
    }


    return (
        <div className="App">
            <Todolist title={"First title"} tasks={filteredTasks} removeTasks={removeTasks} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

