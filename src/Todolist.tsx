import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import s from './StylesModule/Todolist.module.sass'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TasksType = {
    id: string
    title: string
    active: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (valueFilter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusTask: (taskId: string, status: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div className={s.todolist}>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div className={s.centerForm}><AddItemForm addItem={addTask}/></div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTasks(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log('want to change' + t.id + e.currentTarget.checked)
                        props.changeStatusTask(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id}><Checkbox checked={t.active} onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} >
                            <Delete/>
                        </IconButton>
                    </li>
                })
                }
            </ul>
            <div className={s.filterButtons}>
                <Button onClick={onAllClickHandler}
                        variant={props.filter === 'all' ? "contained" : 'outlined'}>All
                </Button>
                <Button onClick={onActiveClickHandler}
                        variant={props.filter === 'active' ? "contained" : 'outlined'}>Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        variant={props.filter === 'completed' ? "contained" : 'outlined'}>Completed
                </Button>
            </div>
        </div>
    )
}

