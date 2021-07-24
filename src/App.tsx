import React, {useState} from 'react';
import s from './StylesModule/App.module.sass';
import {v1} from "uuid";
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function App() {


    const removeTasks = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj})
    }
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, active: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }
    const changeStatusTask = (taskId: string, status: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.active = status
            setTasksObj({...tasksObj})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasksObj({...tasksObj})
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
        setTasksObj({...tasksObj})
    }
    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'react', active: true},
            {id: v1(), title: 'css', active: true},
            {id: v1(), title: 'redux', active: false},],
        [todolistId2]: [
            {id: v1(), title: 'book', active: true},
            {id: v1(), title: 'SQL', active: false},
            {id: v1(), title: 'Ruby', active: false},]
    })

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className={s.app}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {/*Container bellow is layout of material ui*/}
            <Container fixed>
                <AddItemForm addItem={addTodolist}/>
                <div className={s.layout}>
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
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        )
                    })}
                </div>
            </Container>
        </div>
    );
}

