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

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList title='what to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus = {changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
