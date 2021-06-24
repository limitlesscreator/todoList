import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {


    const removeTasks = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, active: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }
    const changeStatusTask = (taskId: string, status: boolean,todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.active = status
            setTasks({...tasksObj})
        }
    }

    const changeFilter = (valueFilter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = valueFilter
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'show me what you can do', filter: 'all'},
    ])
    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)

        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }
    let [tasksObj, setTasks    ] = useState({
        [todolistId1]: [
            {id: v1(), title: 'react', active: true},
            {id: v1(), title: 'css', active: true},
            {id: v1(), title: 'redux', active: false},],
        [todolistId2]: [
            {id: v1(), title: 'book', active: true},
            {id: v1(), title: 'SQL', active: false},
            {id: v1(), title: 'Ruby', active: false},]
    })
    return (
        <div className="App">
            {todolists.map(tl => {
                let filteredTasks = tasksObj[tl.id]

                if (tl.filter === 'completed') {

                    filteredTasks = filteredTasks.filter(t => t.active === true)
                }
                if (tl.filter === 'active') {
                    filteredTasks = filteredTasks.filter(t => t.active === false)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatusTask={changeStatusTask}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;

