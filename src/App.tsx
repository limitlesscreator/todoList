import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


export type FilterValuesType = "all" | "completed" | "active"


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([{id: 1, title: 'css', isDone: true},
        {id: 2, title: 'js', isDone: true},
        {id: 3, title: 'redux', isDone: false},
        {id: 4, title: 'redux', isDone: false},])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
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
            />
        </div>
    );
}

export default App;
